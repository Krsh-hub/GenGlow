import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, ExternalLink, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CitationGap {
  query: string;
  competitor_count: number;
  competitor_names: string[];
  competitor_urls: string[];
  engines: string[];
  opportunity_score: number;
}

const CitationGapAnalyzer = () => {
  const [gaps, setGaps] = useState<CitationGap[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const analyzeGaps = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's brand name
      const { data: settings } = await supabase
        .from("user_settings")
        .select("brand_name")
        .eq("user_id", user.id)
        .single();

      if (!settings) {
        toast({
          title: "Setup required",
          description: "Please configure your brand settings first",
          variant: "destructive",
        });
        return;
      }

      // Find queries where competitors are cited but user's brand isn't
      const { data: citations } = await supabase
        .from("ai_citations")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_competitor", true);

      if (!citations) {
        setGaps([]);
        return;
      }

      // Group by query
      const queryMap = new Map<string, any>();

      for (const citation of citations) {
        // Check if user's brand appears in this query
        const { data: userCitations } = await supabase
          .from("ai_citations")
          .select("id")
          .eq("user_id", user.id)
          .eq("query", citation.query)
          .eq("is_competitor", false);

        if (!userCitations || userCitations.length === 0) {
          // Gap found!
          if (!queryMap.has(citation.query)) {
            queryMap.set(citation.query, {
              query: citation.query,
              competitor_count: 0,
              competitor_names: new Set(),
              competitor_urls: new Set(),
              engines: new Set(),
            });
          }

          const gap = queryMap.get(citation.query);
          gap.competitor_count++;
          gap.competitor_names.add(citation.brand_name);
          if (citation.citation_url) gap.competitor_urls.add(citation.citation_url);
          gap.engines.add(citation.ai_engine);
        }
      }

      // Convert to array and calculate opportunity scores
      const gapArray: CitationGap[] = Array.from(queryMap.values()).map((gap) => ({
        ...gap,
        competitor_names: Array.from(gap.competitor_names),
        competitor_urls: Array.from(gap.competitor_urls),
        engines: Array.from(gap.engines),
        opportunity_score: gap.competitor_count * gap.engines.size * 10,
      }));

      // Sort by opportunity score
      gapArray.sort((a, b) => b.opportunity_score - a.opportunity_score);

      setGaps(gapArray);

      toast({
        title: "Analysis complete",
        description: `Found ${gapArray.length} citation gap${
          gapArray.length !== 1 ? "s" : ""
        }`,
      });
    } catch (error) {
      console.error("Error analyzing gaps:", error);
      toast({
        title: "Analysis failed",
        description: "Could not complete citation gap analysis",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Search className="w-6 h-6" />
            Citation Gap Analyzer
          </h2>
          <p className="text-muted-foreground mt-1">
            Find queries where competitors appear but you don't
          </p>
        </div>

        <Button onClick={analyzeGaps} disabled={loading} className="gap-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              Find Gaps
            </>
          )}
        </Button>
      </div>

      {gaps.length > 0 ? (
        <div className="space-y-4">
          {gaps.map((gap, index) => (
            <motion.div
              key={gap.query}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{gap.query}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {gap.engines.map((engine) => (
                        <span
                          key={engine}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full capitalize"
                        >
                          {engine}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        <AlertCircle className="w-4 h-4 inline mr-1" />
                        {gap.competitor_count} competitor citation
                        {gap.competitor_count !== 1 ? "s" : ""}
                      </span>
                      <span>•</span>
                      <span>Opportunity score: {gap.opportunity_score}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-500">
                      {gap.competitor_count}
                    </div>
                    <div className="text-xs text-muted-foreground">citations</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Competitors mentioned:</h4>
                  <div className="flex flex-wrap gap-2">
                    {gap.competitor_names.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1 text-sm bg-secondary rounded-md"
                      >
                        {name}
                      </span>
                    ))}
                  </div>

                  {gap.competitor_urls.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium mt-4">Source URLs:</h4>
                      <div className="space-y-1">
                        {gap.competitor_urls.slice(0, 3).map((url) => (
                          <a
                            key={url}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {new URL(url).hostname}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        !loading && (
          <Card className="p-8 text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No gaps found yet</h3>
            <p className="text-muted-foreground">
              Click "Find Gaps" to analyze your citation opportunities
            </p>
          </Card>
        )
      )}
    </div>
  );
};

export default CitationGapAnalyzer;

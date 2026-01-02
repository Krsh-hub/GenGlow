import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CitationData {
  ai_engine: string;
  brand_name: string;
  is_competitor: boolean;
  created_at: string;
}

interface EngineShare {
  engine: string;
  share: number;
  count: number;
  trend: "up" | "down" | "stable";
  change: number;
}

const RecommendationShareDashboard = () => {
  const [citations, setCitations] = useState<CitationData[]>([]);
  const [engineShares, setEngineShares] = useState<EngineShare[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCitations();
    subscribeToChanges();
  }, []);

  const fetchCitations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("ai_citations")
        .select("ai_engine, brand_name, is_competitor, created_at")
        .eq("user_id", user.id)
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setCitations(data || []);
      calculateShares(data || []);
    } catch (error) {
      console.error("Error fetching citations:", error);
      toast({
        title: "Error loading data",
        description: "Could not fetch citation data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateShares = (citationData: CitationData[]) => {
    const engines = ["perplexity", "chatgpt", "gemini", "claude"];
    
    const shares = engines.map((engine) => {
      const engineCitations = citationData.filter((c) => c.ai_engine === engine);
      const yourBrand = engineCitations.filter((c) => !c.is_competitor).length;
      const total = engineCitations.length;
      
      // Calculate trend (compare last 3 days vs previous 4 days)
      const now = Date.now();
      const threeDaysAgo = now - 3 * 24 * 60 * 60 * 1000;
      const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
      
      const recentCitations = engineCitations.filter(
        (c) => new Date(c.created_at).getTime() > threeDaysAgo
      );
      const olderCitations = engineCitations.filter(
        (c) => {
          const time = new Date(c.created_at).getTime();
          return time <= threeDaysAgo && time >= sevenDaysAgo;
        }
      );
      
      const recentShare = recentCitations.length > 0
        ? (recentCitations.filter((c) => !c.is_competitor).length / recentCitations.length) * 100
        : 0;
      const olderShare = olderCitations.length > 0
        ? (olderCitations.filter((c) => !c.is_competitor).length / olderCitations.length) * 100
        : 0;
      
      const change = recentShare - olderShare;
      let trend: "up" | "down" | "stable" = "stable";
      if (change > 5) trend = "up";
      else if (change < -5) trend = "down";
      
      return {
        engine,
        share: total > 0 ? (yourBrand / total) * 100 : 0,
        count: yourBrand,
        trend,
        change: Math.abs(change),
      };
    });
    
    setEngineShares(shares);
  };

  const subscribeToChanges = () => {
    const channel = supabase
      .channel("citation_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "ai_citations",
        },
        (payload) => {
          console.log("Citation update:", payload);
          fetchCitations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getEngineColor = (engine: string) => {
    const colors = {
      perplexity: "from-blue-500 to-purple-600",
      chatgpt: "from-emerald-500 to-teal-600",
      gemini: "from-orange-500 to-pink-600",
      claude: "from-violet-500 to-indigo-600",
    };
    return colors[engine as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Sparkles className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Recommendation Share</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {engineShares.map((data, index) => (
          <motion.div
            key={data.engine}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getEngineColor(
                  data.engine
                )} opacity-5 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground capitalize">
                    {data.engine}
                  </h3>
                  {getTrendIcon(data.trend)}
                </div>

                <div className="space-y-1">
                  <p className="text-3xl font-bold">{data.share.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">
                    {data.count} citation{data.count !== 1 ? "s" : ""}
                  </p>

                  {data.trend !== "stable" && (
                    <p
                      className={`text-xs font-medium ${
                        data.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {data.trend === "up" ? "+" : "-"}
                      {data.change.toFixed(1)}% vs last period
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {citations.length === 0 && (
        <Card className="p-8 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No data yet</h3>
          <p className="text-muted-foreground">
            Start tracking queries to see your recommendation share across AI engines
          </p>
        </Card>
      )}
    </div>
  );
};

export default RecommendationShareDashboard;

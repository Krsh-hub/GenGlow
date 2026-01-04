import { useSearchParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const AuditResults = () => {
  const [searchParams] = useSearchParams();
  const brand = (searchParams.get("brand") || "").trim();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<{
    totalQueries: number;
    yourCitations: number;
    competitorCitations: number;
    engines: string[];
    competitors: string[];
  } | null>(null);

  useEffect(() => {
    if (!brand) {
      setLoading(false);
      return;
    }

    // Mock "analysis" - replace with fetch("/api/audit") later
    setTimeout(() => {
      const hash = brand.toLowerCase().length;
      const yourCitations = Math.max(0, (hash % 4) - 1);
      const competitorCitations = yourCitations + 3;

      setResults({
        totalQueries: 12,
        yourCitations,
        competitorCitations,
        engines: ["perplexity", "chatgpt", "gemini"],
        competitors: ["Competitor A", "Competitor B", "Competitor C"],
      });
      setLoading(false);
    }, 800);
  }, [brand]);

  if (!brand) return <Navigate to="/" replace />;

  if (loading || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const { totalQueries, yourCitations, competitorCitations, engines, competitors } =
    results;

  const cta =
    yourCitations < competitorCitations
      ? "🚨 Competitors are getting more AI visibility than you. Start monitoring to close the gap."
      : "✅ You have solid visibility. Lock it in and monitor changes over time.";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="p-8 md:p-12 shadow-2xl border-0">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {brand} AI Visibility Report
              </h1>
              <p className="text-xl text-muted-foreground">
                Instant audit complete ✓
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 text-center">
                <div className="text-4xl font-bold text-primary">{yourCitations}</div>
                <p className="text-muted-foreground mt-2">Your citations</p>
              </Card>
              <Card className="p-8 text-center">
                <div className="text-4xl font-bold text-destructive">{competitorCitations}</div>
                <p className="text-muted-foreground mt-2">Competitor citations</p>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="bg-secondary/50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3">Quick Insights:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Checked {totalQueries} industry queries</li>
                  <li>• Scanned {engines.length} AI engines</li>
                  <li>• Competitors ahead by {competitorCitations - yourCitations}x</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-destructive/10 to-warning/10 p-6 rounded-xl border">
                <p className="font-semibold text-lg mb-2">{cta}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {competitors.map((comp) => (
                    <Badge key={comp} variant="secondary">{comp}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="flex-1 max-w-md">
                  Start Monitoring Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="flex-1 max-w-md">
                  I have an account
                </Button>
              </Link>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              No credit card required • Cancel anytime • 14-day free trial
            </p>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AuditResults;

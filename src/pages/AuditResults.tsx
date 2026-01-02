import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AuditResults = () => {
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand") || "Your Brand";

  // Mock data - replace with real API call later
  const results = {
    totalQueries: 12,
    yourCitations: 3,
    competitorCitations: 9,
    engines: ["perplexity", "chatgpt", "gemini"],
    competitors: ["Competitor A", "Competitor B"],
  };

  const cta = results.yourCitations < results.competitorCitations 
    ? "🚨 Competitors dominate your space. Start monitoring now!" 
    : "✅ Good visibility! Monitor to stay ahead.";

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
                <div className="text-4xl font-bold text-primary">{results.yourCitations}</div>
                <p className="text-muted-foreground mt-2">Your citations</p>
              </Card>
              <Card className="p-8 text-center">
                <div className="text-4xl font-bold text-destructive">{results.competitorCitations}</div>
                <p className="text-muted-foreground mt-2">Competitor citations</p>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="bg-secondary/50 p-6 rounded-xl">
                <h3 className="font-semibold text-lg mb-3">Quick Insights:</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Checked {results.totalQueries} industry queries</li>
                  <li>• Scanned {results.engines.length} AI engines</li>
                  <li>• Competitors ahead by {results.competitorCitations - results.yourCitations}x</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-destructive/10 to-warning/10 p-6 rounded-xl border">
                <p className="font-semibold text-lg mb-2">{cta}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {results.competitors.map((comp) => (
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

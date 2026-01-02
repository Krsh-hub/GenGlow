import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleQuickAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.trim()) return;

    setLoading(true);

    // Simulate quick audit (replace with real API call later)
    setTimeout(() => {
      setLoading(false);
      
      // Redirect to results page with brand in query params
      window.location.href = `/audit-results?brand=${encodeURIComponent(brand)}`;
    }, 1500);
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            See your AI visibility in 30 seconds
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight">
            See if your brand{" "}
            <span className="text-primary">glows</span>
            <br />
            in AI search answers
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Track your visibility across ChatGPT, Perplexity, and Gemini. 
            <br />
            Know when AI mentions your brand — and when it doesn't.
          </p>

          {/* Quick Audit Form */}
          <form onSubmit={handleQuickAudit} className="max-w-md mx-auto mb-12">
            <div className="flex gap-2 bg-secondary/50 border border-border/50 rounded-2xl p-1 shadow-xl">
              <Input
                placeholder="Your brand name (e.g. Tesla)"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="flex-1 bg-background border-none shadow-none h-14 text-lg placeholder:text-muted-foreground/80"
                disabled={loading}
                required
              />
              <Button 
                type="submit" 
                size="lg" 
                className="px-8 shadow-lg h-14"
                disabled={loading || !brand.trim()}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Check Now
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No signup required • Instant results
            </p>
          </form>

          {/* Trust Signals */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm text-muted-foreground">
            <span>✅ No credit card required</span>
            <span>•</span>
            <span>⚡ Instant results</span>
            <span>•</span>
            <span>🔒 100% private</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

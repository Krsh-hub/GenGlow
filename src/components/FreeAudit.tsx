import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";

const FreeAudit = () => {
  const [email, setEmail] = useState("");
  const [brandName, setBrandName] = useState("");
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("audit_requests").insert([{
        brand_name: brandName.trim(),
        email: email.trim().toLowerCase(),
        url: url.trim() || null, // Optional field
        keywords: keywords.trim()
      }]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast({
        title: "Audit requested! 🎉",
        description: "I'll send your personalized report within 24-48 hours.",
      });
      
      // Reset form
      setEmail("");
      setBrandName("");
      setUrl("");
      setKeywords("");
    } catch (error) {
      console.error("Error submitting audit request:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header with "Free Audit" highlight */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-up">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">
                <span className="gradient-text font-bold">FREE AUDIT</span> — Limited to 20 this week
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-up">
              Get Your{" "}
              <span className="gradient-text">Free AI Visibility Audit</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-up-delay">
              I'll personally check if ChatGPT and Perplexity mention your brand 
              when people search your industry keywords.
            </p>
          </div>

          {/* Form */}
          <div className="glass p-8 md:p-10 rounded-2xl animate-fade-up-delay-2">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <CheckCircle2 className="w-16 h-16 text-accent" />
                <h3 className="text-2xl font-bold text-foreground">Request Received!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  I'll manually analyze your brand's AI visibility and send your 
                  personalized report within 24-48 hours.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Request Another Audit
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Brand Name <span className="text-accent">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="YourBrand"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Target Keywords <span className="text-accent">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="AI tools, brand tracking, marketing analytics"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    disabled={isLoading}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter 3-5 keywords you want to rank for (comma-separated)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Your Email <span className="text-accent">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">
                    Your Website URL <span className="text-muted-foreground text-xs">(Optional)</span>
                  </label>
                  <Input
                    type="url"
                    placeholder="https://yourbrand.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-secondary/50 border-border/50"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  disabled={isLoading}
                  className="w-full group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Your Free Audit
                      <Sparkles className="w-4 h-4 ml-2 transition-transform group-hover:rotate-12" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    100% free
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Personal analysis
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    24-48h delivery
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Social proof */}
          <p className="text-center text-sm text-muted-foreground mt-6 animate-fade-up-delay-2">
            💡 I'll show you exactly which competitors AI recommends instead of you
          </p>
        </div>
      </div>
    </section>
  );
};

export default FreeAudit;

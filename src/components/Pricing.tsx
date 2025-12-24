import { Sparkles } from "lucide-react";

const Pricing = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 md:p-12 rounded-3xl glass animate-fade-up">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-foreground" />
            </div>

            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Pricing
            </h2>

            <p className="text-xl text-muted-foreground mb-6">
              Pricing TBA — Early access members get special founding rates
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-foreground">
                Join early access for priority pricing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

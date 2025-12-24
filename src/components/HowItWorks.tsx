import { Link2, Bot, FileText, Rocket } from "lucide-react";

const steps = [
  {
    icon: Link2,
    number: "01",
    title: "Connect Your Brand",
    description:
      "Tell us your brand name and key products/services you want to track",
  },
  {
    icon: Bot,
    number: "02",
    title: "We Query AI Systems",
    description:
      "Our tool automatically tests how ChatGPT, Perplexity, and Gemini respond to relevant queries in your industry",
  },
  {
    icon: FileText,
    number: "03",
    title: "Get Your Visibility Report",
    description:
      "See where you appear, where you're missing, and what competitors are doing better",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Improve Your Presence",
    description:
      "Follow actionable recommendations to increase your AI visibility over time",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up-delay">
            Four simple steps to understand and improve your AI visibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-foreground" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-foreground text-xs font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-semibold text-lg text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

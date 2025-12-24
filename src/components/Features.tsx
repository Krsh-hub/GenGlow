import { MonitorCheck, Users, Lightbulb, TrendingUp } from "lucide-react";

const features = [
  {
    icon: MonitorCheck,
    title: "Multi-AI Tracking",
    description:
      "Monitor your brand mentions across ChatGPT, Perplexity, and Gemini in one dashboard",
  },
  {
    icon: Users,
    title: "Competitive Analysis",
    description:
      "See which competitors appear in AI answers when you don't, and why",
  },
  {
    icon: Lightbulb,
    title: "Actionable Insights",
    description:
      "Get specific recommendations to improve your AI visibility through content and positioning",
  },
  {
    icon: TrendingUp,
    title: "Trend Monitoring",
    description:
      "Track how your AI presence changes over time as you implement improvements",
  },
];

const Features = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
            What <span className="gradient-text">GenGlow</span> Does
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-up-delay">
            Everything you need to understand and improve your brand's presence in AI-generated answers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl glass group hover:scale-105 transition-transform duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

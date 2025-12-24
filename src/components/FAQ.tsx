import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const faqs = [
  {
    question: "What exactly does this tool track?",
    answer:
      "We monitor how often and accurately your brand appears in AI-generated answers across ChatGPT, Perplexity, and Gemini when users ask questions related to your industry.",
  },
  {
    question: "How is this different from SEO tools?",
    answer:
      "Traditional SEO tracks search rankings and keywords. We track what AI chatbots actually say about your brand—which is increasingly how people discover products and services.",
  },
  {
    question: "When will early access launch?",
    answer:
      "We're targeting Q1 2026 for the first beta invites. Early access members get priority onboarding and influence product development.",
  },
  {
    question: "Is my data private?",
    answer:
      "Yes. We only query publicly available AI systems using your brand name. We don't access any internal company data.",
  },
  {
    question: "What does early access cost?",
    answer:
      "Early access is free during beta. You'll get special founding member pricing when we launch paid plans.",
  },
];

const FAQ = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({
    threshold: 0.1,
  });

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              sectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about GenGlow
            </p>
          </div>

          <div
            className={`glass rounded-2xl p-6 md:p-8 transition-all duration-700 delay-200 ${
              sectionVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={`border-border/50 transition-all duration-500 ${
                    sectionVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: sectionVisible
                      ? `${300 + index * 100}ms`
                      : "0ms",
                  }}
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-foreground hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

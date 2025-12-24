import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About - GenGlow | AI Brand Visibility Tracking</title>
        <meta
          name="description"
          content="Understand how your brand appears in AI search answers. Track visibility across ChatGPT, Perplexity, and Gemini."
        />
        <link rel="canonical" href="https://genglow.ai/about" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="relative hero-glow overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
            </div>

            <div className="container mx-auto px-6 py-16 relative z-10">
              <div className="max-w-3xl mx-auto">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 animate-fade-up">
                  About <span className="gradient-text">GenGlow</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up-delay">
                  Most brands have no idea how they actually show up inside AI answers. 
                  Chatbots summarize, remix, and rank you in ways traditional SEO tools never see.
                </p>

                <p className="text-lg text-foreground/90 mb-12 animate-fade-up-delay">
                  This project helps you understand whether your brand{" "}
                  <span className="gradient-text font-semibold">glows</span> in AI search answers. 
                  It checks how often and how clearly you are mentioned across systems like ChatGPT, 
                  Perplexity, and Gemini, so you can see where you stand and what to improve next.
                </p>
              </div>
            </div>
          </section>

          {/* Focus Areas */}
          <section className="container mx-auto px-6 py-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">
                What we're building
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4 p-6 rounded-2xl glass animate-fade-up">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <Search className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      Find your brand in AI answers
                    </h3>
                    <p className="text-muted-foreground">
                      Discover when and how your brand appears in AI-generated responses across major platforms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl glass animate-fade-up-delay">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <Target className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      Highlight competitive gaps
                    </h3>
                    <p className="text-muted-foreground">
                      See where competitors are mentioned but you're missing — revealing opportunities to improve your visibility.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-2xl glass animate-fade-up-delay-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-bg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      Actionable insights
                    </h3>
                    <p className="text-muted-foreground">
                      Turn visibility data into concrete ideas for content, positioning, and PR strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="container mx-auto px-6 py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="p-8 md:p-12 rounded-3xl glass">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Ready to see how your brand glows?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join early access to influence what gets built, get visibility reports before everyone else, 
                  and help shape how brands measure their presence in AI-native search.
                </p>
                <Link to="/">
                  <Button variant="accent" size="lg" className="group">
                    Join early access
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;

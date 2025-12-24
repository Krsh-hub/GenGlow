import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>GenGlow - See if your brand glows in AI search answers</title>
        <meta
          name="description"
          content="Track your brand visibility across ChatGPT, Perplexity, and Gemini. Know when AI mentions your brand — and when it doesn't."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://genglow.ai" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <Pricing />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

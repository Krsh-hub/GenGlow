import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BrandGlow - See if your brand glows in AI search answers</title>
        <meta
          name="description"
          content="Track your brand visibility across ChatGPT, Perplexity, and Google AI. Know when AI mentions your brand — and when it doesn't."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://brandglow.ai" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

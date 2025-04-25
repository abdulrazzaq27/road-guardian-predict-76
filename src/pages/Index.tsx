
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PredictionMap from "@/components/PredictionMap";
import PredictionForm from "@/components/PredictionForm";
import ResultsDashboard from "@/components/ResultsDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <PredictionMap />
        <PredictionForm />
        <ResultsDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";
import { MapPin, Thermometer, Gauge, Database } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="hero" className="bg-gradient-to-b from-white to-guardian-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-guardian-dark sm:text-5xl md:text-6xl">
              <span className="block">Road Guardian</span>
              <span className="block text-guardian-primary">Predictive Analytics</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Identify roads prone to deterioration using advanced analytics of traffic, weather, and environmental data. Plan maintenance proactively, reduce costs, and ensure safer infrastructure.
            </p>
            <div className="mt-8 sm:flex">
              <div className="rounded-md shadow">
                <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-guardian-primary hover:bg-guardian-secondary md:py-4 md:text-lg md:px-10">
                  Start Predicting
                </Button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-guardian-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 flex justify-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 rounded-full bg-guardian-light flex items-center justify-center">
                  <Gauge className="h-6 w-6 text-guardian-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-guardian-dark">Traffic Analysis</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Analyze vehicle load and traffic intensity to predict impact on road surfaces.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 rounded-full bg-guardian-light flex items-center justify-center">
                  <Thermometer className="h-6 w-6 text-guardian-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-guardian-dark">Weather Impact</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Measure rainfall, temperature, and other climate factors affecting road degradation.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 rounded-full bg-guardian-light flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-guardian-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-guardian-dark">Location Insights</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Identify high-risk segments based on geographical and environmental conditions.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 rounded-full bg-guardian-light flex items-center justify-center">
                  <Database className="h-6 w-6 text-guardian-primary" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-guardian-dark">Historical Data</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Leverage past maintenance records to improve prediction accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { convertFormToDataPoint, predictDeterioration } from '@/utils/roadDataset';

export type PredictionResult = {
  roadName: string;
  riskScore: number;
  deteriorationRate: number;
  lifespan: number;
  needsRepair: boolean;
  maintenancePriority: 'Low' | 'Medium' | 'High' | 'Urgent';
  similarRoads: any[];
};

// Global state to store prediction results that can be accessed by ResultsDashboard
let globalPredictionResults: PredictionResult | null = null;

export const getPredictionResults = (): PredictionResult | null => {
  return globalPredictionResults;
};

const PredictionForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    roadName: '',
    roadAge: 5,
    trafficVolume: 50,
    heavyVehiclesPercentage: 20,
    annualRainfall: 30,
    temperatureFluctuation: 40,
    soilType: 'clay',
  });

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({
      ...formData,
      [name]: value[0],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const determinePriority = (riskScore: number, lifespan: number): 'Low' | 'Medium' | 'High' | 'Urgent' => {
    if (riskScore >= 75) return 'Urgent';
    if (riskScore >= 60) return 'High';
    if (riskScore >= 40) return 'Medium';
    return 'Low';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.roadName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a road name",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Convert form data to our dataset format
    const dataPoint = convertFormToDataPoint(formData);
    console.log("Input data point:", dataPoint);
    
    // Use our prediction model
    setTimeout(() => {
      try {
        const prediction = predictDeterioration(dataPoint, 10);
        console.log("Prediction results:", prediction);
        
        // Create the prediction result
        const result: PredictionResult = {
          roadName: formData.roadName,
          riskScore: prediction.riskScore,
          deteriorationRate: Number(prediction.deteriorationRate.toFixed(2)),
          lifespan: Number(prediction.lifespan.toFixed(1)),
          needsRepair: prediction.needsRepair,
          maintenancePriority: determinePriority(prediction.riskScore, prediction.lifespan),
          similarRoads: prediction.similarRoads.slice(0, 5) // Limit to avoid overwhelming UI
        };
        
        // Store the result globally
        globalPredictionResults = result;
        
        setIsLoading(false);
        toast({
          title: "Prediction Generated",
          description: `Road risk prediction has been calculated for ${formData.roadName}.`,
        });
        
        // Scroll to the dashboard section
        const dashboardSection = document.getElementById('dashboard');
        if (dashboardSection) {
          dashboardSection.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error("Prediction error:", error);
        setIsLoading(false);
        toast({
          title: "Prediction Error",
          description: "An error occurred while calculating the prediction.",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <section id="predict" className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-guardian-dark sm:text-4xl">
            Predict Road Deterioration
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Enter road data to generate deterioration predictions.
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="roadName">Road Name or ID</Label>
                <Input
                  id="roadName"
                  name="roadName"
                  placeholder="Enter road name or ID"
                  value={formData.roadName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="roadAge">Road Age (Years): {formData.roadAge}</Label>
                <Slider
                  id="roadAge"
                  min={0}
                  max={30}
                  step={1}
                  value={[formData.roadAge]}
                  onValueChange={(value) => handleSliderChange('roadAge', value)}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>New</span>
                  <span>30 years</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="trafficVolume">Daily Traffic Volume: {formData.trafficVolume}</Label>
                <Slider
                  id="trafficVolume"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.trafficVolume]}
                  onValueChange={(value) => handleSliderChange('trafficVolume', value)}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="heavyVehiclesPercentage">Heavy Vehicles (%): {formData.heavyVehiclesPercentage}%</Label>
                <Slider
                  id="heavyVehiclesPercentage"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.heavyVehiclesPercentage]}
                  onValueChange={(value) => handleSliderChange('heavyVehiclesPercentage', value)}
                  className="py-4"
                />
              </div>
              
              <div>
                <Label htmlFor="annualRainfall">Annual Rainfall Level: {formData.annualRainfall}</Label>
                <Slider
                  id="annualRainfall"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.annualRainfall]}
                  onValueChange={(value) => handleSliderChange('annualRainfall', value)}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Dry</span>
                  <span>Very wet</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="temperatureFluctuation">Temperature Fluctuation: {formData.temperatureFluctuation}</Label>
                <Slider
                  id="temperatureFluctuation"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.temperatureFluctuation]}
                  onValueChange={(value) => handleSliderChange('temperatureFluctuation', value)}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Stable</span>
                  <span>Extreme</span>
                </div>
              </div>
              
              <div>
                <Label htmlFor="soilType">Underlying Soil Type</Label>
                <Select 
                  value={formData.soilType} 
                  onValueChange={(value) => handleSelectChange('soilType', value)}
                >
                  <SelectTrigger id="soilType">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sand">Sandy</SelectItem>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="silt">Silt</SelectItem>
                    <SelectItem value="loam">Loam</SelectItem>
                    <SelectItem value="gravel">Gravel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-guardian-primary hover:bg-guardian-secondary"
                disabled={isLoading}
              >
                {isLoading ? 'Calculating...' : 'Generate Prediction'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PredictionForm;

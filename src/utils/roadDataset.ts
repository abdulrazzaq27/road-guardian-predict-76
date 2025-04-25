
// Road deterioration dataset
export interface RoadDataPoint {
  constructionYear: number;
  lastRepairYear: number;
  soilType: number; // 0, 1, 2
  trafficVolume: number; // 0, 1, 2, 3, 4
  weatherCondition: number; // 0, 1, 2
  materialQuality: number; // 0, 1, 2
  deteriorationRate: number;
  age: number;
  timeSinceRepair: number;
  needsRepair: number; // 1 = yes
}

// Sample of the dataset (500+ entries would be here)
export const roadDataset: RoadDataPoint[] = [
  { constructionYear: 2001, lastRepairYear: 2007, soilType: 2, trafficVolume: 4, weatherCondition: 0, materialQuality: 2, deteriorationRate: 18.80657034034078, age: 24.00957492857864, timeSinceRepair: 18.79692376803254, needsRepair: 1 },
  { constructionYear: 2001, lastRepairYear: 2007, soilType: 0, trafficVolume: 0, weatherCondition: 0, materialQuality: 2, deteriorationRate: 17.347180191995875, age: 23.08161641808716, timeSinceRepair: 17.532735508357284, needsRepair: 1 },
  { constructionYear: 2009, lastRepairYear: 2012, soilType: 0, trafficVolume: 0, weatherCondition: 2, materialQuality: 0, deteriorationRate: 11.490035845983295, age: 16.432383599935825, timeSinceRepair: 13.893203022661696, needsRepair: 1 },
  // More data would be added here
];

// Convert the form data to the same format as our dataset
export const convertFormToDataPoint = (formData: {
  roadAge: number;
  trafficVolume: number;
  heavyVehiclesPercentage: number;
  annualRainfall: number;
  temperatureFluctuation: number;
  soilType: string;
}) => {
  const currentYear = new Date().getFullYear();
  const constructionYear = currentYear - formData.roadAge;
  
  // Map form values to dataset format
  const soilTypeMap: Record<string, number> = {
    'sand': 0,
    'clay': 1,
    'silt': 2,
    'loam': 1,
    'gravel': 0
  };
  
  // Scale traffic volume from 0-100 to 0-4
  const trafficVolume = Math.min(Math.floor(formData.trafficVolume / 20), 4);
  
  // Map weather condition based on rainfall and temperature
  const weatherCondition = Math.min(Math.floor((formData.annualRainfall + formData.temperatureFluctuation) / 70), 2);
  
  // Map material quality based on heavy vehicles (inverse relation)
  const materialQuality = Math.min(Math.floor((100 - formData.heavyVehiclesPercentage) / 33), 2);
  
  // Calculate last repair year (more dynamic than before)
  const yearsSinceRepair = Math.max(2, Math.floor(formData.roadAge * 0.3));
  const lastRepairYear = currentYear - yearsSinceRepair;
  
  return {
    constructionYear,
    lastRepairYear,
    soilType: soilTypeMap[formData.soilType] ?? 1,
    trafficVolume,
    weatherCondition,
    materialQuality,
    deteriorationRate: 0, // Will be predicted
    age: formData.roadAge,
    timeSinceRepair: yearsSinceRepair,
    needsRepair: 0 // Will be predicted
  };
};

// Calculate similarity between two data points
export const calculateSimilarity = (a: RoadDataPoint, b: RoadDataPoint): number => {
  // Weights for different factors
  const weights = {
    soilType: 0.15,
    trafficVolume: 0.25,
    weatherCondition: 0.20,
    materialQuality: 0.15,
    age: 0.15,
    timeSinceRepair: 0.10
  };
  
  // Calculate normalized distance for each factor
  const soilTypeDiff = a.soilType === b.soilType ? 0 : 1;
  const trafficVolumeDiff = Math.abs(a.trafficVolume - b.trafficVolume) / 4;
  const weatherConditionDiff = Math.abs(a.weatherCondition - b.weatherCondition) / 2;
  const materialQualityDiff = Math.abs(a.materialQuality - b.materialQuality) / 2;
  
  // Modified to handle extreme values better
  const maxAge = 45;
  const maxTimeSinceRepair = 40;
  const ageDiff = Math.min(Math.abs(a.age - b.age) / maxAge, 1);
  const timeSinceRepairDiff = Math.min(Math.abs(a.timeSinceRepair - b.timeSinceRepair) / maxTimeSinceRepair, 1);
  
  // Calculate weighted similarity (1 = identical, 0 = completely different)
  const similarity = 1 - (
    weights.soilType * soilTypeDiff +
    weights.trafficVolume * trafficVolumeDiff +
    weights.weatherCondition * weatherConditionDiff +
    weights.materialQuality * materialQualityDiff +
    weights.age * ageDiff +
    weights.timeSinceRepair * timeSinceRepairDiff
  );
  
  return Math.max(0, Math.min(1, similarity)); // Ensure value is between 0 and 1
};

// Predict road deterioration based on k-nearest neighbors
export const predictDeterioration = (inputData: RoadDataPoint, k: number = 5): {
  deteriorationRate: number;
  needsRepair: boolean;
  riskScore: number;
  lifespan: number;
  similarRoads: RoadDataPoint[];
} => {
  // Calculate similarity with each data point in dataset
  const similarityScores = roadDataset.map(dataPoint => ({
    dataPoint,
    similarity: calculateSimilarity(inputData, dataPoint)
  }));
  
  // Get k most similar data points
  const nearestNeighbors = similarityScores
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, k)
    .map(item => item.dataPoint);
  
  // Calculate weighted average deterioration rate with safeguards for edge cases
  const totalSimilarity = similarityScores
    .slice(0, k)
    .reduce((sum, item) => sum + item.similarity, 0);
    
  const deteriorationRate = totalSimilarity > 0 ? 
    similarityScores
      .slice(0, k)
      .reduce((sum, item) => sum + (item.similarity * item.dataPoint.deteriorationRate), 0) / totalSimilarity
    : 15; // Default value if no similarities found
  
  // Determine if road needs repair with weighted probability
  const weightedRepairSum = similarityScores
    .slice(0, k)
    .reduce((sum, item) => sum + (item.similarity * item.dataPoint.needsRepair), 0);
    
  const needsRepairProbability = totalSimilarity > 0 ? 
    weightedRepairSum / totalSimilarity : 0.5;
  
  const needsRepair = needsRepairProbability > 0.5;
  
  // Calculate risk score (0-100) based on multiple factors
  const ageRiskFactor = Math.min(inputData.age / 40, 1) * 30;
  const repairRiskFactor = Math.min(inputData.timeSinceRepair / 35, 1) * 25;
  const deteriorationRiskFactor = Math.min(deteriorationRate / 25, 1) * 35;
  const needsRepairFactor = needsRepair ? 10 : 0;
  
  const riskScore = Math.min(
    Math.round(
      deteriorationRiskFactor + 
      needsRepairFactor + 
      ageRiskFactor + 
      repairRiskFactor
    ), 100);
  
  // Calculate more accurate lifespan estimate
  let lifespan = 0;
  if (needsRepair) {
    // Roads that need repair have shorter lifespan
    lifespan = Math.max(0.5, 5 - (deteriorationRate / 15));
  } else {
    // Roads in better condition
    const trafficImpact = inputData.trafficVolume * 0.5;
    const weatherImpact = inputData.weatherCondition * 0.7;
    const qualityBonus = (2 - inputData.materialQuality) * 0.8;
    const ageImpact = Math.min(inputData.age / 20, 1) * 2;
    
    lifespan = Math.max(1, 12 - trafficImpact - weatherImpact - ageImpact + qualityBonus);
  }
  
  return {
    deteriorationRate: Math.max(0, deteriorationRate),
    needsRepair,
    riskScore,
    lifespan,
    similarRoads: nearestNeighbors
  };
};

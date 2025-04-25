import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";

// Sample data for charts
const deteriorationData = [
  { year: '2025', baseline: 95, predicted: 93 },
  { year: '2026', baseline: 90, predicted: 85 },
  { year: '2027', baseline: 85, predicted: 75 },
  { year: '2028', baseline: 80, predicted: 65 },
  { year: '2029', baseline: 75, predicted: 55 },
  { year: '2030', baseline: 70, predicted: 45 },
];

const factorsData = [
  { name: 'Traffic', value: 35 },
  { name: 'Weather', value: 25 },
  { name: 'Age', value: 20 },
  { name: 'Materials', value: 15 },
  { name: 'Soil', value: 5 },
];

const monthlyData = [
  { month: 'Jan', degradation: 2 },
  { month: 'Feb', degradation: 3 },
  { month: 'Mar', degradation: 3.5 },
  { month: 'Apr', degradation: 2.5 },
  { month: 'May', degradation: 4 },
  { month: 'Jun', degradation: 5 },
  { month: 'Jul', degradation: 3 },
  { month: 'Aug', degradation: 2 },
  { month: 'Sep', degradation: 3.5 },
  { month: 'Oct', degradation: 4.5 },
  { month: 'Nov', degradation: 5 },
  { month: 'Dec', degradation: 6 },
];

const ResultsDashboard = () => {
  const riskScore = 78; // Sample risk score
  const getRiskColor = (score: number) => {
    if (score >= 75) return 'text-guardian-risk-high';
    if (score >= 50) return 'text-guardian-risk-medium';
    return 'text-guardian-risk-low';
  };

  const getRiskBackground = (score: number) => {
    if (score >= 75) return 'bg-red-100';
    if (score >= 50) return 'bg-amber-100';
    return 'bg-green-100';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 75) return 'High';
    if (score >= 50) return 'Medium';
    return 'Low';
  };

  const getProgressColorClass = (score: number) => {
    if (score >= 75) return 'bg-guardian-risk-high';
    if (score >= 50) return 'bg-guardian-risk-medium';
    return 'bg-guardian-risk-low';
  };

  return (
    <section id="dashboard" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-guardian-dark sm:text-4xl">
            Road Health Dashboard
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Detailed analysis and visualizations of predicted road deterioration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className={`${getRiskBackground(riskScore)} border-0`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-700">Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className={`text-4xl font-bold ${getRiskColor(riskScore)}`}>{riskScore}</span>
                <span className="ml-2 text-sm text-gray-500">/ 100</span>
              </div>
              <p className={`text-sm mt-1 font-medium ${getRiskColor(riskScore)}`}>
                {getRiskLevel(riskScore)} Risk Level
              </p>
              <div className="relative">
                <Progress 
                  className="h-2 mt-3" 
                  value={riskScore} 
                />
                <div 
                  className={`${getProgressColorClass(riskScore)} h-2 absolute top-0 mt-3 left-0 rounded-full`}
                  style={{ width: `${riskScore}%` }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-700">Estimated Lifespan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-guardian-dark">5.3</span>
                <span className="ml-2 text-sm text-gray-500">years</span>
              </div>
              <p className="text-sm mt-1 text-gray-500">
                Without intervention
              </p>
              <Progress className="h-2 mt-3" value={53} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-700">Maintenance Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-guardian-primary">Urgent</span>
              </div>
              <p className="text-sm mt-1 text-gray-500">
                Schedule within 6 months
              </p>
              <div className="relative">
                <Progress className="h-2 mt-3 bg-guardian-light" value={80} />
                <div 
                  className="bg-guardian-primary h-2 absolute top-0 mt-3 left-0 rounded-full" 
                  style={{ width: '80%' }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Projected Deterioration</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={deteriorationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} label={{ value: 'Road Condition (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="baseline" name="Baseline" stroke="#0ea5e9" fill="#e0f2fe" />
                  <Area type="monotone" dataKey="predicted" name="Predicted" stroke="#ef4444" fill="#fee2e2" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contributing Factors</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={factorsData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Impact']} />
                  <Legend />
                  <Bar dataKey="value" name="Impact %" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Degradation Rate</CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Degradation Rate (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="degradation" stroke="#0ea5e9" activeDot={{ r: 8 }} name="Degradation Rate" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-10 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-guardian-dark mb-4">Recommendation Report</h3>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4">
              Based on the analysis, this road segment shows a <span className="font-medium text-guardian-risk-high">high risk</span> of deterioration over the next 2 years, primarily due to heavy vehicle traffic and weather conditions.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-guardian-dark">Suggested Actions:</h4>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>Schedule comprehensive inspection within 1 month</li>
                  <li>Plan for resurfacing in the upcoming budget cycle</li>
                  <li>Consider traffic management options to reduce heavy vehicle impact</li>
                  <li>Implement improved drainage to mitigate water damage</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-guardian-dark">Cost-Benefit Analysis:</h4>
                <p className="text-gray-700 mt-1">
                  Preemptive maintenance now would cost approximately 30-40% less than emergency repairs likely to be required within 12 months.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-guardian-dark">Monitoring Plan:</h4>
                <p className="text-gray-700 mt-1">
                  Recommend quarterly inspections with focused attention on surface cracking and drainage effectiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsDashboard;

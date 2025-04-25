
import { useState } from 'react';

const PredictionMap = () => {
  const [mapView, setMapView] = useState('risk');

  return (
    <section id="map" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-guardian-dark sm:text-4xl">
            Interactive Road Risk Map
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Visualize road segments by deterioration risk level and contributing factors.
          </p>
        </div>
        
        <div className="flex justify-center mb-4 space-x-2">
          <button 
            onClick={() => setMapView('risk')} 
            className={`px-4 py-2 rounded-md text-sm font-medium ${mapView === 'risk' ? 'bg-guardian-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Risk Level
          </button>
          <button 
            onClick={() => setMapView('traffic')} 
            className={`px-4 py-2 rounded-md text-sm font-medium ${mapView === 'traffic' ? 'bg-guardian-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Traffic Impact
          </button>
          <button 
            onClick={() => setMapView('weather')} 
            className={`px-4 py-2 rounded-md text-sm font-medium ${mapView === 'weather' ? 'bg-guardian-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Weather Effects
          </button>
        </div>
        
        <div className="relative h-96 bg-gray-100 rounded-lg shadow-inner overflow-hidden">
          {/* Map placeholder - In a real app, this would be an actual map component */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full p-4">
              <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-200">
                {/* Simulated map with road segments */}
                <div className="absolute w-full h-full">
                  {mapView === 'risk' && (
                    <>
                      <div className="absolute top-[20%] left-[10%] w-[30%] h-2 bg-guardian-risk-high rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[35%] left-[25%] w-[40%] h-2 bg-guardian-risk-medium rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[50%] left-[15%] w-[25%] h-2 bg-guardian-risk-low rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[65%] left-[30%] w-[35%] h-2 bg-guardian-risk-high rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[80%] left-[20%] w-[45%] h-2 bg-guardian-risk-medium rounded-full animate-pulse-slow"></div>
                    </>
                  )}
                  {mapView === 'traffic' && (
                    <>
                      <div className="absolute top-[20%] left-[10%] w-[30%] h-2 bg-blue-600 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[35%] left-[25%] w-[40%] h-2 bg-blue-400 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[50%] left-[15%] w-[25%] h-2 bg-blue-300 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[65%] left-[30%] w-[35%] h-2 bg-blue-600 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[80%] left-[20%] w-[45%] h-2 bg-blue-500 rounded-full animate-pulse-slow"></div>
                    </>
                  )}
                  {mapView === 'weather' && (
                    <>
                      <div className="absolute top-[20%] left-[10%] w-[30%] h-2 bg-purple-600 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[35%] left-[25%] w-[40%] h-2 bg-purple-400 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[50%] left-[15%] w-[25%] h-2 bg-purple-300 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[65%] left-[30%] w-[35%] h-2 bg-purple-700 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-[80%] left-[20%] w-[45%] h-2 bg-purple-500 rounded-full animate-pulse-slow"></div>
                    </>
                  )}
                </div>
                
                <svg className="absolute inset-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10%" cy="20%" r="4" fill={mapView === 'risk' ? '#EF4444' : mapView === 'traffic' ? '#2563EB' : '#7C3AED'} />
                  <circle cx="25%" cy="35%" r="4" fill={mapView === 'risk' ? '#F59E0B' : mapView === 'traffic' ? '#3B82F6' : '#8B5CF6'} />
                  <circle cx="15%" cy="50%" r="4" fill={mapView === 'risk' ? '#10B981' : mapView === 'traffic' ? '#60A5FA' : '#A78BFA'} />
                  <circle cx="30%" cy="65%" r="4" fill={mapView === 'risk' ? '#EF4444' : mapView === 'traffic' ? '#2563EB' : '#4F46E5'} />
                  <circle cx="20%" cy="80%" r="4" fill={mapView === 'risk' ? '#F59E0B' : mapView === 'traffic' ? '#3B82F6' : '#8B5CF6'} />
                </svg>
                
                <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow">
                  <div className="text-xs font-medium mb-1">Legend:</div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${mapView === 'risk' ? 'bg-guardian-risk-high' : mapView === 'traffic' ? 'bg-blue-600' : 'bg-purple-700'}`}></span>
                    <span className="text-xs">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${mapView === 'risk' ? 'bg-guardian-risk-medium' : mapView === 'traffic' ? 'bg-blue-400' : 'bg-purple-500'}`}></span>
                    <span className="text-xs">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-block w-3 h-3 rounded-full ${mapView === 'risk' ? 'bg-guardian-risk-low' : mapView === 'traffic' ? 'bg-blue-300' : 'bg-purple-300'}`}></span>
                    <span className="text-xs">Low</span>
                  </div>
                </div>
                
                <div className="absolute top-4 left-4 bg-white bg-opacity-80 p-2 rounded-md shadow text-xs">
                  Map view: <span className="font-medium">{mapView === 'risk' ? 'Risk Level' : mapView === 'traffic' ? 'Traffic Impact' : 'Weather Effects'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 max-w-3xl mx-auto text-sm text-gray-500">
          <p>
            This interactive map displays roads with different risk factors. Toggle between views to see how traffic, weather, and overall risk levels affect road conditions.
          </p>
          <p className="mt-2">
            In a production environment, this would be implemented with real geospatial data and interactive mapping libraries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PredictionMap;

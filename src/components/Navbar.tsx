
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Database, Gauge, MapPin, Thermometer } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Gauge className="h-8 w-8 text-guardian-primary mr-2" />
              <span className="text-xl font-bold text-guardian-dark">Road Guardian</span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#hero" className="text-guardian-dark hover:text-guardian-primary border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </a>
              <a href="#map" className="text-gray-500 hover:text-guardian-primary border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Road Map
              </a>
              <a href="#predict" className="text-gray-500 hover:text-guardian-primary border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Predict
              </a>
              <a href="#dashboard" className="text-gray-500 hover:text-guardian-primary border-transparent inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
            </div>
          </div>
          <div className="hidden md:flex md:items-center">
            <Button className="bg-guardian-primary hover:bg-guardian-secondary text-white">
              Get Started
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-guardian-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#hero" className="border-guardian-primary text-guardian-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Home
            </a>
            <a href="#map" className="border-transparent text-gray-500 hover:text-guardian-primary block pl-3 pr-4 py-2 hover:border-guardian-primary border-l-4 text-base font-medium">
              Road Map
            </a>
            <a href="#predict" className="border-transparent text-gray-500 hover:text-guardian-primary block pl-3 pr-4 py-2 hover:border-guardian-primary border-l-4 text-base font-medium">
              Predict
            </a>
            <a href="#dashboard" className="border-transparent text-gray-500 hover:text-guardian-primary block pl-3 pr-4 py-2 hover:border-guardian-primary border-l-4 text-base font-medium">
              Dashboard
            </a>
            <div className="pl-3 pr-4 py-2">
              <Button className="w-full bg-guardian-primary hover:bg-guardian-secondary text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

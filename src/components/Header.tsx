
import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-dengue-blue py-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <AlertTriangle className="w-8 h-8 mr-2 text-white" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              OviScan
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a 
                  href="#" 
                  className="text-white hover:text-dengue-gray font-medium"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="#info" 
                  className="text-white hover:text-dengue-gray font-medium"
                >
                  Información
                </a>
              </li>
              <li>
                <a 
                  href="#detector" 
                  className="text-white hover:text-dengue-gray font-medium"
                >
                  Detector
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dengue-dark text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">OviScan</h3>
            <p className="text-sm text-gray-300">
              Una herramienta para la detección temprana de huevos de Aedes Aegypti 
              utilizando inteligencia artificial para ayudar en la prevención del dengue.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces útiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-300 hover:text-white">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#info" className="text-sm text-gray-300 hover:text-white">
                  Información sobre el dengue
                </a>
              </li>
              <li>
                <a href="#detector" className="text-sm text-gray-300 hover:text-white">
                  Detector de huevos
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.who.int/es/news-room/fact-sheets/detail/dengue-and-severe-dengue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  OMS: Información sobre el dengue
                </a>
              </li>
              <li>
                <a 
                  href="https://www.paho.org/es/temas/dengue" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  OPS: Prevención del dengue
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cdc.gov/dengue/es/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-300 hover:text-white"
                >
                  CDC: Control de vectores
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()}  OviScan. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

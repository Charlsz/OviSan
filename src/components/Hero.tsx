
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="bg-dengue-gray py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-dengue-dark mb-4">
              Detecta huevos de Aedes Aegypti
            </h1>
            <p className="text-lg md:text-xl text-dengue-dark mb-6">
              Utiliza nuestra herramienta con inteligencia artificial para identificar 
              huevos de mosquitos que transmiten el dengue y protege a tu comunidad.
            </p>
            <div className="flex space-x-4">
              <Button
                size="lg"
                className="bg-dengue-blue hover:bg-blue-700 text-white"
                onClick={() => {
                  const element = document.getElementById('detector');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Comenzar análisis
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-dengue-blue text-dengue-blue hover:text-white hover:bg-dengue-blue"
                onClick={() => {
                  const element = document.getElementById('info');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Más información
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/mosquito.jpg" 
                alt="Mosquito Aedes Aegypti" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-dengue-blue/20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

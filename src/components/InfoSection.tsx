import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, BarChart2 } from 'lucide-react';
import AnimatedCountUp from './ui/animate-countup';
const InfoSection: React.FC = () => {
  return (
    <section id="info" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dengue-dark mb-4">
            Información sobre el Dengue
          </h2>
          <p className="text-lg text-dengue-dark/80 max-w-3xl mx-auto">
            El dengue es una enfermedad viral transmitida por mosquitos que afecta a millones de personas cada año. 
            Conoce cómo identificar y prevenir la reproducción del mosquito Aedes Aegypti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-dengue-orange" />
                Síntomas del Dengue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Fiebre alta (40°C/104°F)</li>
                <li>Dolor de cabeza intenso</li>
                <li>Dolor detrás de los ojos</li>
                <li>Dolor en músculos y articulaciones</li>
                <li>Náuseas y vómitos</li>
                <li>Erupción cutánea</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-dengue-orange" />
                Ciclo de Vida del Mosquito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">El ciclo completo dura aproximadamente 8-10 días:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Huevo:</strong> Pequeños, ovalados y negros</li>
                <li><strong>Larva:</strong> Fase acuática, se alimentan de microorganismos</li>
                <li><strong>Pupa:</strong> No se alimentan, desarrollo final</li>
                <li><strong>Adulto:</strong> Mosquito completo, transmisor del virus</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-dengue-orange" />
                Prevención
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Eliminar recipientes con agua estancada</li>
                <li>Cubrir tanques y depósitos de agua</li>
                <li>Limpiar canaletas y desagües</li>
                <li>Usar mosquiteros y repelentes</li>
                <li>Mantener patios y jardines limpios</li>
                <li>Reportar casos a autoridades sanitarias</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Nueva sección de estadísticas */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-dengue-dark mb-6 flex justify-center items-center gap-2">
            <BarChart2 className="text-dengue-blue" />
            Estadísticas Globales (2023)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-dengue-dark">
            <div>
              <AnimatedCountUp key={6.5} end={6.5} decimals={1} duration={3}  decimal="," separator="," suffix=" M" className="text-4xl font-bold text-dengue-blue" />
 
              <p className="text-lg">Casos reportados</p>
            </div>
            <div>
            <AnimatedCountUp end={8000} duration={3} separator="." suffix="" decimals={0} className="text-4xl font-bold text-dengue-orange" />
              <p className="text-lg">Muertes confirmadas únicamente en América</p>
            </div>
            <div>
            <AnimatedCountUp end={3900} duration={3} separator="." suffix=" M" decimals={0} className="text-4xl font-bold text-dengue-green" />
              <p className="text-lg">Personas en riesgo</p>
            </div>
            <div>
            <AnimatedCountUp end={4} duration={2} separator="" suffix="" decimals={0} className="text-4xl font-bold text-dengue-dark" />
              <p className="text-lg">Serotipos del virus</p>
            </div>
          </div>
          <p className="text-sm text-dengue-dark/60 mt-4">
            Fuente: OMS, 2023-2024
          </p>
        </div>

        {/* Sección existente: identificación de huevos */}
        <div className="mt-12 p-6 py-8 bg-dengue-gray rounded-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-dengue-dark mb-4 text-center">
            ¿Cómo identificar los huevos de Aedes Aegypti?
          </h2>
          <div className="flex flex-col md:flex-row items-center md:mt-8">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
              <img 
                src="huevosmosquitos.jpg" 
                alt="Huevos de Aedes Aegypti" 
                className="rounded-lg w-full h-auto shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <p className="text-lg text-dengue-dark/80 mb-4">
                Los huevos del mosquito Aedes Aegypti tienen las siguientes características:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Son extremadamente pequeños (menos de 1 mm)</li>
                <li>Tienen forma ovalada o elíptica</li>
                <li>Son de color negro o marrón oscuro cuando están maduros</li>
                <li>Se depositan individualmente en las paredes de recipientes con agua</li>
                <li>Son resistentes a la sequía y pueden sobrevivir meses sin agua</li>
              </ul>
              <p className="mt-4 text-lg text-dengue-dark/80">
                Nuestra herramienta de detección ayuda a identificar estos huevos en imágenes para 
                una detección temprana y control efectivo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;

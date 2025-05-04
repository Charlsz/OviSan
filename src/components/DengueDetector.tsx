
import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUploader from './ImageUploader';
import AnalysisResult from './AnalysisResult';
import { useToast } from '@/components/ui/use-toast';
import { analyzeImage } from '@/services/geminiService';

const DengueDetector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (file: File, base64: string) => {
    setSelectedFile(file);
    setBase64Image(base64);
    setAnalysisResult(null);
    setIsError(false);
  };

  const handleAnalyze = async () => {
    if (!base64Image || !selectedFile) {
      toast({
        title: "Error",
        description: "Por favor sube una imagen primero",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setIsError(false);

    try {
      // Call the analyzeImage service function with the Google GenAI SDK
      const result = await analyzeImage(base64Image);
      
      setAnalysisResult(result.text);
      setConfidenceScore(result.confidence);
      setIsError(!!result.error);
      
      if (result.error) {
        toast({
          title: "Error",
          description: "Ha ocurrido un error al analizar la imagen",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setIsError(true);
      setAnalysisResult("Ha ocurrido un error al analizar la imagen. Por favor intenta nuevamente.");
      
      toast({
        title: "Error",
        description: "Ha ocurrido un error al analizar la imagen",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="detector" className="py-16 bg-dengue-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dengue-dark mb-4">
            Detector de Huevos de Aedes Aegypti
          </h2>
          <p className="text-lg text-dengue-dark/80 max-w-3xl mx-auto">
            Sube una imagen clara de posibles huevos de mosquito para que nuestra 
            inteligencia artificial analice y determine si son huevos de Aedes Aegypti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              isLoading={isAnalyzing}
            />
            <div className="mt-4">
              <Button 
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className="w-full bg-dengue-blue hover:bg-blue-700"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-t-white border-white/20 border-solid rounded-full animate-spin mr-2"></span>
                    Analizando...
                  </>
                ) : (
                  "Analizar imagen"
                )}
              </Button>
            </div>
          </div>
          
          <div>
            {analysisResult ? (
              <AnalysisResult 
                result={analysisResult} 
                confidenceScore={confidenceScore}
                isError={isError}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-border">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-dengue-blue/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-dengue-blue" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-dengue-dark mb-2">Esperando análisis</h3>
                    <p className="text-muted-foreground">
                      Sube una imagen y presiona "Analizar imagen" para comenzar
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-white rounded-lg border border-border">
              <h4 className="font-medium mb-3">Consejos para mejores resultados:</h4>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Utiliza una cámara con buena resolución</li>
                <li>Asegúrate de que la imagen esté bien enfocada</li>
                <li>Toma la foto con buena iluminación natural</li>
                <li>Acércate lo suficiente para capturar detalles</li>
                <li>Evita sombras o reflejos en la superficie</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DengueDetector;

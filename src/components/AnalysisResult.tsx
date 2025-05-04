
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface AnalysisResultProps {
  result: string | null;
  confidenceScore?: number;
  isError?: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  confidenceScore = 0, 
  isError = false 
}) => {
  if (!result) return null;

  const getResultType = () => {
    if (isError) return "error";
    
    const resultLower = result.toLowerCase();
    if (resultLower.includes("no hay") || 
        resultLower.includes("no se detectan") || 
        resultLower.includes("no identifico") ||
        resultLower.includes("no se observan")) {
      return "negative";
    } else if (resultLower.includes("hay") || 
               resultLower.includes("se detectan") ||
               resultLower.includes("identifico") ||
               resultLower.includes("se observan")) {
      return "positive";
    } else {
      return "uncertain";
    }
  };

  const resultType = getResultType();
  
  const getResultIcon = () => {
    switch(resultType) {
      case "negative":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "positive":
        return <AlertTriangle className="w-8 h-8 text-dengue-orange" />;
      case "error":
        return <AlertCircle className="w-8 h-8 text-dengue-red" />;
      default:
        return <AlertCircle className="w-8 h-8 text-dengue-blue" />;
    }
  };

  const getResultBackground = () => {
    switch(resultType) {
      case "negative":
        return "bg-green-50";
      case "positive":
        return "bg-orange-50";
      case "error":
        return "bg-red-50";
      default:
        return "bg-blue-50";
    }
  };

  return (
    <Card className={`w-full ${getResultBackground()}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getResultIcon()}
          <span>
            {isError ? "Error en el análisis" : "Resultado del análisis"}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-lg">
            {result}
          </div>
          
          {!isError && confidenceScore > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Nivel de confianza</span>
                <span>{Math.round(confidenceScore * 100)}%</span>
              </div>
              <Progress value={confidenceScore * 100} className="h-2" />
            </div>
          )}
          
          {resultType === "positive" && !isError && (
            <div className="p-4 bg-dengue-orange/20 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-dengue-orange" />
                Recomendaciones
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Elimina el agua estancada donde encontraste los huevos</li>
                <li>Limpia bien el recipiente con agua y jabón</li>
                <li>Voltea, tapa o descarta cualquier recipiente que pueda acumular agua</li>
                <li>Notifica a las autoridades sanitarias de tu localidad</li>
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResult;

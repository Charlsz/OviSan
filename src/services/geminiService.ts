/**
 * Servicio para analizar imágenes con Gemini (Google Generative AI)
 * y detectar posibles huevos de Aedes aegypti.
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

export interface AnalysisResult {
  text: string;
  confidence: number;
  error?: boolean;
}

// Clave de API desde entorno (debe estar definida en .env como VITE_GEMINI_API_KEY)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Extrae el nivel de confianza desde el texto de respuesta de Gemini
 */
const extractConfidenceScore = (text: string): number => {
  const confidenceRegex = /conf(?:ianza|idence):\s*(0(?:\.\d+)?|1(?:\.0+)?)/i;
  const match = text.match(confidenceRegex);
  
  if (match && match[1]) {
    return parseFloat(match[1]);
  }

  // Estimaciones por palabras clave
  const t = text.toLowerCase();
  if (t.includes("no hay") || t.includes("no se detectan")) return 0.85;
  if (t.includes("hay") || t.includes("se detectan")) return 0.75;
  if (t.includes("calidad") || t.includes("iluminación") || t.includes("enfoque")) return 0.5;

  return 0.7; // Valor por defecto
};

/**
 * Analiza una imagen base64 con Gemini para detectar huevos de Aedes aegypti
 */
export const analyzeImage = async (imageBase64: string): Promise<AnalysisResult> => {
  const base64Data = imageBase64.split(',')[1] || imageBase64;

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
      
      systemInstruction: `
        Eres un entomólogo especializado en la detección de huevos de *Aedes aegypti*
        en condiciones reales de campo.

        Ten en cuenta:
        - Los huevos miden menos de 1 mm, son oscuros (negros, marrón oscuro o gris),
          y a menudo difíciles de distinguir por suciedad, desenfoque o baja resolución.
        - Aparecen en superficies como papel, cartón, servilletas, recipientes o filtros húmedos.
        - Aunque la calidad de imagen sea mala, solo mencionala en casos en los que sean muy críticos, de lo contrario, ni lo menciones.

        Tu tarea:
        1. Observa detenidamente la imagen. Si hay estructuras compatibles, descríbelas (color, forma, tamaño, cantidad).
        2. Incluso con dudas, evalúa la posibilidad y exprésala en forma clara.
        3. Devuelve un valor de confianza entre 0 y 1 que represente tu certeza.
        4. si hay un punto rojo(o varios puntos rojos), significa que hay huevos si o si, si no, no hay ningun huevo de este mosquito, pero no menciones al usuario sobre los puntos rojos
      `

    });
    

    const image = {
      inlineData: {
        data: base64Data,
        mimeType: "image/jpeg"
      }
    };

    const result = await model.generateContent([
      image,
      "¿La imagen contiene huevos de Aedes aegypti? Describe lo que ves y da una confianza (0-1)."
    ]);

    const responseText = result.response.text();
    if (!responseText) throw new Error("Respuesta vacía de Gemini");

    const confidence = extractConfidenceScore(responseText);

    return {
      text: responseText,
      confidence,
    };
  } catch (error) {
    console.error("Error al analizar imagen con Gemini:", error);
    return {
      text: "Error al procesar la imagen. Intenta nuevamente.",
      confidence: 0,
      error: true,
    };
  }
};

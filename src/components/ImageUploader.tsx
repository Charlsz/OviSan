
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploaderProps {
  onImageUpload: (file: File, base64: string) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Por favor sube una imagen válida (JPG, PNG, etc.)",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "La imagen es demasiado grande. El tamaño máximo es 5MB.",
        variant: "destructive"
      });
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onImageUpload(file, result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            {previewUrl ? (
              <div className="relative w-full max-w-md">
                <img 
                  src={previewUrl} 
                  alt="Vista previa" 
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg border border-border"
                />
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <div className="w-16 h-16 border-4 border-t-dengue-blue border-blue-200 border-solid rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full max-w-md h-[300px] border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-6 text-center">
                <ImageIcon className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Sube una imagen</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Formatos: JPG, PNG, WEBP (máx. 5MB)
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
              disabled={isLoading}
            />
            <Button
              type="button"
              className="w-full bg-dengue-blue hover:bg-blue-700"
              onClick={() => document.getElementById('image-upload')?.click()}
              disabled={isLoading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {previewUrl ? "Cambiar imagen" : "Seleccionar imagen"}
            </Button>
            {previewUrl && (
              <p className="text-sm text-center text-muted-foreground">
                Para mejores resultados, la imagen debe estar bien enfocada y con buena iluminación
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploader;

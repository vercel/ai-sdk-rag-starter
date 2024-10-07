"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UploadIcon, FileIcon, XIcon, CheckCircleIcon, FileTextIcon, InfoIcon } from 'lucide-react';

export default function FileUploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const allowedFileTypes = ['.pdf'];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = selectedFiles.filter(isFileTypeAllowed);
    if (validFiles.length > 0) {
      setFiles(prevFiles => [...prevFiles, ...validFiles]);
      setUploadSuccess(false);
    } else {
      alert('Por favor, seleccione tipos de archivo válidos.');
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
    setUploadSuccess(false);
  };

  const isFileTypeAllowed = (file: File) => {
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    return allowedFileTypes.includes(extension);
  };

  const handleUpload = async () => {
    if (files.length === 0 && !url) return;

    setUploading(true);
    try {
      let uploadResults = [];

      if (files.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fileName', file.name);

          const response = await fetch('/api/files', {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const { message } = await response.json();
            uploadResults.push({ fileName: file.name, success: true, message });
            console.log(`Mensaje del servidor para ${file.name}:`, message);
          } else {
            uploadResults.push({ fileName: file.name, success: false });
            console.error(`Error al procesar ${file.name}`);
          }
        }
      }

      if (uploadResults.every(result => result.success)) {
        setUploadSuccess(true);
        console.log('¡Todos los archivos se procesaron con éxito!');
      } else {
        console.error('Algunos archivos no se pudieron procesar.');
      }
    } catch (error) {
      console.error('Error al procesar los archivos:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setUploadSuccess(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-2 bg-gray-100 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold p-4">Subir y agregar archivos</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200">
            <TabsTrigger value="file">Tu computadora</TabsTrigger>
            <TabsTrigger value="url" disabled>Enlace URL (WIP)</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="bg-white flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-white/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <UploadIcon className="w-10 h-10 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-muted-foreground px-4">
                    Tipos de archivo permitidos: .pdf
                  </p>
                </div>
                <Input 
                  id="dropzone-file" 
                  type="file" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept={allowedFileTypes.join(',')}
                />
              </label>
            </div>
            {files.length > 0 && (
              <div className="mt-6">
                {files.map((file, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {file.name.endsWith('.pdf') ? (
                        <FileTextIcon className="w-6 h-6 mr-3 text-muted-foreground" />
                      ) : (
                        <FileIcon className="w-6 h-6 mr-3 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(index)}>
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="url">
            <div className="flex items-center space-x-2">
              <InfoIcon className="w-6 h-6 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">La carga de URL está en progreso y aún no está disponible.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="p-6 flex flex-col gap-4">
        <Button 
          className="w-full" 
          onClick={handleUpload} 
          disabled={(files.length === 0 && !url) || uploading}
        >
          {uploading ? 'Procesando...' : uploadSuccess ? 'Subido con éxito' : 'Subir'}
        </Button>
        {uploadSuccess && (
          <Alert>
            <CheckCircleIcon className="h-4 w-4" />
            <AlertTitle>Éxito</AlertTitle>
            <AlertDescription>
              Tu(s) archivo(s) se han subido con éxito.
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}

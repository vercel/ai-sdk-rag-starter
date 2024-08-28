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
      alert('Please select valid file types.');
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
            console.log(`Message from server for ${file.name}:`, message);
          } else {
            uploadResults.push({ fileName: file.name, success: false });
            console.error(`Failed to process ${file.name}`);
          }
        }
      }

      if (uploadResults.every(result => result.success)) {
        setUploadSuccess(true);
        console.log('All files processed successfully!');
      } else {
        console.error('Some files failed to process.');
      }
    } catch (error) {
      console.error('Error processing files:', error);
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
    <Card className="w-full max-w-md mx-auto p-2">
      <CardHeader>
        <CardTitle className="text-2xl font-bold p-4">Upload and add Files</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Your computer</TabsTrigger>
            <TabsTrigger value="url" disabled>Link URL (WIP)</TabsTrigger>
          </TabsList>
          <TabsContent value="file">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                  <UploadIcon className="w-10 h-10 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground px-4">
                    Allowed file types: .pdf
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
              <p className="text-sm text-muted-foreground">URL upload is a work in progress and is not available yet.</p>
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
          {uploading ? 'Processing...' : uploadSuccess ? 'Uploaded Successfully' : 'Upload'}
        </Button>
        {uploadSuccess && (
          <Alert>
            <CheckCircleIcon className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your file(s) have been uploaded successfully.
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}


import { pdfToText } from 'pdf-ts';
import { createResource } from '@/lib/actions/resources';

import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import * as path from "path";

import { uploadFile } from '@/lib/actions/cloudinary_upload_file';

// const pdf2md = require("@opendocsg/pdf2md");

async function splitPdfConvert2MdCreateResource(
  filePath: string,
  outputDir: string,
  fileID: number
) {
  // Leer el archivo PDF
  const existingPdfBytes = fs.readFileSync(filePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const numPages = pdfDoc.getPageCount();

  // Crear los directorios de salida si no existen
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Iterar sobre cada página, guardarla como un archivo PDF separado y convertirla a Markdown
  for (let i = 0; i < numPages; i++) {
    const newPdfDoc = await PDFDocument.create();
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
    newPdfDoc.addPage(copiedPage);

    const pdfBytes = await newPdfDoc.save();
    const outputFilePath = path.join(outputDir, `page-${i + 1}.pdf`);
    fs.writeFileSync(outputFilePath, pdfBytes);

    // Convertir a Markdown
    const pdfBuffer = fs.readFileSync(outputFilePath);
    const pdfUint8Array = new Uint8Array(pdfBuffer);

    try {
      const text = await pdfToText(pdfUint8Array, {});
      console.log("Conversión exitosa.");
      
      // CreateResource with text
      const result = await createResource({ 
        content: text,
        pageNumber: i + 1,
        fileID: fileID,
      });
      console.log(result);

      console.log("Hecho.");
    } catch (err) {
      console.error(
        "Error durante la conversión a Markdown:",
        (err as Error).message
      );
    }
  }

  console.log(`PDF dividido y convertido en ${numPages} archivos.`);
  return numPages;
}


export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;
    const fileName = formData.get('fileName') as string | null;

    if (!file || !fileName) {
      return new Response(JSON.stringify({ message: 'Missing file or file name' }), { status: 400 });
    }

    let extractedText = '';

    if (fileName.endsWith('.pdf')) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // extractedText = await pdfToText(buffer);

      const fileUploadResult = await uploadFile(buffer, fileName);

      // Save the PDF file to /tmp
      const filePath = path.join('/tmp', fileName);
      fs.writeFileSync(filePath, buffer);

      // Split the PDF file into individual pages and convert them to Markdown
      const outputDirectory = path.join('/tmp', 'output-pages');
      await splitPdfConvert2MdCreateResource(filePath, outputDirectory, fileID);

      return new Response(JSON.stringify({ message: 'PDF successfully processed' }), { status: 200 });

    } 
    
    return new Response(JSON.stringify({ message: 'Unsupported file type' }), { status: 400 });
    
  } catch (error) {
    console.error('Error extracting text:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

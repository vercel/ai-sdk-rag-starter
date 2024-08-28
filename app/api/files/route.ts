import { pdfToText } from 'pdf-ts';
import { createResource } from '@/lib/actions/resources';

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
      extractedText = await pdfToText(buffer);
    } else {
      // Handle other file types if necessary
      extractedText = await file.text(); // Placeholder for non-PDF files
    }

    // Pass the extracted text to createResource function
    const result = await createResource({ content: extractedText });

    return new Response(JSON.stringify({ message: result }), { status: 200 });
  } catch (error) {
    console.error('Error extracting text:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}

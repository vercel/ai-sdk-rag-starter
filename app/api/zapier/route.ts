import { NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        // URL del Webhook de Zapier para consultar Google Calendar
        const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/19734308/249kyun/';

        // Enviar la consulta a Zapier
        const zapierResponse = await fetch(zapierWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const zapierResult = await zapierResponse.json();

        // Opcional: Integrar la respuesta de Zapier con un modelo de IA
        const result = await streamText({
            model: openai('gpt-4o'),
            messages: convertToCoreMessages(zapierResult),
          });

          return result.toDataStreamResponse();
          
    } catch (error) {
        console.error('Error en la comunicación con Zapier:', error);
        return NextResponse.json({ success: false, message: 'Error, por favor intenta nuevamente.' }, { status: 500 });
    }
}

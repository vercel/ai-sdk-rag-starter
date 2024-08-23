import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

export async function zapierTool(query: string) {
    try {
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

        // Integrar la respuesta de Zapier con el modelo de IA
        const result = await streamText({
            model: openai('gpt-4o'),
            messages: convertToCoreMessages(zapierResult),
        });

        return result.toDataStreamResponse();
        
    } catch (error) {
        console.error('Error en la comunicación con Zapier:', error);
        throw new Error('Error, por favor intenta nuevamente.');
    }
}
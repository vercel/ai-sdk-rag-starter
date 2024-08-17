import { createResource } from '@/lib/actions/resources';

export async function POST(req: Request) {

    const content = await req.text();
    const res = await createResource({ content });

    return new Response(res);
}

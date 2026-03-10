import { NextResponse } from 'next/server';

export async function GET(req) {
    // const { searchParams } = new URL(req.url);
    // const chatbotId = searchParams.get('chatbotId');

    return NextResponse.json({ data: [] });
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { chatbotId, type, title, content } = body;

        // const { data, error } = await supabase.from('training_data').insert({ chatbot_id: chatbotId, type, title, content });

        return NextResponse.json({ message: "Training data added", success: true });
    } catch (err) {
        return NextResponse.json({ error: "Failed to parse request" }, { status: 400 });
    }
}

export async function DELETE(req) {
    // const { searchParams } = new URL(req.url);
    // const id = searchParams.get('id');
    // await supabase.from('training_data').delete().eq('id', id);
    return NextResponse.json({ success: true });
}

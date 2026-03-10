import { NextResponse } from 'next/server';

export async function GET(req) {
    // const { searchParams } = new URL(req.url);
    // const chatbotId = searchParams.get('chatbotId');

    // Real implementation: get conversations and their messages
    // const { data } = await supabase.from('conversations').select('*, messages(*)').eq('chatbot_id', chatbotId);
    return NextResponse.json({ data: [] });
}

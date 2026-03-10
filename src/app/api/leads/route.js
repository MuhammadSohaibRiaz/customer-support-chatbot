import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req) {
    // const { searchParams } = new URL(req.url);
    // const chatbotId = searchParams.get('chatbotId');

    // Real implementation:
    // const { data, error } = await supabase.from('leads').select('*').eq('chatbot_id', chatbotId);
    return NextResponse.json({ message: "Leads fetched successfully", data: [] });
}

export async function POST(req) {
    const body = await req.json();
    const { name, email, company, chatbotId, message } = body;

    // Real implementation:
    // const { data, error } = await supabase.from('leads').insert({ 
    //   name, email, company, message, chatbot_id: chatbotId 
    // });

    if (!name || !email) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    return NextResponse.json({ message: "Lead captured successfully", success: true });
}

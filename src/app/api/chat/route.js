import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

// Require the API key to be set in environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy_key_for_build',
});

export async function POST(req) {
    try {
        const body = await req.json();
        const { messages, chatbotId } = body;

        // Simulate fetching chatbot identity/training data from Supabase
        // const { data: chatbot } = await supabase.from('chatbots').select('*').eq('id', chatbotId).single();
        // const { data: trainingData } = await supabase.from('training_data').select('*').eq('chatbot_id', chatbotId);

        // Format system prompt dynamically
        const systemPrompt = `You are a helpful customer support AI. Use the provided context to answer questions.
Context: 
- Pricing: Basic is $10/mo, Pro is $20/mo, Enterprise is $50/mo.
- Refund policy: 30-day money back guarantee.
- API Access: Available on Pro and Enterprise plans.
If you don't know the answer, politely ask the user for their email so a human agent can follow up.`;

        // Handle case where we don't really have an API key yet
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({
                message: {
                    role: 'assistant',
                    content: 'This is a mocked response because OPENAI_API_KEY is not set.'
                }
            });
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: false,
            messages: [
                { role: 'system', content: systemPrompt },
                ...messages
            ],
        });

        const aiMessage = response.choices[0].message;

        // Log the conversation message to Supabase
        // await supabase.from('messages').insert({ conversation_id: '...', role: 'assistant', content: aiMessage.content });

        return NextResponse.json({ message: aiMessage });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Internal server error while processing chat' },
            { status: 500 }
        );
    }
}

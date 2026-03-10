import { NextResponse } from 'next/server';

export async function GET(req) {
    // const { searchParams } = new URL(req.url);
    // const chatbotId = searchParams.get('chatbotId');

    // Real implementation: aggregate counts from postgres RPC or separate queries
    return NextResponse.json({
        kpis: {
            totalChats: 0,
            totalLeads: 0,
            responseRate: '100%',
            avgResponseTime: '0s'
        }
    });
}

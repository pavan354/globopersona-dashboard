import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const userMessage = body.message || "";
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let reply = "I received your message. I'm processing that for your dashboard!";
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi')) {
      reply = "Hello! I've analyzed your recent segments. Your 'SaaS Founders' audience is highly active.";
    } else if (msg.includes('campaign')) {
      reply = "Shall we draft a new campaign? You can click the 'New Campaign' button on the left.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ reply: "Sorry, I'm having trouble connecting right now." }, { status: 500 });
  }
}
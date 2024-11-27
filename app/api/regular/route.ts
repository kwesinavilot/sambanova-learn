import { NextResponse } from 'next/server';
import { RegularModeAgent } from '@/lib/agents/regular-agent';

export async function POST(request: Request) {
  const { message, name, topic, difficulty } = await request.json();
  const agent = new RegularModeAgent();
  const response = await agent.chat(message, { name, topic, difficulty });
  return NextResponse.json(response);
}

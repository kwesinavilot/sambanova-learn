import { NextResponse } from 'next/server';
import { ExplainerAgent } from '@/lib/agents/explainer-agent';

export async function POST(request: Request) {
  const { topic, difficulty } = await request.json();
  const agent = new ExplainerAgent();
  const explanation = await agent.generateExplanation({ topic, difficulty });
  return NextResponse.json(explanation);
}

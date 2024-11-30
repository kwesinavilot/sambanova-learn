import { NextResponse } from 'next/server';
import { RegularModeAgent } from '@/lib/agents/regular-agent';
import { AdventureModeAgent } from '@/lib/agents/adventure-agent';
import { StoryModeAgent } from '@/lib/agents/story-agent';

export const dynamic = 'force-dynamic';

type AgentType = {
  [key: string]: RegularModeAgent | AdventureModeAgent | StoryModeAgent;
};

const agents: AgentType = {
  regular: new RegularModeAgent(),
  adventure: new AdventureModeAgent(),
  story: new StoryModeAgent(),
};

export async function POST(request: Request) {
  try {
    const { mode, message, name, topic, difficulty } = await request.json();
    const agent = agents[mode];

    if (!agent) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
    }

    const result = await agent.chat(message, { name, topic, difficulty });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { RegularModeAgent } from '@/lib/agents/regular-agent';
import { AdventureModeAgent } from '@/lib/agents/adventure-agent';
import { StoryModeAgent } from '@/lib/agents/story-agent';

const agents = {
  regular: new RegularModeAgent(),
  adventure: new AdventureModeAgent(),
  story: new StoryModeAgent(),
};

export async function POST(request: Request) {
  try {
    const { mode, action, data } = await request.json();
    const agent = agents[mode as keyof typeof agents];

    if (!agent) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });
    }

    const result = await agent[action](data);
    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
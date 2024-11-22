import { BaseAgent } from './base-agent';

export class AdventureModeAgent extends BaseAgent {
  async generateChallenge(data: { level: number; theme: string }) {
    const chain = this.createChain(`
      Generate a level {level} math challenge with a {theme} theme.
      Include a story context, problem, and reward.
      Return as JSON with:
      {
        "context": "story context",
        "problem": "math problem",
        "options": ["possible answers"],
        "correctAnswer": "answer",
        "reward": "reward description"
      }
    `);

    return chain.invoke(data);
  }
}
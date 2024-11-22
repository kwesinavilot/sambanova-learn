import { BaseAgent } from './base-agent';

export class StoryModeAgent extends BaseAgent {
  async generateStoryProblem(data: { context: string; difficulty: string }) {
    const chain = this.createChain(`
      Create a math story problem based on this context: {context}
      Difficulty level: {difficulty}
      Return as JSON with:
      {
        "story": "story text",
        "question": "math question",
        "options": ["possible answers"],
        "correctAnswer": "answer",
        "nextContext": "potential next story direction"
      }
    `);

    return chain.invoke(data);
  }
}
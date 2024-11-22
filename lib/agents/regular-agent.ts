import { BaseAgent } from './base-agent';
import { z } from 'zod';

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  explanation: z.string(),
});

export class RegularModeAgent extends BaseAgent {
  async generateQuestion(data: { difficulty: string; topic: string }) {
    const chain = this.createChain(`
      Generate a {difficulty} math question about {topic}.
      Return it in JSON format with these fields:
      {
        "question": "the question text",
        "options": ["array of 4 possible answers"],
        "correctAnswer": "the correct answer",
        "explanation": "detailed explanation of the solution"
      }
    `);

    const response = await chain.invoke(data);
    const parsed = QuestionSchema.parse(JSON.parse(response));
    return parsed;
  }

  async provideHint({ question }: { question: string }) {
    const chain = this.createChain(`
      Provide a helpful hint for solving this math question without giving away the answer: {question}
    `);

    return chain.invoke({ question });
  }
}
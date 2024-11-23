import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';

export class BaseAgent {
  protected model: ChatOpenAI;
  protected outputParser: StringOutputParser;

  constructor() {
    this.model = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_SAMBANOVA_API_KEY,
      configuration: {
        baseURL: 'https://api.sambanova.ai/v1/',
      },
      modelName: 'Meta-Llama-3.1-70B-Instruct',
    });
    this.outputParser = new StringOutputParser();
  }

  protected createChain(template: string) {
    const prompt = PromptTemplate.fromTemplate(template);
    return RunnableSequence.from([prompt, this.model, this.outputParser]);
  }
}
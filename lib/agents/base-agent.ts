import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatMessageHistory } from 'langchain/stores/message/in_memory';
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';

export class BaseAgent {
  protected model: ChatOpenAI;
  protected outputParser: StringOutputParser;
  protected messageHistory: ChatMessageHistory;
  protected maxHistoryLength: number = 6; // Configurable message history length

  constructor() {
    this.model = new ChatOpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_SAMBANOVA_API_KEY,
      configuration: {
        baseURL: 'https://api.sambanova.ai/v1/',
      },
      modelName: 'Meta-Llama-3.1-70B-Instruct',
    });
    this.outputParser = new StringOutputParser();
    this.messageHistory = new ChatMessageHistory();
  }

  protected createChain(template: string) {
    // const prompt = PromptTemplate.fromTemplate(template);
    // return RunnableSequence.from([prompt, this.model, this.outputParser]);
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", template],

      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"]
    ]);

    // const chain = prompt.pipe(this.model).pipe(this.outputParser);

    // return new RunnableWithMessageHistory({
    //   runnable: chain,
    //   getMessageHistory: () => this.messageHistory,
    //   inputMessagesKey: "input",
    //   historyMessagesKey: "chat_history",
    // });

    const chain = prompt.pipe(this.model).pipe(this.outputParser);

    const chainWithHistory = new RunnableWithMessageHistory({
      runnable: chain,
      getMessageHistory: () => this.messageHistory,
      inputMessagesKey: "input",
      historyMessagesKey: "chat_history",
    });

    // Return a wrapped version that automatically includes sessionId
    return {
      invoke: async (input: any) => {
        const sessionId = `session-${Date.now()}`; // Generate unique session ID
        return chainWithHistory.invoke(input, {
          configurable: { sessionId }
        });
      }
    };
  }

  protected async trimHistory() {
    const messages = await this.messageHistory.getMessages();
    if (messages.length > this.maxHistoryLength) {
      await this.messageHistory.clear();
      const recentMessages = messages.slice(-this.maxHistoryLength);
      for (const message of recentMessages) {
        await this.messageHistory.addMessage(message);
      }
    }
  }

  protected async addToHistory(content: string, isAI: boolean = false) {
    const message = isAI ? new AIMessage(content) : new HumanMessage(content);
    await this.messageHistory.addMessage(message);
    await this.trimHistory();
  }

  protected async clearHistory() {
    await this.messageHistory.clear();
  }

  protected createSimpleChain(template: string) {
    const prompt = PromptTemplate.fromTemplate(template);
    return RunnableSequence.from([prompt, this.model, this.outputParser]);
  }
}
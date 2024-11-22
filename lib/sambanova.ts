import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.sambanova.ai/v1/',
  apiKey: process.env.NEXT_PUBLIC_SAMBANOVA_API_KEY,
});

export const MODEL_IDS = {
  LLAMA_405B: 'Meta-Llama-3.1-405B-Instruct',
  LLAMA_70B: 'Meta-Llama-3.1-70B-Instruct',
  LLAMA_8B: 'Meta-Llama-3.1-8B-Instruct',
} as const;

export async function generateResponse(
  prompt: string,
  modelId: keyof typeof MODEL_IDS = 'LLAMA_70B'
) {
  try {
    const completion = await client.chat.completions.create({
      model: MODEL_IDS[modelId],
      messages: [{ role: 'user', content: prompt }],
      stream: true,
    });

    let response = '';
    for await (const chunk of completion) {
      response += chunk.choices[0].delta.content || '';
    }
    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}
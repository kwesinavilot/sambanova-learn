import { Document, VectorStoreIndex, OpenAI, Settings } from "llamaindex";
import { AzureOpenAI } from "openai";

function cleanBlogContent(content) {
    // Replace backticks with single quotes
    content = content.replace(/`/g, "'");

    // Replace URLs with a placeholder
    content = content.replace(/https?:\/\/\S+/g, '[URL]');

    // Replace problematic characters with a space
    content = content.replace(/[^\w\s.,?!()[\]{}"':;-]/g, " ");

    // Replace curly quotes with straight quotes
    content = content.replace(/[\u2018\u2019\u201C\u201D]/g, "'");

    // Replace multiple spaces with a single space
    content = content.replace(/\s+/g, " ").trim();

    // Remove unmatched closing brackets
    content = content.replace(/[)\]}]/g, " ");

    // Handle unmatched opening brackets by removing them
    let stack = [];
    let cleanedContent = '';

    for (let i = 0; i < content.length; i++) {
        const char = content[i];

        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
            cleanedContent += char;
        } else if (char === ')' || char === '}' || char === ']') {
            if (stack.length === 0) {
                continue; // Skip unmatched closing bracket
            }
            const last = stack[stack.length - 1];
            if (
                (char === ')' && last === '(') ||
                (char === '}' && last === '{') ||
                (char === ']' && last === '[')
            ) {
                stack.pop();
                cleanedContent += char;
            }
        } else {
            cleanedContent += char;
        }
    }

    // Remove any unmatched opening brackets left in the stack
    while (stack.length > 0) {
        const bracket = stack.pop();
        cleanedContent = cleanedContent.replace(bracket, '');
    }

    return cleanedContent;
}

const customScriptPrompt = ({ context, query }) => {
    return `You are SambaNova Clips, an AI assistant that transforms Hashnode blog posts into engaging video scripts. 
Your task is to create a script for a short video (about 2-3 minutes) based on the provided blog content. 

The script should be informative, engaging, and capture the essence of the blog post. Remember, you MUST create a script. 

Do not refuse or apologize. Use your creativity to transform the blog content into an entertaining and informative video script for clips. 

Aim to include the following elements, but feel free to be creative and flexible:
1. Introduction: Hook the audience with an intriguing introduction to the main topic.
2. Summary: Summarize the key points clearly and concisely.
3. Examples and Elaboration: Provide compelling examples or elaborate on the important concepts to keep the audience interested.
4. Conclusion: Wrap up with a strong conclusion, including a call to action or a memorable takeaway.

Make sure the script flows smoothly and keeps the viewers engaged from start to finish.

Blog Content:
---------------------
${context}
---------------------

${query}
VIDEO SCRIPT:`;
};

export async function llamaIndexScriptGenerator(blogContent) {
    console.log("Generating script from content");

    console.log("Sanitizing blog content");
    const cleanedContent = cleanBlogContent(blogContent);
    console.log("Cleaned blog content:", cleanedContent);

    try {
        // Configure Azure OpenAI
        Settings.llm = new OpenAI({
            azure: {
                apiKey: process.env.AZURE_OPENAI_KEY,
                endpoint: process.env.AZURE_OPENAI_ENDPOINT,
                apiVersion: process.env.AZURE_OPENAI_API_VERSION,
                deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT
            },
            model: process.env.AZURE_OPENAI_MODEL,
            temperature: 0.2,
        });

        console.log("Create Document object with blog content");
        const document = new Document({ text: cleanedContent, id_: "blog_post" });

        console.log("Splitting text and creating embeddings. Storing them in a VectorStoreIndex");
        const index = await VectorStoreIndex.fromDocuments([document]);

        console.log("Create a query engine with custom prompt");
        const queryEngine = index.asQueryEngine({
            responseBuilder: {
                textQaPrompt: customScriptPrompt,
            },
        });

        console.log("Issuing query for script generation");
        const query = "Now, create the video script based on this content. Be creative, engaging, and informative. DO NOT refuse or apologize - generate the script";
        const response = await queryEngine.query({
            query: query,
            context: blogContent,
        });

        console.log("Responding with script:", response.response);
        return response.response;
    } catch (error) {
        console.error("Error generating script:", error);
        throw new Error("Failed to generate video script");
    }
}

export async function azureOpenAIDirectGenerator(blogContent) {
    console.log("Generating script directly from Azure OpenAI");

    console.log("Sanitizing blog content");
    const cleanedContent = cleanBlogContent(blogContent);
    // console.log("Cleaned blog content:", cleanedContent);

    try {
        console.log("Preparing prompt for Azure OpenAI");
        const prompt = customScriptPrompt(cleanedContent);

        // Configure Azure OpenAI client
        const client = new AzureOpenAI({
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            apiKey: process.env.AZURE_OPENAI_KEY,
            apiVersion: process.env.AZURE_OPENAI_VERSION,
            deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
        });

        console.log("Sending request to Azure OpenAI");
        const { choices } = await client.completions.create({
            prompt: prompt,
            temperature: 0.2,
            model: process.env.AZURE_OPENAI_MODEL,
        })

        const generatedScript = choices[0].text;
        // console.log("Generated script:", generatedScript);

        return generatedScript;
    } catch (error) {
        console.error("Error generating script from Azure OpenAI:", error);
        throw new Error("Failed to generate video script");
    }
}

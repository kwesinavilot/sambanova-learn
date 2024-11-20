import { NextResponse } from "next/server";
import { generateScriptFromContent, azureOpenAIDirectGenerator } from "../../../engine/ScriptGenerator";

export async function POST(request) {
    try {
        const { blogContent } = await request.json();

        if (!blogContent) {
            return NextResponse.json({ error: 'The content of a Hashnode blog is required' }, { status: 400 });
        }

        // const script = await generateScriptFromContent(blogContent);
        const script = await azureOpenAIDirectGenerator(blogContent);
        
        return NextResponse.json({
            message: 'Script generated successfully',
            script: script
        }, { status: 200 });
    } catch (error) {
        console.error('Error generating script:', error);
        return NextResponse.json({ error: 'Failed to generate script from content: ', details: error.message }, { status: 500 });
    }
}
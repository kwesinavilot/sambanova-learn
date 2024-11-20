import { NextResponse } from "next/server";
import PostExtractor from "../../../engine/PostExtractor";

export async function POST(request) {
    try {        
        const { blogLink } = await request.json();

        if (!blogLink) {
            return NextResponse.json({ error: 'A Hashnode blog link is required' }, { status: 400 });
        }

        // Extract the host and slug from the blog link
        const url = new URL(blogLink);
        const host = url.hostname;
        const slug = url.pathname.split('/').pop();
        
        const extractor = new PostExtractor();

        // Fetch the blog post
        const postData = await extractor.getPostBySlug(host, slug);
        // console.log('Received post data: ', postData);

        if (!postData || !postData.publication || !postData.publication.post) {
            return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
        }
        
        const post = postData.publication.post;
        
        // Prepare the content for AI processing
        const processedContent = {
            title: post.title,
            brief: post.brief,
            content: post.content.markdown,
            author: post.author.name,
            tags: post.tags.map(tag => tag.name),
            coverImage: post.coverImage.url,
            readTime: post.readTimeInMinutes,
            views: post.views,
            reactionCount: post.reactionCount,
            responseCount: post.responseCount,
            replyCount: post.replyCount,
            publication: post.publication.displayTitle,
            coAuthors: post.coAuthors.map(coAuthor => coAuthor.name),
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt
        };
        
        return NextResponse.json({
            message: 'Content extracted successfully',
            content: processedContent
        }, { status: 200 });
    } catch (error) {
        console.error('Error processing blog content:', error);
        return NextResponse.json({ error: 'Failed to process blog content', details: error.message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Hello, SambaNova Clips!' }, { status: 200 });
}
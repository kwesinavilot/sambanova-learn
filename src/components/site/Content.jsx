"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlayButton,
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
} from 'media-chrome/react';
import { AlarmClock, MessageSquareMore, MessageSquareReply, Eye, Heart, UserPen, Users, ChevronsUpDown, Plus, X } from 'lucide-react';

export default function Generator() {
    const [blogLink, setBlogLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [blogDetails, setBlogDetails] = useState(null);
    const [script, setScript] = useState(null);
    const [scriptLoading, setScriptLoading] = useState(false);

    useEffect(() => {
        if (blogDetails) {
            generateScript(blogDetails.content);
        }
    }, [blogDetails]);

    const handleCreateVideo = async () => {
        if (!blogLink) {
            setError("You entered nothing. Are you sure you want to generate the video?");
            return;
        }
        setError("");
        setLoading(true);
        setBlogDetails(null);
        setScript(null);

        try {
            const response = await fetch("/api/hashnode-bridge/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ blogLink: blogLink })
            });

            if (!response.ok) {
                throw new Error(`Something went wrong: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Blog post data:", data);

            setBlogDetails(data.content);
        } catch (error) {
            console.error("Error creating video:", error);
            setError("Failed to process blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const generateScript = async (blogContent) => {
        setScriptLoading(true);
        try {
            const response = await fetch('/api/llm-bridge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ blogContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate script');
            }

            const data = await response.json();
            setScript(data.script);
        } catch (error) {
            console.error('Error generating script:', error);
            setError('Failed to generate script. Please try again.');
        } finally {
            setScriptLoading(false);
        }
    };

    const getTagColor = (index) => {
        const colors = [
            "bg-blue-100 text-blue-800",
            "bg-green-100 text-green-800",
            "bg-yellow-100 text-yellow-800",
            "bg-purple-100 text-purple-800",
            "bg-pink-100 text-pink-800",
            "bg-indigo-100 text-indigo-800",
            "bg-red-100 text-red-800",
            "bg-teal-100 text-teal-800"
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="w-full bg-gray-100 px-6 py-16">
            <section className="w-[700px] mx-auto mb-12 rounded-md">
                <h3 className="text-center text-md font-bold mb-2 text-slate-500">
                    Copy and paste your Hashnode blog post URL here then click "Create Video" button
                </h3>

                <div className="flex w-full items-center space-x-4">
                    <Input
                        value={blogLink}
                        onChange={(e) => setBlogLink(e.target.value)}
                        placeholder="https://kwesinavilot.hashnode.dev/my-insightful-post"
                        className="flex h-12 w-full rounded-md border border-input bg-background text-black px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />

                    <Button
                        onClick={handleCreateVideo}
                        disabled={loading}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-primary-foreground hover:bg-blue-600/90 h-12 px-4 py-2"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                            </>
                        ) : (
                            "Create Video"
                        )}
                    </Button>
                </div>

                {error && (
                    <p className="text-red-500 text-center mt-2">{error}</p>
                )}
            </section>

            <section className="grid grid-cols-2 gap-8 text-black">
                <div className="rounded-xl border bg-white shadow overflow-hidden">
                    <div className="space-y-1.5 p-6">
                        <h3 className="font-bold tracking-tight items-center text-lg">Blog Post Details</h3>
                        <p className="text-sm font-medium text-gray-500">Important information about the blog post.</p>
                    </div>

                    <div className="px-6 pb-6 text-sm">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        ) : blogDetails ? (
                            <>
                                <div className="w-full mb-6">
                                    <Image
                                        src={blogDetails.coverImage}
                                        width={350}
                                        height={350}
                                        alt="Cover Image"
                                        className="rounded-md object-cover"
                                    />
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <p className="text-sm font-semibold">Post Title</p>
                                    <h3 className="font-medium text-gray-500">
                                        {blogDetails.title}
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <div className="flex items-center gap-1">
                                        <UserPen className="h-5 w-5 text-sm font-semibold" />
                                        <p className="text-sm font-semibold">Author</p>
                                    </div>

                                    <h3 className="font-medium text-gray-500">
                                        {blogDetails.author}
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Users className="h-5 w-5 text-sm font-semibold" />
                                        <p className="text-sm font-semibold">Co-Author(s)</p>
                                    </div>

                                    <h3 className="font-medium text-gray-500">
                                        {
                                            blogDetails.coAuthors.map(
                                                (coAuthor) => coAuthor
                                            ).join(", ")
                                        }
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <div className="flex items-center gap-1">
                                        <AlarmClock className="h-5 w-5 text-sm font-semibold" />
                                        <p className="text-sm font-semibold">Reading Time</p>
                                    </div>

                                    <h3 className="font-medium text-gray-500">
                                        {blogDetails.readTime} minutes
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-5 w-5 text-sm font-semibold" />
                                        <p className="text-sm font-semibold">Views</p>
                                    </div>

                                    <h3 className="font-medium text-gray-500">
                                        {blogDetails.views} views
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Heart className="h-5 w-5 text-sm font-semibold" />
                                        <p className="text-sm font-semibold">Reactions</p>
                                    </div>

                                    <h3 className="font-medium text-gray-500">
                                        {blogDetails.reactionCount} hearts
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <div className="flex items-center gap-1">
                                        <MessageSquareMore className="h-5 w-5 text-sm font-semibold" />
                                        <p className="text-sm font-semibold">Comments</p>
                                    </div>

                                    <h3 className="font-medium text-gray-500">
                                        {blogDetails.responseCount} comments
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1 mb-6">
                                    <div className="flex items-center gap-1">
                                        <MessageSquareReply className="h-5 w-5 text-sm font-semibold" />
                                        <p className="text-sm font-semibold">Replies</p>
                                    </div>

                                    <h3 className="font-medium text-gray-500">
                                        {blogDetails.replyCount} replies
                                    </h3>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-2 mb-6">
                                    <p className="text-sm font-semibold">Tags</p>
                                    <div className="flex flex-wrap gap-2">
                                        {blogDetails.tags.map((tag, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className={`${getTagColor(index)} hover:opacity-80`}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid flex-1 auto-rows-min gap-1">
                                    <p className="text-sm font-semibold">Post Preview</p>
                                    <h4 className="font-medium text-gray-500">
                                        {blogDetails.content.substring(0, 500)}...
                                    </h4>
                                </div>

                                <div className="px-0 py-4 items-center border-t-2 mt-4 flex text-sm font-semibold text-gray-500 justify-between">
                                    <div>Published: {new Date(blogDetails.publishedAt).toLocaleDateString('en-GB')}</div>

                                    <div>Updated: {new Date(blogDetails.updatedAt).toLocaleDateString('en-GB')}</div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center font-semibold">No blog content available. Enter a blog link and click "Create Video" to fetch content.</p>
                        )}
                    </div>
                </div>

                <div className="w-full space-y-8">
                    <div className="p-6 rounded-xl border bg-white shadow overflow-hidden">
                        <div className="space-y-1.5 bg-muted/50">
                            <h3 className="font-bold tracking-tight items-center text-lg">Video Clip</h3>
                            <p className="text-sm font-medium text-gray-500">This is the video clip created from the blog content.</p>
                        </div>

                        <div className="text-sm">
                            {!blogDetails ? (
                                <p className="text-center font-semibold">Waiting for blog content...</p>
                            ) : videoLoading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            ) : video ? (
                                <div>{video}</div>
                            ) : (
                                <p className="text-center font-semibold">No blog content available. Enter a blog link and click "Create Video" to fetch content.</p>
                            )}
                        </div>
                    </div>

                    <div className="p-6 rounded-xl border bg-white shadow overflow-hidden">
                        <div className="space-y-1.5 bg-muted/50">
                            <h3 className="font-bold tracking-tight items-center text-lg">Audio</h3>
                            <p className="text-sm font-medium text-gray-500">This is an Eleven Labs voice over audio created for the video clip.</p>
                        </div>

                        <div className="text-sm">
                            {!blogDetails ? (
                                <p className="text-center font-semibold">Waiting for video script...</p>
                            ) : audioLoading ? (
                                <div className="animate-pulse space-y-4">
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                </div>
                            ) : audio ? (
                                <div>
                                    <MediaController>
                                        <video
                                            slot="media"
                                            src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
                                            preload="auto"
                                            muted
                                            crossOrigin=""
                                        />
                                        <MediaControlBar>
                                            <MediaPlayButton></MediaPlayButton>
                                            <MediaSeekBackwardButton></MediaSeekBackwardButton>
                                            <MediaSeekForwardButton></MediaSeekForwardButton>
                                            <MediaTimeRange></MediaTimeRange>
                                            <MediaTimeDisplay showDuration></MediaTimeDisplay>
                                            <MediaMuteButton></MediaMuteButton>
                                            <MediaVolumeRange></MediaVolumeRange>
                                        </MediaControlBar>
                                    </MediaController>
                                </div>
                            ) : (
                                <p className="text-center font-semibold">No blog content available. Enter a blog link and click "Create Video" to fetch content.</p>
                            )}
                        </div>
                    </div>

                    <Collapsible className="p-6 rounded-xl border bg-white shadow overflow-hidden">
                        <div className="flex items-center justify-between space-x-4 w-full">
                            <div className="space-y-1.5 bg-muted/50">
                                <h3 className="font-bold tracking-tight items-center text-lg">Video Script</h3>
                                <p className="text-sm font-medium text-gray-500">This is a GPT-4 generated script based on the blog content.</p>
                            </div>

                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                    <ChevronsUpDown className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>

                        <CollapsibleContent>
                            <ScrollArea className="h-[200px] w-full p-4">
                                {!blogDetails ? (
                                    <p className="text-center font-semibold mx-auto p-auto">Waiting for blog content...</p>
                                ) : scriptLoading ? (
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded"></div>
                                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                    </div>
                                ) : script ? (
                                    <div className="whitespace-pre-wrap">{script}</div>
                                ) : (
                                    <p className="text-center font-semibold">Preparing to generate script...</p>
                                )}
                            </ScrollArea>
                        </CollapsibleContent>
                    </Collapsible>
                    {/* </div> */}
                </div>
            </section>
        </div>
    );
}
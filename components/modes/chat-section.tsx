'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import MarkdownView from "@/components/modes/markdown-view";

interface ChatSectionProps {
    mode: string;
    name: string;
    topic: string;
    difficulty: string;
}

interface Message {
    id: string;
    content: string;
    sender: 'ai' | 'user';
}

const LoadingMessage = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-start"
    >
        <Card className="max-w-[80%] p-4 bg-primary/10 animate-pulse rounded">
            <div className="h-6 w-80 bg-primary/20" />
        </Card>
    </motion.div>
);

export function ChatSection({ mode, name, topic, difficulty }: ChatSectionProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Initial message
    useEffect(() => {
        const getInitialMessage = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mode,
                        message: "Welcome the user, introduce yourself and are you ready?",
                        name,
                        topic,
                        difficulty
                    }),
                });

                const data = await response.json();

                setMessages([{
                    id: Date.now().toString(),
                    content: data,
                    sender: 'ai'
                }]);
            } catch (error) {
                console.error('Initial message error:', error);
            }
            setIsLoading(false);
        };

        getInitialMessage();
    }, [name, topic, difficulty]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mode,
                    message: input,
                    name,
                    topic,
                    difficulty
                }),
            });

            const data = await response.json();

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data,
                sender: 'ai'
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Chat error:', error);
        }
        setIsLoading(false);
    };

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    };

    // Scroll when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="col-span-7 h-[calc(105vh-12rem)] flex flex-col">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="space-y-4 px-4 pt-0 pb-8">
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
                        >
                            <Card
                                className={`max-w-[80%] p-4 ${message.sender === 'ai'
                                    ? 'bg-primary/10'
                                    : 'bg-primary text-primary-foreground'
                                    }`}
                            >
                                {message.sender === 'ai' ? (
                                    <MarkdownView content={message.content} />
                                ) : (
                                    message.content
                                )}
                            </Card>
                        </motion.div>
                    ))}
                    {isLoading && <LoadingMessage />}
                </div>
            </ScrollArea>

            <div className="border-t bg-background p-4">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="text-md p-4 h-12"
                    />
                    <Button
                        onClick={handleSend}
                        size="icon"
                        disabled={!input || isLoading}
                        className='h-12 w-12 items-center justify-center'
                    >
                        <Send className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
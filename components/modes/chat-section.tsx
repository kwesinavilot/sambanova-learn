'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface ChatSectionProps {
    name: string;
    topic: string;
    difficulty: string;
}

interface Message {
    id: string;
    content: string;
    sender: 'ai' | 'user';
}

export function ChatSection({ name, topic, difficulty }: ChatSectionProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const response = await fetch('/api/regular', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
    };

    return (
        <div className="col-span-4 h-[calc(105vh-12rem)] flex flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
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
                                {message.content}
                            </Card>
                        </motion.div>
                    ))}
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
                        disabled={!input}
                        className='h-12 w-12 items-center justify-center'
                    >
                        <Send className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}


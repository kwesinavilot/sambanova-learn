'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface Message {
    id: string;
    content: string;
    sender: 'ai' | 'user';
}

export default function RegularMode() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hi! Let's practice some math. Ready for your first question?",
            sender: 'ai'
        }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            content: input,
            sender: 'user'
        }]);
        setInput('');
    };

    return (
        <div className="h-[calc(105vh-12rem)] flex flex-col">
            {/* Messages Area */}
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

            {/* Input Area */}
            <div className="border-t bg-background p-4">
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your answer..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        className="text-md p-4 h-12"
                    />

                    <Button onClick={handleSend} size="icon" disabled={!input} className='h-12 w-12 items-center justify-center'>
                        <Send className="h-6 w-6 items-center justify-center" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
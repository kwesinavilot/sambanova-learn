'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useUserStore } from '@/lib/stores/user-store';
import { Logo } from '@/components/logo';

export default function Onboarding() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const [step, setStep] = useState(1);
    const setUserData = useUserStore((state) => state.setUserData);
    const [formData, setFormData] = useState({
        name: '',
        topic: '',
        difficulty: '',
    });

    const validateInput = (value: string, step: number) => {
        switch (step) {
            case 1:
                return value.trim().length >= 2;
            case 2:
                return value.trim().length >= 3;
            case 3:
                return ['easy', 'medium', 'difficult'].includes(value);
            default:
                return false;
        }
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // update the user's data in the store
            setUserData(formData);

            // redirect to the mode page
            router.push(`/mode/${mode}`);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const screens = {
        1: {
            title: "Hello there!",
            subtext: "Before we start, let's get to know you.",
            question: "What's your name?",
            input: (
                <Input
                    className="w-[400px] h-12 text-center text-lg"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    autoFocus
                    minLength={2}
                    required
                />
            ),
        },
        2: {
            title: `Nice to meet you, ${formData.name}!`,
            subtext: "Now, let's pick a topic to practice.",
            question: "What would you like to learn today?",
            input: (
                <Input
                    className="w-[400px] h-12 text-center text-lg"
                    placeholder="e.g. Addition, Multiplication"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    autoFocus
                    required
                />
            ),
        },
        3: {
            title: "Great choice!",
            subtext: "Before we start, let's get to know you.",
            question: "Let's pick a difficulty level:",
            input: (
                <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                    <SelectTrigger className="w-[400px] h-12 text-lg">
                        <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="difficult">Difficult</SelectItem>
                    </SelectContent>
                </Select>
            ),
        },
    };

    return (
        <main className="bg-background flex flex-col items-center">
            <Logo className="w-full p-4 justify-center items-center mt-10" />

            <div className="flex flex-col items-center justify-center bg-background mt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center space-y-12 max-w-[600px] w-full"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text center space-y-2 justify-center"
                        >
                            <motion.h2
                                className="text-2xl font-bold text-primary"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            >
                                {screens[step as keyof typeof screens].title}
                            </motion.h2>

                            <motion.p
                                className="text-lg text-muted-foreground"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            >
                                {screens[step as keyof typeof screens].subtext}
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text center space-y-4 justify-center"
                        >
                            <motion.h2
                                className="text-3xl font-bold text-primary"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                            >
                                {screens[step as keyof typeof screens].question}
                            </motion.h2>

                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className="flex justify-center"
                            >
                                {screens[step as keyof typeof screens].input}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex justify-center gap-4"
                            >
                                {step > 1 && (
                                    <Button
                                        size="lg"
                                        onClick={handleBack}
                                        variant="outline"
                                        className="w-[190px] h-12 text-lg"
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    size="lg"
                                    onClick={handleNext}
                                    disabled={!validateInput(formData[Object.keys(formData)[step - 1] as keyof typeof formData], step)}
                                    className="w-[190px] h-12 text-lg"
                                >
                                    {step === 3 ? "Let's Start!" : "Next"}
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}
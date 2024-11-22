"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { LightbulbIcon, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export function QuizInterface() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState<string>('');
  const { toast } = useToast();

  async function fetchQuestion() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/math', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'regular',
          action: 'generateQuestion',
          data: {
            difficulty: 'medium',
            topic: 'basic-arithmetic',
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch question');
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetHint() {
    if (!question) return;
    try {
      const response = await fetch('/api/math', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'regular',
          action: 'provideHint',
          data: { question: question.question },
        }),
      });

      if (!response.ok) throw new Error('Failed to get hint');
      const hintText = await response.json();
      setHint(hintText);
      setShowHint(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get hint. Please try again.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (!question || isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="text-xl font-semibold">{question.question}</div>

        <div className="grid gap-3">
          {question.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === option ? "secondary" : "outline"}
              className="w-full justify-start text-left h-auto py-3"
              onClick={() => setSelectedAnswer(option)}
            >
              {option}
              {selectedAnswer === option && selectedAnswer === question.correctAnswer && (
                <CheckCircle2 className="ml-auto h-5 w-5 text-green-500" />
              )}
              {selectedAnswer === option && selectedAnswer !== question.correctAnswer && (
                <XCircle className="ml-auto h-5 w-5 text-red-500" />
              )}
            </Button>
          ))}
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleGetHint}
            disabled={showHint}
          >
            <LightbulbIcon className="mr-2 h-4 w-4" />
            Get Hint
          </Button>
          <Button
            onClick={() => {
              setSelectedAnswer(null);
              setShowHint(false);
              fetchQuestion();
            }}
            disabled={isLoading}
          >
            Next Question
          </Button>
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-muted p-4 rounded-lg"
            >
              <h4 className="font-semibold mb-2">Hint:</h4>
              <p>{hint}</p>
            </motion.div>
          )}

          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 rounded-lg ${
                selectedAnswer === question.correctAnswer
                  ? "bg-green-100 dark:bg-green-900/20"
                  : "bg-red-100 dark:bg-red-900/20"
              }`}
            >
              <h4 className="font-semibold mb-2">Explanation:</h4>
              <p>{question.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
}
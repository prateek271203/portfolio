'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, LoaderCircle, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { askPortfolioAssistant, transcribeAudio } from '@/ai/actions';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  const playAudio = (audioDataUri: string | null) => {
    if (!isMuted && audioDataUri) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(audioDataUri);
      audioRef.current = audio;
      audio.play().catch(e => console.error("Audio playback failed:", e));
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      const initialQuestion = 'Introduce yourself in a friendly way.';
      askPortfolioAssistant(initialQuestion).then(
        (response) => {
          setMessages([
            {
              role: 'assistant',
              content: response.answer,
            },
          ]);
          setIsLoading(false);
          playAudio(response.audioDataUri);
        }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div');
      if (scrollElement) {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);

  const processAndSubmit = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const assistantResponse = await askPortfolioAssistant(text);
      const assistantMessage: Message = {
        role: 'assistant',
        content: assistantResponse.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      playAudio(assistantResponse.audioDataUri);

    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading || isRecording) return;
    await processAndSubmit(input);
  };
  
  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return; // onstop will handle the rest
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstart = () => {
        setIsRecording(true);
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsLoading(true);

        if (audioChunks.length === 0) {
            console.warn("No audio chunks recorded.");
            setIsLoading(false);
            return;
        }

        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64data = reader.result as string;
          try {
            const transcribedText = await transcribeAudio(base64data);
            if (transcribedText) {
              await processAndSubmit(transcribedText);
            }
          } catch (e) {
            console.error("Transcription failed:", e);
          } finally {
             setIsLoading(false);
          }
        };
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-14 h-14 shadow-lg neumorphic-shadow"
          onClick={toggleOpen}
        >
          {isOpen ? <X size={24} /> : <Bot size={24} />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm"
          >
            <div className="flex flex-col h-[60vh] bg-card/80 backdrop-blur-lg rounded-lg border border-border shadow-2xl neumorphic-shadow">
              <header className="p-4 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg text-primary">
                  Prateek's AI Assistant
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)}>
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
              </header>
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            <Bot size={20} />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            <User size={20} />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex gap-3 justify-start">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback>
                            <Bot size={20} />
                          </AvatarFallback>
                        </Avatar>
                        <div className="max-w-xs p-3 rounded-lg bg-muted flex items-center">
                            <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
                        </div>
                     </div>
                  )}
                </div>
              </ScrollArea>
              <footer className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isRecording ? "Listening..." : "Ask about my skills..."}
                    className="flex-1"
                    disabled={isLoading || isRecording}
                  />
                  <Button type="button" size="icon" onClick={handleMicClick} disabled={isLoading} variant={isRecording ? "destructive" : "outline"}>
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                  </Button>
                  <Button type="submit" size="icon" disabled={isLoading || isRecording || !input.trim()}>
                    <Send size={20} />
                  </Button>
                </form>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

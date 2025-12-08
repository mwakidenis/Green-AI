import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Mic, Bot, User, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const AIQuerySection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your GreenAI assistant. I can help you optimize waste collection, predict energy output, and find the nearest waste-to-energy facilities. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response with more contextual responses
    setTimeout(() => {
      let responseContent = '';
      const query = inputValue.toLowerCase();
      
      if (query.includes('collection') || query.includes('pickup')) {
        responseContent = `For waste collection optimization: The nearest collection point is at Green Valley Community Center, 0.8 km away. Next pickup is scheduled for tomorrow at 9 AM. Based on current waste patterns, I recommend scheduling an additional pickup this week to maximize efficiency.`;
      } else if (query.includes('energy') || query.includes('power')) {
        responseContent = `Energy prediction analysis: The local waste-to-energy facility can generate approximately 250 kWh from your area's daily waste output of 75 tons. Current efficiency is 89%, with potential to increase to 94% through better waste sorting.`;
      } else if (query.includes('route') || query.includes('optimize')) {
        responseContent = `Route optimization complete: I've calculated an improved collection route that reduces travel time by 23% and fuel consumption by 18%. The new route covers 12 collection points with an estimated completion time of 4.2 hours.`;
      } else if (query.includes('impact') || query.includes('environment')) {
        responseContent = `Environmental impact assessment: Your area's waste-to-energy conversion prevents 12.5 tons of CO2 emissions monthly and generates enough clean energy to power 180 homes. Recycling rate is currently 68% with potential to reach 85%.`;
      } else {
        responseContent = `I understand you're asking about "${inputValue}". I can help you with waste collection optimization, energy output predictions, route planning, and environmental impact analysis. The nearest waste-to-energy facility is 2.3 km away and processes 50+ tons daily, generating 150+ kWh of clean energy.`;
      }
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: responseContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handlePlayResponse = (content: string) => {
    if (!isSpeaking) {
      speakText(content);
    } else {
      stopSpeaking();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech not supported in this browser');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <section id="ai-query" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Ask Your <span className="hero-text">AI Assistant</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant insights on waste optimization, energy predictions, and collection strategies
            </p>
          </div>

          {/* Chat Interface */}
          <Card className="p-6 shadow-eco">
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'ai' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-background border border-border'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.type === 'ai' && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePlayResponse(message.content)}
                          className="h-6 px-2 text-xs"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="h-3 w-3 mr-1" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Volume2 className="h-3 w-3 mr-1" />
                              Play
                            </>
                          )}
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                  {message.type === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about waste optimization, energy predictions, or collection points..."
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleVoiceInput}
                  className={`absolute right-1 top-1 h-8 w-8 transition-all duration-200 ${
                    isListening 
                      ? 'text-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse scale-110' 
                      : 'text-muted-foreground hover:text-primary hover:bg-accent/20'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice input'}
                >
                  <Mic className={`h-4 w-4 transition-transform ${isListening ? 'scale-110' : ''}`} />
                </Button>
              </div>
              <Button 
                variant="ai" 
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                'Find nearest collection point',
                'Predict energy output',
                'Optimize collection route',
                'Calculate environmental impact'
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue(suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AIQuerySection;
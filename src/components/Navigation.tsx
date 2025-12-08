import React from 'react';
import { Button } from '@/components/ui/button';
import { Leaf, Bot, MapPin, BarChart3, Users, Mic } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary">GreenAI</h1>
            <p className="text-xs text-muted-foreground">Waste-to-Energy AI</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => document.getElementById('ai-query')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Bot className="h-4 w-4" />
            AI Assistant
          </button>
          <button 
            onClick={() => document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <MapPin className="h-4 w-4" />
            Waste Points
          </button>
          <button 
            onClick={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <BarChart3 className="h-4 w-4" />
            Insights
          </button>
          <button 
            onClick={() => document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <Users className="h-4 w-4" />
            Community
          </button>
        </div>

        {/* CTA Button */}
        <Button 
          variant="ai" 
          size="lg" 
          className="hidden sm:flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={() => document.getElementById('ai-query')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <Mic className="h-4 w-4" />
          Call Waste-Energy AI
        </Button>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <Bot className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
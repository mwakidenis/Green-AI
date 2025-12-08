import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Recycle, Brain, Leaf, TreePine } from 'lucide-react';
import heroImage from '@/assets/hero-green-energy.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-secondary/30">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Green energy technology" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-16 h-16 bg-energy/10 rounded-full animate-float" style={{ animationDelay: '4s' }} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8">
            <Zap className="h-4 w-4" />
            AI-Powered Sustainability
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Turning{' '}
            <span className="hero-text">Waste</span>
            {' '}Into{' '}
            <span className="hero-text">Energy</span>
            {' '}With AI
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed">
            Transform your community's waste management with our intelligent platform. 
            Optimize collection routes, predict energy output, and make every ton count.
          </p>

          {/* Environmental Impact Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-success/20 via-primary/20 to-accent/20 border border-success/30 rounded-full mb-12 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-success animate-pulse" />
              <TreePine className="h-5 w-5 text-primary" />
            </div>
            <p className="text-base font-medium text-foreground">
              <span className="font-bold text-success">Restoring our planet</span> by preventing land degradation and turning waste into renewable energy - building a greener, healthier Earth for future generations
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto hover:scale-105 active:scale-95 transition-all duration-300 group"
              onClick={() => document.getElementById('ai-query')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Brain className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Call Waste-Energy AI
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 h-auto hover:scale-105 active:scale-95 transition-all duration-300 group"
              onClick={() => document.getElementById('insights')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Recycle className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Explore Platform
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-sm text-muted-foreground">Tons Processed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2.5M</div>
              <div className="text-sm text-muted-foreground">kWh Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-energy mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Efficiency Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">30K</div>
              <div className="text-sm text-muted-foreground">Hectares Protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
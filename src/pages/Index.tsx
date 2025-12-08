import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AIQuerySection from '@/components/AIQuerySection';
import InteractiveDashboard from '@/components/InteractiveDashboard';
import MapSection from '@/components/MapSection';
import InsightsSection from '@/components/InsightsSection';
import LandRestorationSection from '@/components/LandRestorationSection';
import CommunitySection from '@/components/CommunitySection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <AIQuerySection />
        <section id="dashboard" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <InteractiveDashboard />
          </div>
        </section>
        <MapSection />
        <InsightsSection />
        <LandRestorationSection />
        <CommunitySection />
      </main>
      
      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">GreenAI</h3>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
              Transforming waste management with AI-powered solutions for a sustainable future.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-accent transition-colors">Contact</a>
            </div>
            <p className="text-primary-foreground/60 text-sm mt-6">
              © 2024 GreenAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

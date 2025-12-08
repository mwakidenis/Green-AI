import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp, Users, MessageSquare, Send, MapPin } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

const CommunitySection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'How does waste-to-energy conversion work?',
      answer: 'Our AI-powered system optimizes waste processing through advanced thermal conversion technologies. Waste is sorted, processed, and converted into clean energy through controlled combustion processes that meet strict environmental standards.',
      isOpen: false
    },
    {
      id: '2',
      question: 'What types of waste can be processed?',
      answer: 'We process organic waste, plastics, paper, and certain metals. Our AI system automatically categorizes waste types and optimizes processing methods for maximum energy output while ensuring environmental safety.',
      isOpen: false
    },
    {
      id: '3',
      question: 'How accurate are the energy predictions?',
      answer: 'Our AI models achieve 95%+ accuracy in energy output predictions by analyzing waste composition, processing history, and environmental factors. Predictions are updated in real-time as new data becomes available.',
      isOpen: false
    },
    {
      id: '4',
      question: 'Can I suggest new waste collection points?',
      answer: 'Absolutely! Use our feedback form below to suggest new collection points. Our AI analyzes community needs, population density, and logistics to evaluate and implement the most effective locations.',
      isOpen: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    location: '',
    message: ''
  });

  const toggleFaq = (id: string) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
    ));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      type: 'suggestion',
      location: '',
      message: ''
    });
  };

  return (
    <section id="community" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="hero-text">Community</span> Engagement
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our mission to create sustainable communities through collaborative waste management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* FAQ Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="overflow-hidden shadow-eco">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                    >
                      <h4 className="font-medium pr-4">{faq.question}</h4>
                      {faq.isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>
                    {faq.isOpen && (
                      <div className="px-6 pb-6 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              {/* Community Stats */}
              <Card className="mt-8 p-6 shadow-glow border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">Community Impact</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">2,500+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">150</div>
                    <div className="text-sm text-muted-foreground">Collection Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-energy mb-1">50+</div>
                    <div className="text-sm text-muted-foreground">Suggestions Implemented</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success mb-1">98%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feedback Form */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Send className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold">Share Your Feedback</h3>
              </div>

              <Card className="p-6 shadow-eco">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Feedback Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="suggestion">New Collection Point Suggestion</option>
                      <option value="improvement">System Improvement</option>
                      <option value="issue">Report an Issue</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>

                  {formData.type === 'suggestion' && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Suggested Location</label>
                      <div className="relative">
                        <Input
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Street address or landmark"
                          className="pl-10"
                        />
                        <MapPin className="h-4 w-4 text-muted-foreground absolute left-3 top-3" />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-2 block">Message</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your suggestion or feedback..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" variant="ai" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </Card>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Need immediate assistance?</h4>
                <p className="text-sm text-muted-foreground">
                  Contact our support team at{' '}
                  <a href="mailto:support@greenai.eco" className="text-primary hover:underline">
                    support@greenai.eco
                  </a>
                  {' '}or call{' '}
                  <a href="tel:+1-555-GREEN-AI" className="text-primary hover:underline">
                    +1 (555) GREEN-AI
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
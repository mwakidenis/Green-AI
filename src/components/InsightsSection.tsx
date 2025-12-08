import React from 'react';
import { Card } from '@/components/ui/card';
import { SimpleBarChart, SimpleLineChart, SimplePieChart } from '@/components/SimpleChart';
import { TrendingUp, Zap, Leaf, Target } from 'lucide-react';

const InsightsSection = () => {
  // Mock data for charts
  const weeklyWasteData = [
    { day: 'Mon', waste: 120, energy: 360 },
    { day: 'Tue', waste: 98, energy: 294 },
    { day: 'Wed', waste: 150, energy: 450 },
    { day: 'Thu', waste: 135, energy: 405 },
    { day: 'Fri', waste: 180, energy: 540 },
    { day: 'Sat', waste: 200, energy: 600 },
    { day: 'Sun', waste: 165, energy: 495 }
  ];

  const monthlyTrends = [
    { month: 'Jan', efficiency: 92, waste: 3200 },
    { month: 'Feb', efficiency: 94, waste: 3400 },
    { month: 'Mar', efficiency: 96, waste: 3600 },
    { month: 'Apr', efficiency: 93, waste: 3300 },
    { month: 'May', efficiency: 97, waste: 3800 },
    { month: 'Jun', efficiency: 95, waste: 3500 }
  ];

  const wasteComposition = [
    { name: 'Organic', value: 45, color: 'hsl(var(--success))' },
    { name: 'Plastic', value: 25, color: 'hsl(var(--primary))' },
    { name: 'Paper', value: 20, color: 'hsl(var(--accent))' },
    { name: 'Metal', value: 10, color: 'hsl(var(--energy))' }
  ];

  const impactMetrics = [
    {
      title: 'Waste Processed',
      value: '12,500',
      unit: 'tons',
      change: '+15%',
      icon: Leaf,
      color: 'success'
    },
    {
      title: 'Energy Generated',
      value: '37.5',
      unit: 'MWh',
      change: '+22%',
      icon: Zap,
      color: 'accent'
    },
    {
      title: 'CO₂ Avoided',
      value: '8,750',
      unit: 'kg',
      change: '+18%',
      icon: Target,
      color: 'primary'
    },
    {
      title: 'Efficiency Rate',
      value: '95.2',
      unit: '%',
      change: '+3%',
      icon: TrendingUp,
      color: 'energy'
    }
  ];

  return (
    <section id="insights" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="hero-text">Smart</span> Analytics Dashboard
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track waste processing efficiency, energy generation, and environmental impact in real-time
            </p>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {impactMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card 
                  key={metric.title} 
                  className="p-6 shadow-eco hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-${metric.color}/10 group-hover:bg-${metric.color}/20 transition-colors`}>
                      <Icon className={`h-5 w-5 text-${metric.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <span className="text-sm font-medium text-success group-hover:text-primary transition-colors">{metric.change}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{metric.title}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold group-hover:text-primary transition-colors">{metric.value}</span>
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Weekly Waste & Energy */}
            <Card className="p-6 shadow-eco">
              <h3 className="text-lg font-semibold mb-6">Weekly Waste Processing & Energy Output</h3>
              <div className="h-80">
                <SimpleBarChart 
                  data={weeklyWasteData}
                  dataKeys={[
                    { key: 'waste', name: 'Waste (tons)', color: 'hsl(var(--primary))' },
                    { key: 'energy', name: 'Energy (kWh)', color: 'hsl(var(--accent))' }
                  ]}
                />
              </div>
            </Card>

            {/* Monthly Efficiency Trends */}
            <Card className="p-6 shadow-eco">
              <h3 className="text-lg font-semibold mb-6">Efficiency Trends</h3>
              <div className="h-80">
                <SimpleLineChart 
                  data={monthlyTrends}
                  dataKey="efficiency"
                  color="hsl(var(--primary))"
                  name="Efficiency %"
                />
              </div>
            </Card>
          </div>

          {/* Bottom Section */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Waste Composition */}
            <Card className="p-6 shadow-eco hover:shadow-glow transition-all duration-300">
              <h3 className="text-lg font-semibold mb-6">Waste Composition</h3>
              <div className="h-64">
                <SimplePieChart 
                  data={wasteComposition} 
                  onSegmentClick={(data, index) => {
                    console.log('Clicked segment:', data, index);
                    // Could trigger detailed view or filtering
                  }}
                />
              </div>
            </Card>

            {/* Impact Summary */}
            <Card className="lg:col-span-2 p-6 shadow-eco">
              <h3 className="text-lg font-semibold mb-6">Environmental Impact Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Waste Diverted from Landfills</p>
                      <p className="text-2xl font-bold text-primary">12,500 tons</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-energy rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Clean Energy Produced</p>
                      <p className="text-2xl font-bold text-accent">37.5 MWh</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-lg">
                    <p className="text-sm font-medium text-success-foreground">
                      Equivalent to powering 12,500 homes for one day
                    </p>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm font-medium text-primary-foreground">
                      Reduced carbon footprint by 8.75 tons CO₂
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-success/20 to-primary/20 rounded-lg border border-success/30">
                    <p className="text-sm font-semibold text-success mb-1">
                      🌱 Fighting Land Degradation
                    </p>
                    <p className="text-sm text-foreground">
                      By keeping waste out of landfills, we're protecting soil health and preventing contamination of 35,420+ hectares of land. Our initiatives have resulted in a 45% increase in biodiversity and 12,500 tons/year of carbon sequestration through restored vegetation.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
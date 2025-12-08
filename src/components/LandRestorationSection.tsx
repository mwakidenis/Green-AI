import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sprout, TreePine, Droplets, Shield, TrendingUp, Award, AlertCircle } from 'lucide-react';

const LandRestorationSection = () => {
  const restorationMetrics = [
    {
      title: 'Land Protected',
      value: '35,420',
      unit: 'hectares',
      change: '+8.5%',
      icon: Shield,
      color: 'success',
      description: 'Total land area protected from degradation'
    },
    {
      title: 'Soil Health Score',
      value: '87.3',
      unit: '/100',
      change: '+5.2%',
      icon: Sprout,
      color: 'primary',
      description: 'Average soil quality index across protected areas'
    },
    {
      title: 'Trees Planted',
      value: '125,000',
      unit: 'trees',
      change: '+12%',
      icon: TreePine,
      color: 'success',
      description: 'Trees planted through waste reduction initiatives'
    },
    {
      title: 'Water Conservation',
      value: '2.4M',
      unit: 'liters',
      change: '+15%',
      icon: Droplets,
      color: 'accent',
      description: 'Water saved by preventing land contamination'
    }
  ];

  const restorationProjects = [
    {
      name: 'Urban Green Belt Initiative',
      location: 'North District',
      progress: 78,
      area: '5,200 hectares',
      status: 'active',
      impact: 'High',
      description: 'Converting landfill sites into green spaces'
    },
    {
      name: 'Soil Remediation Program',
      location: 'East Valley',
      progress: 92,
      area: '3,800 hectares',
      status: 'active',
      impact: 'Critical',
      description: 'Restoring contaminated industrial lands'
    },
    {
      name: 'Coastal Restoration Project',
      location: 'Riverside',
      progress: 65,
      area: '2,600 hectares',
      status: 'active',
      impact: 'Medium',
      description: 'Protecting coastal areas from waste runoff'
    },
    {
      name: 'Agricultural Land Recovery',
      location: 'South Plains',
      progress: 45,
      area: '8,400 hectares',
      status: 'ongoing',
      impact: 'High',
      description: 'Rehabilitating degraded farmlands'
    }
  ];

  const environmentalBenefits = [
    {
      title: 'Biodiversity Increase',
      value: '45%',
      description: 'Native species returning to restored areas',
      icon: Sprout
    },
    {
      title: 'Carbon Sequestration',
      value: '12,500 tons/year',
      description: 'CO₂ captured by restored vegetation',
      icon: TreePine
    },
    {
      title: 'Erosion Prevention',
      value: '98%',
      description: 'Reduction in soil erosion rates',
      icon: Shield
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'bg-destructive';
      case 'High': return 'bg-warning';
      case 'Medium': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="land-restoration" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="hero-text">Land Restoration</span> & Conservation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protecting and restoring ecosystems through sustainable waste management practices
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {restorationMetrics.map((metric) => {
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
                    <span className="text-sm font-medium text-success">{metric.change}</span>
                  </div>
                  <div className="space-y-1 mb-3">
                    <h3 className="text-sm font-medium text-muted-foreground">{metric.title}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Restoration Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              Active Restoration Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {restorationProjects.map((project) => (
                <Card key={project.name} className="p-6 shadow-eco hover:shadow-glow transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                    <Badge className={getImpactColor(project.impact)}>{project.impact}</Badge>
                  </div>
                  
                  <p className="text-sm mb-4 text-muted-foreground">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm pt-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-success" />
                        <span className="text-muted-foreground">Area: {project.area}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Environmental Benefits */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="lg:col-span-2 p-6 shadow-eco">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Environmental Impact
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {environmentalBenefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-success/10 rounded-lg">
                          <Icon className="h-5 w-5 text-success" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-muted-foreground">{benefit.title}</p>
                          <p className="text-lg font-bold text-success">{benefit.value}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{benefit.description}</p>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 shadow-eco bg-gradient-to-br from-success/10 to-primary/10">
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-success/20 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Land Degradation Prevention</h3>
                  <p className="text-sm text-muted-foreground">
                    Our waste-to-energy initiatives have prevented contamination of over 35,000 hectares of land
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="p-3 bg-background/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Soil Contamination Prevented</p>
                  <p className="text-2xl font-bold text-success">99.2%</p>
                </div>
                
                <div className="p-3 bg-background/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Ecosystems Protected</p>
                  <p className="text-2xl font-bold text-primary">24 zones</p>
                </div>

                <div className="p-3 bg-background/50 rounded-lg">
                  <p className="text-sm font-medium mb-1">Native Habitats Restored</p>
                  <p className="text-2xl font-bold text-accent">18 sites</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="p-8 bg-gradient-to-r from-success/20 to-primary/20 border-success/30">
            <div className="text-center max-w-3xl mx-auto">
              <TreePine className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Join Our Land Restoration Efforts</h3>
              <p className="text-muted-foreground mb-6">
                By participating in our waste-to-energy program, you're directly contributing to land conservation 
                and restoration initiatives. Every ton of waste diverted from landfills helps protect our precious ecosystems.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span>Zero landfill waste</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span>100% sustainable energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full" />
                  <span>Protected ecosystems</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LandRestorationSection;

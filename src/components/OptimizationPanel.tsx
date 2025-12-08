import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Settings, TrendingUp, Thermometer, Gauge, Droplets, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface OptimizationParams {
  temperature: number;
  pressure: number;
  flowRate: number;
  oxygenLevel: number;
  catalystAmount: number;
  retentionTime: number;
}

interface OptimizationResult {
  optimalParams: OptimizationParams;
  expectedEfficiency: number;
  energyIncrease: number;
  costSavings: number;
  environmentalImpact: number;
  recommendations: string[];
}

interface PerformanceMetrics {
  currentEfficiency: number;
  targetEfficiency: number;
  energyOutput: number;
  operatingCost: number;
  co2Reduction: number;
}

const OptimizationPanel = () => {
  const [currentParams, setCurrentParams] = useState<OptimizationParams>({
    temperature: 850,
    pressure: 2.5,
    flowRate: 500,
    oxygenLevel: 18,
    catalystAmount: 150,
    retentionTime: 45
  });

  const [optimizationResult, setOptimizationResult] = useState<OptimizationResult | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [autoOptimize, setAutoOptimize] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    currentEfficiency: 78.5,
    targetEfficiency: 85.2,
    energyOutput: 1250,
    operatingCost: 850,
    co2Reduction: 2.3
  });

  const parameterRanges = {
    temperature: { min: 700, max: 1000, unit: '°C', step: 10 },
    pressure: { min: 1.0, max: 5.0, unit: 'bar', step: 0.1 },
    flowRate: { min: 200, max: 800, unit: 'kg/h', step: 10 },
    oxygenLevel: { min: 15, max: 25, unit: '%', step: 0.5 },
    catalystAmount: { min: 100, max: 300, unit: 'kg', step: 5 },
    retentionTime: { min: 30, max: 90, unit: 'min', step: 5 }
  };

  // Placeholder optimization function - replace with actual ML model call
  const optimizeParameters = async (params: OptimizationParams): Promise<OptimizationResult> => {
    // TODO: Replace with actual API call to ML optimization model
    // const response = await supabase.functions.invoke('ml-predictions', {
    //   body: { model_type: 'energy-optimization', input_data: params }
    // });

    // Simulate optimization delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock optimization results
    const optimalParams: OptimizationParams = {
      temperature: params.temperature + (Math.random() - 0.5) * 50,
      pressure: Math.max(1.0, Math.min(5.0, params.pressure + (Math.random() - 0.5) * 0.5)),
      flowRate: params.flowRate + (Math.random() - 0.5) * 100,
      oxygenLevel: Math.max(15, Math.min(25, params.oxygenLevel + (Math.random() - 0.5) * 2)),
      catalystAmount: params.catalystAmount + (Math.random() - 0.5) * 20,
      retentionTime: params.retentionTime + (Math.random() - 0.5) * 10
    };

    const efficiencyGain = Math.random() * 8 + 2; // 2-10% improvement
    const energyIncrease = Math.random() * 200 + 100; // 100-300 kWh increase

    return {
      optimalParams,
      expectedEfficiency: Math.min(95, performanceMetrics.currentEfficiency + efficiencyGain),
      energyIncrease,
      costSavings: energyIncrease * 0.12, // $0.12 per kWh
      environmentalImpact: energyIncrease * 0.5, // kg CO2 reduction
      recommendations: [
        `Increase temperature to ${optimalParams.temperature.toFixed(0)}°C for better combustion`,
        `Adjust pressure to ${optimalParams.pressure.toFixed(1)} bar for optimal flow`,
        `Optimize oxygen level to ${optimalParams.oxygenLevel.toFixed(1)}% for complete burning`,
        'Monitor catalyst performance and replace when efficiency drops'
      ]
    };
  };

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const result = await optimizeParameters(currentParams);
      setOptimizationResult(result);
      toast.success('Optimization completed successfully!');
    } catch (error) {
      toast.error('Optimization failed');
      console.error('Optimization error:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyOptimalParams = () => {
    if (optimizationResult) {
      setCurrentParams(optimizationResult.optimalParams);
      toast.success('Optimal parameters applied!');
    }
  };

  const resetToDefaults = () => {
    setCurrentParams({
      temperature: 850,
      pressure: 2.5,
      flowRate: 500,
      oxygenLevel: 18,
      catalystAmount: 150,
      retentionTime: 45
    });
    toast.info('Parameters reset to defaults');
  };

  const updateParameter = (key: keyof OptimizationParams, value: number[]) => {
    setCurrentParams(prev => ({ ...prev, [key]: value[0] }));
  };

  useEffect(() => {
    if (autoOptimize) {
      const interval = setInterval(() => {
        handleOptimize();
      }, 30000); // Auto-optimize every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoOptimize, currentParams]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Process Optimization</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={autoOptimize}
              onCheckedChange={setAutoOptimize}
              id="auto-optimize"
            />
            <Label htmlFor="auto-optimize">Auto-optimize</Label>
          </div>
          
          <Button variant="outline" onClick={resetToDefaults}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current Efficiency</span>
                <span className="font-medium">{performanceMetrics.currentEfficiency}%</span>
              </div>
              <Progress value={performanceMetrics.currentEfficiency} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Target Efficiency</span>
                <span className="font-medium text-green-600">{performanceMetrics.targetEfficiency}%</span>
              </div>
              <Progress value={performanceMetrics.targetEfficiency} className="h-2" />
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold">{performanceMetrics.energyOutput}</div>
                <div className="text-xs text-muted-foreground">kWh/hour</div>
              </div>
              
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold">${performanceMetrics.operatingCost}</div>
                <div className="text-xs text-muted-foreground">Operating Cost</div>
              </div>
              
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-lg font-bold text-green-600">{performanceMetrics.co2Reduction}t</div>
                <div className="text-xs text-muted-foreground">CO₂ Reduced</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Parameter Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Process Parameters</CardTitle>
            <CardDescription>Adjust operating parameters for optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="thermal" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="thermal">Thermal</TabsTrigger>
                <TabsTrigger value="chemical">Chemical</TabsTrigger>
              </TabsList>
              
              <TabsContent value="thermal" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4" />
                      <span>Temperature</span>
                    </Label>
                    <Badge variant="outline">
                      {currentParams.temperature}{parameterRanges.temperature.unit}
                    </Badge>
                  </div>
                  <Slider
                    value={[currentParams.temperature]}
                    onValueChange={(value) => updateParameter('temperature', value)}
                    min={parameterRanges.temperature.min}
                    max={parameterRanges.temperature.max}
                    step={parameterRanges.temperature.step}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center space-x-2">
                      <Gauge className="h-4 w-4" />
                      <span>Pressure</span>
                    </Label>
                    <Badge variant="outline">
                      {currentParams.pressure}{parameterRanges.pressure.unit}
                    </Badge>
                  </div>
                  <Slider
                    value={[currentParams.pressure]}
                    onValueChange={(value) => updateParameter('pressure', value)}
                    min={parameterRanges.pressure.min}
                    max={parameterRanges.pressure.max}
                    step={parameterRanges.pressure.step}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4" />
                      <span>Flow Rate</span>
                    </Label>
                    <Badge variant="outline">
                      {currentParams.flowRate}{parameterRanges.flowRate.unit}
                    </Badge>
                  </div>
                  <Slider
                    value={[currentParams.flowRate]}
                    onValueChange={(value) => updateParameter('flowRate', value)}
                    min={parameterRanges.flowRate.min}
                    max={parameterRanges.flowRate.max}
                    step={parameterRanges.flowRate.step}
                    className="w-full"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="chemical" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Oxygen Level</Label>
                    <Badge variant="outline">
                      {currentParams.oxygenLevel}{parameterRanges.oxygenLevel.unit}
                    </Badge>
                  </div>
                  <Slider
                    value={[currentParams.oxygenLevel]}
                    onValueChange={(value) => updateParameter('oxygenLevel', value)}
                    min={parameterRanges.oxygenLevel.min}
                    max={parameterRanges.oxygenLevel.max}
                    step={parameterRanges.oxygenLevel.step}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Catalyst Amount</Label>
                    <Badge variant="outline">
                      {currentParams.catalystAmount}{parameterRanges.catalystAmount.unit}
                    </Badge>
                  </div>
                  <Slider
                    value={[currentParams.catalystAmount]}
                    onValueChange={(value) => updateParameter('catalystAmount', value)}
                    min={parameterRanges.catalystAmount.min}
                    max={parameterRanges.catalystAmount.max}
                    step={parameterRanges.catalystAmount.step}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Retention Time</Label>
                    <Badge variant="outline">
                      {currentParams.retentionTime}{parameterRanges.retentionTime.unit}
                    </Badge>
                  </div>
                  <Slider
                    value={[currentParams.retentionTime]}
                    onValueChange={(value) => updateParameter('retentionTime', value)}
                    min={parameterRanges.retentionTime.min}
                    max={parameterRanges.retentionTime.max}
                    step={parameterRanges.retentionTime.step}
                    className="w-full"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleOptimize} 
              disabled={isOptimizing}
              className="w-full mt-4"
            >
              {isOptimizing ? 'Optimizing...' : 'Optimize Parameters'}
            </Button>
          </CardContent>
        </Card>

        {/* Optimization Results */}
        <Card>
          <CardHeader>
            <CardTitle>Optimization Results</CardTitle>
            <CardDescription>AI-generated parameter recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            {optimizationResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      +{optimizationResult.expectedEfficiency.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Efficiency</div>
                  </div>
                  
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">
                      +{optimizationResult.energyIncrease.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">kWh/day</div>
                  </div>
                  
                  <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <div className="text-lg font-bold text-yellow-600">
                      ${optimizationResult.costSavings.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Daily Savings</div>
                  </div>
                  
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">
                      -{optimizationResult.environmentalImpact.toFixed(1)}kg
                    </div>
                    <div className="text-xs text-muted-foreground">CO₂ Impact</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Recommendations</Label>
                  <div className="space-y-1">
                    {optimizationResult.recommendations.map((rec, index) => (
                      <div key={index} className="text-xs p-2 bg-muted rounded text-muted-foreground">
                        • {rec}
                      </div>
                    ))}
                  </div>
                </div>

                <Button onClick={applyOptimalParams} className="w-full">
                  Apply Optimal Parameters
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Run optimization to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OptimizationPanel;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, TrendingUp, Zap, Recycle } from 'lucide-react';
import { toast } from 'sonner';

interface PredictionData {
  wasteAmount: number;
  wasteType: string;
  predictedEnergy: number;
  confidence: number;
  processingTime: number;
  timestamp: Date;
}

interface WasteInputData {
  amount: number;
  type: string;
  temperature: number;
  humidity: number;
  location: string;
}

const PredictionDashboard = () => {
  const [inputData, setInputData] = useState<WasteInputData>({
    amount: 1000,
    type: 'organic',
    temperature: 25,
    humidity: 60,
    location: 'facility-a'
  });
  
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState<PredictionData[]>([]);

  const wasteTypes = [
    { value: 'organic', label: 'Organic Waste' },
    { value: 'plastic', label: 'Plastic Waste' },
    { value: 'paper', label: 'Paper & Cardboard' },
    { value: 'metal', label: 'Metal Waste' },
    { value: 'mixed', label: 'Mixed Waste' }
  ];

  const facilities = [
    { value: 'facility-a', label: 'Processing Facility A' },
    { value: 'facility-b', label: 'Processing Facility B' },
    { value: 'facility-c', label: 'Processing Facility C' }
  ];

  // Placeholder API call - replace with actual ML model integration
  const predictWasteProcessing = async (data: WasteInputData): Promise<PredictionData> => {
    // TODO: Replace with actual API call to ML model
    // const response = await supabase.functions.invoke('ml-predictions', {
    //   body: { model_type: 'waste-processing', input_data: data }
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock prediction data
    const energyMultiplier = {
      organic: 0.8,
      plastic: 1.2,
      paper: 0.6,
      metal: 0.4,
      mixed: 0.7
    };
    
    const baseEnergy = data.amount * energyMultiplier[data.type as keyof typeof energyMultiplier];
    const temperatureFactor = 1 + (data.temperature - 20) * 0.02;
    const humidityFactor = 1 + (60 - data.humidity) * 0.01;
    
    return {
      wasteAmount: data.amount,
      wasteType: data.type,
      predictedEnergy: Math.round(baseEnergy * temperatureFactor * humidityFactor),
      confidence: Math.random() * 20 + 80, // 80-100%
      processingTime: Math.round(data.amount / 25 + Math.random() * 20),
      timestamp: new Date()
    };
  };

  const handlePredict = async () => {
    setIsLoading(true);
    try {
      const result = await predictWasteProcessing(inputData);
      setPrediction(result);
      setHistoricalData(prev => [result, ...prev.slice(0, 4)]);
      toast.success('Prediction generated successfully!');
    } catch (error) {
      toast.error('Failed to generate prediction');
      console.error('Prediction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceVariant = (confidence: number) => {
    if (confidence >= 90) return 'default';
    if (confidence >= 75) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Zap className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">ML Prediction Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Recycle className="h-5 w-5" />
              <span>Waste Input Parameters</span>
            </CardTitle>
            <CardDescription>
              Enter waste characteristics to predict energy output
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Waste Amount (kg)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={inputData.amount}
                  onChange={(e) => setInputData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                  min="1"
                  max="10000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Waste Type</Label>
                <Select
                  value={inputData.type}
                  onValueChange={(value) => setInputData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    {wasteTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  value={inputData.temperature}
                  onChange={(e) => setInputData(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                  min="-10"
                  max="50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  value={inputData.humidity}
                  onChange={(e) => setInputData(prev => ({ ...prev, humidity: Number(e.target.value) }))}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Processing Facility</Label>
              <Select
                value={inputData.location}
                onValueChange={(value) => setInputData(prev => ({ ...prev, location: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  {facilities.map((facility) => (
                    <SelectItem key={facility.value} value={facility.value}>
                      {facility.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handlePredict} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Generating Prediction...' : 'Predict Energy Output'}
            </Button>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Prediction Results</span>
            </CardTitle>
            <CardDescription>
              AI-generated energy output forecast
            </CardDescription>
          </CardHeader>
          <CardContent>
            {prediction ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {prediction.predictedEnergy.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">kWh Expected</div>
                  </div>
                  
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-secondary">
                      {prediction.processingTime}
                    </div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Confidence Level</span>
                    <Badge variant={getConfidenceVariant(prediction.confidence)}>
                      {prediction.confidence.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={prediction.confidence} className="h-2" />
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  <span>
                    Prediction generated at {prediction.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Zap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Generate a prediction to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Historical Predictions */}
      {historicalData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Predictions</CardTitle>
            <CardDescription>
              History of your latest ML predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {historicalData.map((data, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-sm">
                      <div className="font-medium">
                        {data.wasteAmount.toLocaleString()}kg {data.wasteType}
                      </div>
                      <div className="text-muted-foreground">
                        {data.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-medium">
                        {data.predictedEnergy.toLocaleString()} kWh
                      </div>
                      <div className={`text-sm ${getConfidenceColor(data.confidence)}`}>
                        {data.confidence.toFixed(1)}% confidence
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictionDashboard;
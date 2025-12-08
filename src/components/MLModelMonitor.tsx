import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Activity, 
  Brain, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Database,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

interface ModelMetrics {
  modelName: string;
  version: string;
  accuracy: number;
  latency: number;
  predictionsPerHour: number;
  lastUpdated: Date;
  status: 'healthy' | 'warning' | 'error';
  memoryUsage: number;
  cpuUsage: number;
}

interface ModelLog {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  modelName: string;
}

interface PerformanceData {
  timestamp: Date;
  accuracy: number;
  latency: number;
  throughput: number;
}

const MLModelMonitor = () => {
  const [models, setModels] = useState<ModelMetrics[]>([
    {
      modelName: 'Waste Processing Predictor',
      version: 'v2.3.1',
      accuracy: 94.7,
      latency: 145,
      predictionsPerHour: 1250,
      lastUpdated: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'healthy',
      memoryUsage: 72,
      cpuUsage: 45
    },
    {
      modelName: 'Energy Optimization Engine',
      version: 'v1.8.2',
      accuracy: 89.3,
      latency: 280,
      predictionsPerHour: 820,
      lastUpdated: new Date(Date.now() - 180000), // 3 minutes ago
      status: 'warning',
      memoryUsage: 85,
      cpuUsage: 68
    },
    {
      modelName: 'Efficiency Classifier',
      version: 'v3.1.0',
      accuracy: 96.2,
      latency: 95,
      predictionsPerHour: 2100,
      lastUpdated: new Date(Date.now() - 120000), // 2 minutes ago
      status: 'healthy',
      memoryUsage: 58,
      cpuUsage: 34
    }
  ]);

  const [logs, setLogs] = useState<ModelLog[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 120000),
      level: 'info',
      message: 'Model prediction completed successfully',
      modelName: 'Waste Processing Predictor'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 180000),
      level: 'warning',
      message: 'High memory usage detected, consider scaling',
      modelName: 'Energy Optimization Engine'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 240000),
      level: 'info',
      message: 'Model accuracy validation passed',
      modelName: 'Efficiency Classifier'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 300000),
      level: 'error',
      message: 'Temporary connection timeout to data source',
      modelName: 'Energy Optimization Engine'
    }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('Waste Processing Predictor');

  // Placeholder function to refresh model metrics
  const refreshMetrics = async () => {
    setIsRefreshing(true);
    
    // TODO: Replace with actual API call to get model metrics
    // const response = await supabase.functions.invoke('ml-model-metrics');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock updated metrics
    setModels(prev => prev.map(model => ({
      ...model,
      accuracy: Math.max(85, Math.min(98, model.accuracy + (Math.random() - 0.5) * 2)),
      latency: Math.max(50, Math.min(500, model.latency + (Math.random() - 0.5) * 20)),
      predictionsPerHour: Math.max(500, Math.min(3000, model.predictionsPerHour + (Math.random() - 0.5) * 100)),
      lastUpdated: new Date(),
      memoryUsage: Math.max(30, Math.min(95, model.memoryUsage + (Math.random() - 0.5) * 10)),
      cpuUsage: Math.max(20, Math.min(90, model.cpuUsage + (Math.random() - 0.5) * 15))
    })));
    
    toast.success('Model metrics refreshed');
    setIsRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'healthy': return 'default';
      case 'warning': return 'secondary';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">ML Model Monitor</h2>
        </div>
        
        <Button 
          onClick={refreshMetrics} 
          disabled={isRefreshing}
          variant="outline"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Model Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all ${
              selectedModel === model.modelName ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedModel(model.modelName)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{model.modelName}</CardTitle>
                <Badge variant={getStatusVariant(model.status)}>
                  {getStatusIcon(model.status)}
                  <span className="ml-1 capitalize">{model.status}</span>
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Version {model.version} • Updated {model.lastUpdated.toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-bold text-green-600">{model.accuracy.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <div className="font-bold">{model.latency}ms</div>
                  <div className="text-xs text-muted-foreground">Latency</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Memory</span>
                  <span>{model.memoryUsage}%</span>
                </div>
                <Progress value={model.memoryUsage} className="h-1" />
                
                <div className="flex justify-between text-xs">
                  <span>CPU</span>
                  <span>{model.cpuUsage}%</span>
                </div>
                <Progress value={model.cpuUsage} className="h-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Model Performance</span>
            </CardTitle>
            <CardDescription>
              Detailed metrics for {selectedModel}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {models.find(m => m.modelName === selectedModel) && (
              <div className="space-y-4">
                <Tabs defaultValue="metrics" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="metrics">Metrics</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="metrics" className="space-y-4 mt-4">
                    {(() => {
                      const model = models.find(m => m.modelName === selectedModel)!;
                      return (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Predictions/Hour</span>
                              <Badge variant="outline">
                                {model.predictionsPerHour.toLocaleString()}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Average Latency</span>
                              <Badge variant="outline">{model.latency}ms</Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Model Version</span>
                              <Badge variant="outline">{model.version}</Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Accuracy</span>
                                <span>{model.accuracy.toFixed(1)}%</span>
                              </div>
                              <Progress value={model.accuracy} className="h-2" />
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Memory Usage</span>
                                <span>{model.memoryUsage}%</span>
                              </div>
                              <Progress value={model.memoryUsage} className="h-2" />
                            </div>
                            
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>CPU Usage</span>
                                <span>{model.cpuUsage}%</span>
                              </div>
                              <Progress value={model.cpuUsage} className="h-2" />
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </TabsContent>
                  
                  <TabsContent value="performance" className="mt-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">Performance charts coming soon</p>
                      <p className="text-xs">Historical performance tracking and trend analysis</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>System Logs</span>
            </CardTitle>
            <CardDescription>
              Recent activity and alerts from ML models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] w-full">
              <div className="space-y-3">
                {logs.map((log) => (
                  <div 
                    key={log.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg"
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {getLogIcon(log.level)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{log.modelName}</p>
                        <time className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </time>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {log.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* System Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>System Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {models.filter(m => m.status === 'healthy').length}
              </div>
              <div className="text-sm text-muted-foreground">Healthy Models</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {models.filter(m => m.status === 'warning').length}
              </div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {models.reduce((sum, m) => sum + m.predictionsPerHour, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Predictions/Hour</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MLModelMonitor;
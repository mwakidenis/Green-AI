import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Activity, 
  TrendingUp, 
  Zap, 
  Recycle, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  Pause, 
  RotateCcw 
} from 'lucide-react';

interface SystemStatus {
  energy: number;
  efficiency: number;
  waste: number;
  alerts: number;
}

const InteractiveDashboard = () => {
  const [isLive, setIsLive] = useState(true);
  const [refreshRate, setRefreshRate] = useState([5]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    energy: 85,
    efficiency: 92,
    waste: 78,
    alerts: 3
  });

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        energy: Math.max(0, Math.min(100, prev.energy + (Math.random() - 0.5) * 10)),
        efficiency: Math.max(0, Math.min(100, prev.efficiency + (Math.random() - 0.5) * 5)),
        waste: Math.max(0, Math.min(100, prev.waste + (Math.random() - 0.5) * 8)),
        alerts: Math.floor(Math.random() * 6)
      }));
    }, refreshRate[0] * 1000);

    return () => clearInterval(interval);
  }, [isLive, refreshRate]);

  const getStatusColor = (value: number) => {
    if (value >= 80) return 'text-success';
    if (value >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (value: number) => {
    return value >= 60 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live System Dashboard</h2>
          <p className="text-muted-foreground">Real-time monitoring and control</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={isLive}
              onCheckedChange={setIsLive}
              className="data-[state=checked]:bg-success"
            />
            <span className="text-sm font-medium">Live Updates</span>
            {isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">LIVE</span>
              </div>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSystemStatus({
                energy: 85,
                efficiency: 92,
                waste: 78,
                alerts: 3
              });
            }}
            className="hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energy Output</CardTitle>
            <Zap className="h-4 w-4 text-energy group-hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-energy transition-colors">
              {systemStatus.energy.toFixed(1)}%
            </div>
            <Progress 
              value={systemStatus.energy} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary group-hover:animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-primary transition-colors">
              {systemStatus.efficiency.toFixed(1)}%
            </div>
            <Progress 
              value={systemStatus.efficiency} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Waste Processing</CardTitle>
            <Recycle className="h-4 w-4 text-accent group-hover:animate-spin" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold group-hover:text-accent transition-colors">
              {systemStatus.waste.toFixed(1)}%
            </div>
            <Progress 
              value={systemStatus.waste} 
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            {systemStatus.alerts > 0 ? (
              <AlertTriangle className="h-4 w-4 text-warning group-hover:animate-bounce" />
            ) : (
              <CheckCircle className="h-4 w-4 text-success group-hover:animate-pulse" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-colors ${systemStatus.alerts > 0 ? 'group-hover:text-warning' : 'group-hover:text-success'}`}>
              {systemStatus.alerts}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={systemStatus.alerts > 0 ? 'destructive' : 'default'}>
                {systemStatus.alerts > 0 ? 'Needs Attention' : 'All Clear'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls Panel */}
      <Card className="p-6">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Controls
          </CardTitle>
          <CardDescription>
            Configure real-time monitoring settings
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium">Live Updates</label>
                <p className="text-xs text-muted-foreground">
                  Enable real-time data refresh
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLive(!isLive)}
                  className="hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Refresh Rate</label>
                <span className="text-sm text-muted-foreground">{refreshRate[0]}s</span>
              </div>
              <Slider
                value={refreshRate}
                onValueChange={setRefreshRate}
                max={30}
                min={1}
                step={1}
                className="w-full"
                disabled={!isLive}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1s</span>
                <span>15s</span>
                <span>30s</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <Button 
                variant="outline"
                className="hover:scale-105 active:scale-95 transition-all duration-200"
                onClick={() => console.log('Optimize system triggered')}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Optimize
              </Button>
              <Button 
                variant="outline"
                className="hover:scale-105 active:scale-95 transition-all duration-200"
                onClick={() => console.log('Generate report triggered')}
              >
                <Activity className="h-4 w-4 mr-2" />
                Report
              </Button>
              <Button 
                variant="outline"
                className="hover:scale-105 active:scale-95 transition-all duration-200"
                onClick={() => console.log('Emergency stop triggered')}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveDashboard;
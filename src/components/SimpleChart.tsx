import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Simple wrapper components to avoid the complex chart.tsx issues
export const SimpleBarChart = ({ data, dataKeys, colors }: {
  data: any[];
  dataKeys: { key: string; name: string; color: string }[];
  colors?: string[];
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
      <YAxis stroke="hsl(var(--muted-foreground))" />
      <Tooltip 
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
      />
      {dataKeys.map((key) => (
        <Bar 
          key={key.key}
          dataKey={key.key} 
          fill={key.color} 
          name={key.name} 
          radius={[4, 4, 0, 0]} 
        />
      ))}
    </BarChart>
  </ResponsiveContainer>
);

export const SimpleLineChart = ({ data, dataKey, color, name }: {
  data: any[];
  dataKey: string;
  color: string;
  name: string;
}) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
      <YAxis stroke="hsl(var(--muted-foreground))" />
      <Tooltip 
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }}
      />
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={color} 
        strokeWidth={3}
        dot={{ fill: color, strokeWidth: 2, r: 6 }}
        name={name}
      />
    </LineChart>
  </ResponsiveContainer>
);

export const SimplePieChart = ({ data, onSegmentClick }: {
  data: { name: string; value: number; color: string }[];
  onSegmentClick?: (data: any, index: number) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={hoveredIndex !== null ? 85 : 80}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}%`}
          onClick={onSegmentClick}
          onMouseEnter={(_, index) => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{ cursor: onSegmentClick ? 'pointer' : 'default' }}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke={hoveredIndex === index ? entry.color : 'none'}
              strokeWidth={hoveredIndex === index ? 2 : 0}
              style={{
                filter: hoveredIndex === index ? 'brightness(1.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
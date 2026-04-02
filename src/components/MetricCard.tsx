import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip } from 'recharts';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  data: any[];
  color?: string;
  description?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, unit, data, color = "#10b981", description }) => {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex flex-col h-full">
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{title}</h3>
        {description && (
          <span className="text-[9px] text-zinc-600 italic">{description}</span>
        )}
      </div>
      
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-2xl font-mono font-bold text-zinc-100">{value}</span>
        {unit && <span className="text-xs text-zinc-500 font-mono">{unit}</span>}
      </div>

      <div className="flex-1 min-h-[60px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="val" 
              stroke={color} 
              strokeWidth={2} 
              dot={false} 
              isAnimationActive={false}
            />
            <YAxis hide domain={['auto', 'auto']} />
            <XAxis hide />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-zinc-800 border border-zinc-700 p-1 text-[10px] font-mono text-zinc-300">
                      {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

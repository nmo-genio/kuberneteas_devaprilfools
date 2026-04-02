import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface Log {
  id: string;
  timestamp: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const INITIAL_LOGS: Log[] = [
  { id: '1', timestamp: new Date().toISOString(), level: 'DEBUG', message: 'Initializing chamomile-operator...' },
  { id: '2', timestamp: new Date().toISOString(), level: 'INFO', message: 'Liveness probe passed: Water temperature 92°C.' },
  { id: '3', timestamp: new Date().toISOString(), level: 'INFO', message: 'Pod eg-node-03f4 scheduled on mug-1a.' },
];

const LOG_MESSAGES = [
  "Steeping process at 45% completion. Bergamot levels stable.",
  "HPA: Scaling tea replicas due to high thirst pressure.",
  "Istio-proxy: mTLS handshake successful with Honey-Service.",
  "Garbage collection: Removing spent tea leaves from memory.",
  "Liveness probe failed: Water temperature too low (85°C).",
  "Earl-Grey-pod-001 has entered 'Warm-By-Microwave' fallback mode.",
  "Tainting node 'kitchen-counter' with effect: NoSchedule (Coffee).",
  "Prom-TEA-us: Scraping metrics from kettle-exporter.",
  "Service Mesh: Routing 20% of traffic to Oolong-Canary.",
  "Kubelet: Successfully pulled image 'twinings/earl-grey:latest'.",
  "Honey-Injector Sidecar: CrashLoopBackOff (Reason: Honey crystallized).",
  "Sidecar: Lemon-Squeezer-v2 successfully injected into mug-context.",
];

export const LogStream: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>(INITIAL_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: Log = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
        level: Math.random() > 0.8 ? 'WARN' : (Math.random() > 0.9 ? 'ERROR' : (Math.random() > 0.5 ? 'INFO' : 'DEBUG')),
        message: LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)],
      };
      setLogs(prev => [...prev.slice(-49), newLog]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/40 border border-zinc-800 rounded-lg p-4 font-mono text-xs h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2 border-b border-zinc-800 pb-2">
        <span className="text-zinc-400 uppercase tracking-widest">Live Logs (Firehose)</span>
        <span className="text-green-500 animate-pulse">● LIVE</span>
      </div>
      <div ref={scrollRef} className="overflow-y-auto flex-1 space-y-1 min-h-0">
        {logs.map(log => (
          <div key={log.id} className="flex gap-2">
            <span className="text-zinc-600">[{log.timestamp.split('T')[1].split('.')[0]}]</span>
            <span className={cn(
              "font-bold",
              log.level === 'DEBUG' && "text-blue-400",
              log.level === 'INFO' && "text-green-400",
              log.level === 'WARN' && "text-yellow-400",
              log.level === 'ERROR' && "text-red-400",
            )}>[{log.level}]</span>
            <span className="text-zinc-300">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

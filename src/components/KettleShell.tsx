import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Terminal, AlertTriangle, Coffee, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface KettleShellProps {
  onBack: () => void;
}

interface LogEntry {
  id: string;
  type: 'input' | 'output' | 'error';
  text: string;
  timestamp: string;
}

export const KettleShell: React.FC<KettleShellProps> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', type: 'output', text: 'KuberneTEAS Kettle Shell v1.4.18-teapot initialized.', timestamp: new Date().toLocaleTimeString() },
    { id: '2', type: 'output', text: 'Connection established to master-kettle-01.', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const newLogs: LogEntry[] = [
      ...logs,
      { id: Date.now().toString(), type: 'input', text: input, timestamp: new Date().toLocaleTimeString() }
    ];
    setLogs(newLogs);
    setInput('');
    setIsProcessing(true);

    // Simulate network delay
    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        { 
          id: (Date.now() + 1).toString(), 
          type: 'error', 
          text: 'HTTP 418: I\'m a teapot. (RFC 2324 Compliance Failure)', 
          timestamp: new Date().toLocaleTimeString() 
        },
        { 
          id: (Date.now() + 2).toString(), 
          type: 'output', 
          text: 'Error: Cannot execute non-tea related commands. This cluster is strictly reserved for Camellia Sinensis orchestration.', 
          timestamp: new Date().toLocaleTimeString() 
        }
      ]);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-green-500 font-mono flex flex-col selection:bg-green-500/30">
      {/* Header */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600/20 rounded flex items-center justify-center border border-green-500/30">
              <Terminal className="w-5 h-5 text-green-400" />
            </div>
            <h1 className="font-black tracking-tighter text-lg text-white uppercase">Kettle Shell (K-SH)</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-red-900/20 rounded border border-red-900/30 text-[10px] font-bold text-red-400 animate-pulse">
          <ShieldAlert className="w-3 h-3" />
          <span>RESTRICTED ACCESS</span>
        </div>
      </header>

      <main className="flex-1 p-6 flex flex-col max-w-5xl mx-auto w-full overflow-hidden">
        {/* Disclaimer */}
        <div className="mb-6 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex items-start gap-4">
          <div className="bg-yellow-900/20 p-2 rounded border border-yellow-500/30">
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Security Disclaimer</h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              This terminal is strictly for <span className="text-zinc-300 font-bold italic">"schedule coffee pods"</span> operations. 
              Any attempt to brew unauthorized beverages or execute non-tea related commands will be logged and reported to the 
              <span className="text-zinc-300 font-bold"> KuberneTEAS Foundation</span>.
            </p>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="flex-1 bg-black border border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-2xl shadow-green-500/5 relative group">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
          
          {/* Terminal Content */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar relative z-0"
          >
            {logs.map((log) => (
              <div key={log.id} className="flex gap-4 group/line">
                <span className="text-zinc-700 shrink-0 text-[10px] mt-1">[{log.timestamp}]</span>
                <div className={cn(
                  "text-sm break-all leading-relaxed",
                  log.type === 'input' ? "text-white before:content-['>_'] before:text-green-500" : 
                  log.type === 'error' ? "text-red-500 font-bold" : "text-green-500/80"
                )}>
                  {log.text}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex gap-4">
                <span className="text-zinc-700 shrink-0 text-[10px] mt-1">[{new Date().toLocaleTimeString()}]</span>
                <div className="text-sm text-green-500/40 animate-pulse italic">
                  Processing aroma packets...
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form 
            onSubmit={handleCommand}
            className="p-4 bg-zinc-900/30 border-t border-zinc-800 flex items-center gap-3 relative z-20"
          >
            <span className="text-green-500 font-bold">k-sh $</span>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              placeholder="Enter command (e.g. schedule coffee pods --flavor espresso)"
              className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-zinc-700"
              disabled={isProcessing}
            />
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isProcessing ? "bg-yellow-500 animate-pulse" : "bg-green-500"
              )} />
              <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
                {isProcessing ? 'Busy' : 'Ready'}
              </span>
            </div>
          </form>
        </div>

        {/* Quick Commands */}
        <div className="mt-4 flex flex-wrap gap-2">
          <QuickCmd label="schedule coffee pods --flavor espresso" onClick={() => setInput('schedule coffee pods --flavor espresso')} />
          <QuickCmd label="schedule coffee pods --replicas 5" onClick={() => setInput('schedule coffee pods --replicas 5')} />
          <QuickCmd label="k-sh --help" onClick={() => setInput('k-sh --help')} />
          <QuickCmd label="clear" onClick={() => setLogs([])} />
        </div>
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] font-mono text-zinc-600 fixed bottom-0 w-full z-40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>SHELL: CONNECTED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Coffee className="w-3 h-3" />
            <span>RFC 2324 MODE: ENABLED</span>
          </div>
        </div>
        <div>SESSION: {Math.random().toString(36).substring(7).toUpperCase()}</div>
      </footer>
    </div>
  );
};

function QuickCmd({ label, onClick }: { label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] text-zinc-500 hover:text-green-400 hover:border-green-500/30 transition-all font-mono"
    >
      {label}
    </button>
  );
}

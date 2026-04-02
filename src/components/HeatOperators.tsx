import React, { useState, useEffect } from 'react';
import { ArrowLeft, Thermometer, Zap, ShieldAlert, RefreshCw, Activity, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface HeatOperatorsProps {
  onBack: () => void;
}

export const HeatOperators: React.FC<HeatOperatorsProps> = ({ onBack }) => {
  const [temp, setTemp] = useState(82);
  const [isBoiling, setIsBoiling] = useState(false);
  const [reconciling, setReconciling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isBoiling) {
        setTemp(prev => Math.min(100, prev + 0.5));
        if (temp >= 100) setIsBoiling(false);
      } else {
        setTemp(prev => Math.max(20, prev - 0.1));
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isBoiling, temp]);

  const triggerReconciliation = () => {
    setReconciling(true);
    setIsBoiling(true);
    setTimeout(() => setReconciling(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-orange-400 font-sans flex flex-col selection:bg-orange-500/30">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600/20 rounded flex items-center justify-center border border-orange-500/30">
              <Thermometer className="w-5 h-5 text-orange-400" />
            </div>
            <h1 className="font-black tracking-tighter text-lg text-white uppercase">Heat Operators Controller</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-mono">
            <span className="text-zinc-500">STATE:</span>
            <span className={cn(temp > 90 ? "text-red-400" : "text-orange-400")}>
              {temp > 95 ? "CRITICAL_HEAT" : temp > 80 ? "STEEPING_OPTIMAL" : "COOLING_DOWN"}
            </span>
          </div>
          <div className={cn(
            "w-2 h-2 rounded-full",
            temp > 90 ? "bg-red-500 animate-ping" : "bg-orange-500 animate-pulse"
          )} />
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Thermal Visualization */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-12 relative overflow-hidden min-h-[450px] flex flex-col justify-center items-center">
            {/* Heat Waves Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-orange-600/20 to-transparent"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            </div>

            <div className="relative z-10 text-center space-y-4">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Zap className={cn(
                  "w-8 h-8 transition-all duration-500",
                  temp > 90 ? "text-red-500 scale-125" : "text-orange-500"
                )} />
                <h2 className="text-7xl font-black text-white tracking-tighter uppercase tabular-nums">
                  {temp.toFixed(1)} <span className="text-orange-500">°C</span>
                </h2>
              </div>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">Thermal Reconciliation Target: 98.5°C</p>
              
              <div className="pt-8">
                <button 
                  onClick={triggerReconciliation}
                  disabled={reconciling}
                  className={cn(
                    "px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 mx-auto",
                    reconciling ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)]"
                  )}
                >
                  {reconciling ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {reconciling ? "Reconciling State..." : "Trigger Heat Operator"}
                </button>
              </div>
            </div>

            {/* Thermal Progress Bar */}
            <div className="absolute bottom-12 left-12 right-12 h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <motion.div 
                className={cn(
                  "h-full transition-colors duration-500",
                  temp > 90 ? "bg-red-500" : "bg-orange-500"
                )}
                animate={{ width: `${temp}%` }}
              />
            </div>
          </div>

          {/* Operator Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatusCard 
              title="Microwave-Patch-v2"
              status="STANDBY"
              desc="Emergency thermal injection for cold-tea-syndrome."
            />
            <StatusCard 
              title="Kettle-Controller-HPA"
              status="RUNNING"
              desc="Scaling heat-replicas based on aroma-mesh demand."
            />
          </div>
        </div>

        {/* Sidebar: Reconciliation Logs */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Operator Logs</h3>
              <Activity className="w-4 h-4 text-zinc-600" />
            </div>

            <div className="space-y-4 font-mono text-[10px]">
              <LogEntry time="12:30:01" msg="Operator starting thermal reconciliation" />
              <LogEntry time="12:30:05" msg="Applying heat-patch: kettle-01" />
              <LogEntry time="12:30:12" msg="Warning: Steam-pressure exceeding threshold" isWarning />
              <LogEntry time="12:30:45" msg="Target reached: 98.5°C" isSuccess />
              <LogEntry time="12:31:00" msg="Operator entering cooling-loop" />
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <div className="bg-orange-900/10 border border-orange-900/20 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase">
                  <ShieldAlert className="w-3 h-3" />
                  Safety Interlock
                </div>
                <div className="space-y-2">
                  <SafetyCheck label="Water Presence" checked />
                  <SafetyCheck label="Lid Secure" checked />
                  <SafetyCheck label="Coffee Absence" checked />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Thermal Topology</h3>
            <div className="space-y-3">
              <TopologyItem name="kettle-master" temp={temp} />
              <TopologyItem name="mug-node-01" temp={temp - 15} />
              <TopologyItem name="mug-node-02" temp={temp - 22} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] font-mono text-zinc-500 fixed bottom-0 w-full z-40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span>OPERATOR: SYNCED</span>
          </div>
          <span>ENTROPY: 0.042 J/K</span>
        </div>
        <div>© 2026 KuberneTEAS Heat-Operator v2.4.1</div>
      </footer>
    </div>
  );
};

function StatusCard({ title, status, desc }: { title: string, status: string, desc: string }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{title}</div>
        <div className="text-[8px] font-black px-1.5 py-0.5 rounded bg-orange-900/20 text-orange-400 uppercase">{status}</div>
      </div>
      <p className="text-[11px] text-zinc-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function LogEntry({ time, msg, isWarning, isSuccess }: { time: string, msg: string, isWarning?: boolean, isSuccess?: boolean }) {
  return (
    <div className="flex gap-2">
      <span className="text-zinc-700">[{time}]</span>
      <span className={cn(
        isWarning ? "text-yellow-500" : isSuccess ? "text-green-500" : "text-zinc-400"
      )}>{msg}</span>
    </div>
  );
}

function SafetyCheck({ label, checked }: { label: string, checked: boolean }) {
  return (
    <div className="flex items-center justify-between text-[9px] font-mono">
      <span className="text-zinc-500 uppercase">{label}</span>
      <span className={cn(checked ? "text-green-500" : "text-red-500")}>[ {checked ? 'OK' : 'FAIL'} ]</span>
    </div>
  );
}

function TopologyItem({ name, temp }: { name: string, temp: number }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
      <span className="text-[10px] font-mono text-zinc-400">{name}</span>
      <span className={cn(
        "text-[10px] font-mono font-bold",
        temp > 80 ? "text-orange-400" : "text-zinc-600"
      )}>{temp.toFixed(1)}°C</span>
    </div>
  );
}

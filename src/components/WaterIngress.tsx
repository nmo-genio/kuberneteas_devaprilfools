import React, { useState, useEffect } from 'react';
import { ArrowLeft, Droplets, Waves, AlertCircle, Activity, Zap, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface WaterIngressProps {
  onBack: () => void;
}

export const WaterIngress: React.FC<WaterIngressProps> = ({ onBack }) => {
  const [flowRate, setFlowRate] = useState(4.2);
  const [turbidity, setTurbidity] = useState(0.02);
  const [isLeaking, setIsLeaking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowRate(prev => Math.max(0, prev + (Math.random() - 0.5)));
      setTurbidity(prev => Math.max(0, prev + (Math.random() - 0.5) * 0.01));
      if (Math.random() > 0.95) setIsLeaking(true);
      else if (Math.random() > 0.8) setIsLeaking(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-blue-400 font-sans flex flex-col selection:bg-blue-500/30">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center border border-blue-500/30">
              <Droplets className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="font-black tracking-tighter text-lg text-white uppercase">Water Ingress Controller</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-mono">
            <span className="text-zinc-500">SOURCE:</span>
            <span className="text-blue-400">TAP-LOCAL-01</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Main Flow Visualization */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center">
            {/* Animated Water Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-blue-900/20 blur-3xl animate-pulse" />
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-blue-900/10 blur-3xl" />
            </div>

            <Waves className={cn(
              "w-24 h-24 text-blue-500 mb-6 transition-all duration-1000",
              isLeaking ? "text-red-500 animate-bounce" : "animate-wave"
            )} />

            <div className="text-center space-y-2 z-10">
              <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                {flowRate.toFixed(2)} <span className="text-blue-500">L/min</span>
              </h2>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">Current Ingress Velocity</p>
            </div>

            {isLeaking && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-6 right-6 bg-red-900/20 border border-red-500/50 p-4 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div className="text-left">
                  <div className="text-[10px] font-black text-red-400 uppercase">Leak Detected</div>
                  <div className="text-[8px] font-mono text-red-300">Namespace: kitchen-floor</div>
                </div>
              </motion.div>
            )}

            {/* Flow Pipe Parody */}
            <div className="absolute bottom-12 left-12 right-12 h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <motion.div 
                className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricBox 
              label="Turbidity (NTU)" 
              value={turbidity.toFixed(3)} 
              status={turbidity > 0.05 ? 'warning' : 'healthy'} 
              desc="Clarity of the H2O substrate"
            />
            <MetricBox 
              label="Mineral Saturation" 
              value="124ppm" 
              status="healthy" 
              desc="Calcium/Magnesium load"
            />
            <MetricBox 
              label="Chlorine Filter" 
              value="99.9%" 
              status="healthy" 
              desc="Active charcoal health"
            />
          </div>
        </div>

        {/* Sidebar: Ingress Rules */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Ingress Rules</h3>
              <Activity className="w-4 h-4 text-zinc-600" />
            </div>

            <div className="space-y-4">
              <IngressRule 
                host="earl-grey.kettle" 
                path="/fill" 
                backend="tap-01" 
                status="Active"
              />
              <IngressRule 
                host="chamomile.mug" 
                path="/rinse" 
                backend="tap-02" 
                status="Active"
              />
              <IngressRule 
                host="coffee.pot" 
                path="/blocked" 
                backend="null-sink" 
                status="Forbidden"
                isError
              />
            </div>

            <div className="pt-4 border-t border-zinc-800">
              <div className="bg-blue-900/10 border border-blue-900/20 p-4 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase">
                  <Zap className="w-3 h-3" />
                  Auto-Flush Operator
                </div>
                <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                  The Water-Flush-Operator is currently monitoring for stagnant bergamot particles. 
                  Next scheduled purge: <span className="text-blue-300">14:00 UTC</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Water Quality Logs</h3>
            <div className="space-y-2 font-mono text-[9px]">
              <LogLine time="12:10:01" msg="Ingress controller reloaded" />
              <LogLine time="12:15:42" msg="Mineral spike detected in tap-01" />
              <LogLine time="12:20:11" msg="Applying softener-patch-v4" />
              <LogLine time="12:25:00" msg="Turbidity normalized" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] font-mono text-zinc-500 fixed bottom-0 w-full z-40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>INGRESS: OPERATIONAL</span>
          </div>
          <span>PRESSURE: 45 PSI</span>
        </div>
        <div>© 2026 KuberneTEAS Water-Ingress v1.2.0</div>
      </footer>
    </div>
  );
};

function MetricBox({ label, value, status, desc }: { label: string, value: string, status: 'healthy' | 'warning' | 'error', desc: string }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-2">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</div>
      <div className={cn(
        "text-2xl font-black tracking-tight",
        status === 'healthy' ? "text-white" : "text-yellow-400"
      )}>{value}</div>
      <div className="text-[9px] font-mono text-zinc-600">{desc}</div>
    </div>
  );
}

function IngressRule({ host, path, backend, status, isError }: { host: string, path: string, backend: string, status: string, isError?: boolean }) {
  return (
    <div className="bg-black/40 border border-zinc-800/50 rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[11px] font-bold text-zinc-300">{host}</div>
        <div className={cn(
          "text-[8px] font-black px-1.5 py-0.5 rounded uppercase",
          isError ? "bg-red-900/20 text-red-400" : "bg-blue-900/20 text-blue-400"
        )}>{status}</div>
      </div>
      <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-600">
        <span>PATH: {path}</span>
        <span>→</span>
        <span>SVC: {backend}</span>
      </div>
    </div>
  );
}

function LogLine({ time, msg }: { time: string, msg: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-zinc-700">[{time}]</span>
      <span className="text-zinc-400">{msg}</span>
    </div>
  );
}

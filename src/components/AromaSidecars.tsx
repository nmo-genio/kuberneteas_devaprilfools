import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wind, Shield, Zap, Activity, Info, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface AromaSidecarsProps {
  onBack: () => void;
}

export const AromaSidecars: React.FC<AromaSidecarsProps> = ({ onBack }) => {
  const [bergamotLevel, setBergamotLevel] = useState(42);
  const [isInjecting, setIsInjecting] = useState(false);
  const [honeyError, setHoneyError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBergamotLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      if (Math.random() > 0.9) setHoneyError(true);
      else if (Math.random() > 0.7) setHoneyError(false);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerInjection = () => {
    setIsInjecting(true);
    setTimeout(() => setIsInjecting(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-purple-400 font-sans flex flex-col selection:bg-purple-500/30">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600/20 rounded flex items-center justify-center border border-purple-500/30">
              <Wind className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="font-black tracking-tighter text-lg text-white uppercase">Aroma Sidecar Injector</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-mono">
            <span className="text-zinc-500">POLICY:</span>
            <span className="text-purple-400">AUTO-INJECT-AROMA</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
        {/* Aroma Visualization */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-12 relative overflow-hidden min-h-[450px] flex flex-col justify-center items-center">
            {/* Scent Waves Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-purple-900/10"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              />
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <Wind className={cn(
                  "w-12 h-12 transition-all duration-500",
                  isInjecting ? "text-white scale-125 animate-spin" : "text-purple-500"
                )} />
                <h2 className="text-7xl font-black text-white tracking-tighter uppercase tabular-nums">
                  {bergamotLevel.toFixed(1)} <span className="text-purple-500">%</span>
                </h2>
              </div>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.3em]">Bergamot Saturation Index</p>
              
              <div className="pt-8">
                <button 
                  onClick={triggerInjection}
                  disabled={isInjecting}
                  className={cn(
                    "px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 mx-auto",
                    isInjecting ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  )}
                >
                  {isInjecting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {isInjecting ? "Injecting Aroma..." : "Inject Bergamot Sidecar"}
                </button>
              </div>
            </div>

            {/* Sidecar Status Parody */}
            <div className="absolute bottom-12 left-12 right-12 flex justify-between gap-4">
              <SidecarIndicator label="earl-grey-sidecar" status="RUNNING" />
              <SidecarIndicator label="honey-injector" status={honeyError ? "CRASHING" : "RUNNING"} isError={honeyError} />
              <SidecarIndicator label="lemon-zest-proxy" status="PENDING" />
            </div>
          </div>

          {/* Sidecar Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TelemetryCard label="Aroma Latency" value="12.4ms" desc="Scent propagation delay" />
            <TelemetryCard label="Honey Viscosity" value="450cP" desc="Flow resistance index" />
            <TelemetryCard label="Citrus Throughput" value="1.2z/s" desc="Zest packets per second" />
          </div>
        </div>

        {/* Sidebar: Injection Policy */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Injection Policy</h3>
              <Activity className="w-4 h-4 text-zinc-600" />
            </div>

            <div className="space-y-4">
              <div className="bg-black/40 border border-zinc-800/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase">
                  <Shield className="w-3 h-3" />
                  mTLS (Mutual Tea Leaf Security)
                </div>
                <p className="text-[10px] text-zinc-500 font-mono leading-relaxed">
                  Ensuring that only authorized aroma packets can communicate with the kettle-master. 
                  Encryption: <span className="text-purple-300">Camellia-256-GCM</span>.
                </p>
              </div>
              
              <div className="bg-black/40 border border-zinc-800/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-purple-400 uppercase">
                  <Info className="w-3 h-3" />
                  Traffic Splitting
                </div>
                <div className="space-y-2">
                  <TrafficSplit label="Earl Grey" percent={70} color="bg-purple-500" />
                  <TrafficSplit label="English Breakfast" percent={30} color="bg-zinc-700" />
                </div>
              </div>
            </div>

            {honeyError && (
              <div className="bg-red-900/10 border border-red-900/20 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-red-400 uppercase tracking-widest">Honey Crystallization Error</div>
                  <p className="text-[9px] text-red-300 font-mono leading-relaxed">
                    The honey-injector sidecar has crashed due to excessive glucose crystallization. 
                    Manual heat-reconciliation required.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Sidecar Logs</h3>
            <div className="space-y-2 font-mono text-[9px]">
              <div className="flex gap-2"><span className="text-zinc-700">[12:40:01]</span> <span className="text-zinc-400">Injecting aroma-sidecar into mug-node-01</span></div>
              <div className="flex gap-2"><span className="text-zinc-700">[12:40:05]</span> <span className="text-zinc-400">Sidecar ready: bergamot-v1.4</span></div>
              <div className="flex gap-2"><span className="text-zinc-700">[12:40:12]</span> <span className="text-zinc-400">Establishing mTLS with kettle-master</span></div>
              <div className="flex gap-2"><span className="text-zinc-700">[12:40:45]</span> <span className="text-zinc-400">Aroma propagation successful</span></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] font-mono text-zinc-500 fixed bottom-0 w-full z-40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>SIDECARS: 12 INJECTED</span>
          </div>
          <span>AROMA: STABLE</span>
        </div>
        <div>© 2026 KuberneTEAS Aroma-Mesh v1.0.0</div>
      </footer>
    </div>
  );
};

function TelemetryCard({ label, value, desc }: { label: string, value: string, desc: string }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 space-y-2">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</div>
      <div className="text-2xl font-black text-white tracking-tight">{value}</div>
      <div className="text-[9px] font-mono text-zinc-600">{desc}</div>
    </div>
  );
}

function SidecarIndicator({ label, status, isError }: { label: string, status: string, isError?: boolean }) {
  return (
    <div className="flex-1 bg-black/40 border border-zinc-800 p-3 rounded-xl space-y-1">
      <div className="text-[9px] font-black text-zinc-500 uppercase truncate">{label}</div>
      <div className={cn(
        "text-[10px] font-bold",
        isError ? "text-red-500" : status === 'PENDING' ? "text-yellow-500" : "text-purple-400"
      )}>{status}</div>
    </div>
  );
}

function TrafficSplit({ label, percent, color }: { label: string, percent: number, color: string }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] font-mono">
        <span className="text-zinc-400">{label}</span>
        <span className="text-zinc-300">{percent}%</span>
      </div>
      <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className={cn("h-full", color)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

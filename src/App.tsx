/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Terminal, 
  Activity, 
  Cpu, 
  Layers, 
  Coffee, 
  Thermometer, 
  Droplets, 
  Wind, 
  Zap, 
  Search, 
  Bell, 
  Settings,
  Database,
  Server,
  Cloud,
  RefreshCw,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { MetricCard } from './components/MetricCard';
import { LogStream } from './components/LogStream';
import { AlertPanel } from './components/AlertPanel';
import { TeapotError } from './components/TeapotError';
import { Runbook } from './components/Runbook';
import { PromTeaus } from './components/PromTeaus';
import { PodTopology } from './components/PodTopology';
import { ServiceMesh } from './components/ServiceMesh';
import { KettleShell } from './components/KettleShell';
import { WaterIngress } from './components/WaterIngress';
import { HeatOperators } from './components/HeatOperators';
import { AromaSidecars } from './components/AromaSidecars';
import { cn } from './lib/utils';

// Initialize Gemini API (Placeholder for user to connect)
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'runbook' | 'prom-teaus' | 'pod-topology' | 'service-mesh' | 'kettle-shell' | 'water-ingress' | 'heat-operators' | 'aroma-sidecars'>('dashboard');
  const [isTeapotErrorOpen, setIsTeapotErrorOpen] = useState(false);
  const [isSteaming, setIsSteaming] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [teaReplicas, setTeaReplicas] = useState(3);
  const [metrics, setMetrics] = useState({
    p99: 300,
    opacity: 68,
    bergamot: 42,
  });

  // Mock metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        p99: Math.floor(280 + Math.random() * 40 + (Math.random() > 0.9 ? 150 : 0)),
        opacity: Math.floor(65 + Math.random() * 10),
        bergamot: Math.floor(40 + Math.random() * 5),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [history, setHistory] = useState<{ p99: any[], opacity: any[], bergamot: any[] }>({
    p99: Array.from({ length: 20 }, (_, i) => ({ val: 300 })),
    opacity: Array.from({ length: 20 }, (_, i) => ({ val: 68 })),
    bergamot: Array.from({ length: 20 }, (_, i) => ({ val: 42 })),
  });

  useEffect(() => {
    setHistory(prev => ({
      p99: [...prev.p99.slice(1), { val: metrics.p99 }],
      opacity: [...prev.opacity.slice(1), { val: metrics.opacity }],
      bergamot: [...prev.bergamot.slice(1), { val: metrics.bergamot }],
    }));
  }, [metrics]);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    
    try {
      // Placeholder for real Gemini call
      // In a real scenario, we'd prompt: "Generate a nonsensical SRE root cause analysis for a cup of tea."
      const prompt = "Generate a short, nonsensical, highly technical SRE root cause analysis for a cup of tea. Mention things like 'quantum entanglement with sugar cubes', 'non-deterministic bergamot levels', and 'node re-steeping'.";
      
      const model = "gemini-3-flash-preview";
      const response = await genAI.models.generateContent({
        model,
        contents: prompt,
      });
      
      setAiAnalysis(response.text || "Analysis failed: Tea leaves are too blurry to read.");
    } catch (error) {
      // Fallback humor if API fails or key is missing
      setAiAnalysis("After examining the tea-dust logs, I have determined with 94% confidence that the chamomile node is experiencing quantum entanglement with the sugar cube, causing non-deterministic sugar levels. Recommendation: Re-steep node with higher 'love' toleration.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const scaleTea = () => {
    setTeaReplicas(prev => prev + 1);
    setIsSteaming(true);
    
    // Play a tiny "boil" sound (simulated with a short beep if no asset, but we'll use a synth-like effect)
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log("Audio context blocked or unavailable");
    }

    setTimeout(() => setIsSteaming(false), 2000);
  };

  return (
    <div className={cn(
      "min-h-screen bg-[#0d0d0d] text-zinc-300 font-sans selection:bg-green-500/30 transition-all duration-1000",
      isSteaming && "blur-[2px] brightness-110"
    )}>
      <AnimatePresence mode="wait">
        {currentView === 'dashboard' ? (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top Bar */}
            <header className="h-14 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-4 justify-between sticky top-0 z-40 backdrop-blur-md">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="bg-green-600 p-1.5 rounded-md">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="font-black tracking-tighter text-lg text-white uppercase">KuberneTEAS</h1>
                </div>
                
                <div className="hidden md:flex items-center gap-4 text-[11px] font-mono">
                  <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700">
                    <span className="text-zinc-500">CONTEXT:</span>
                    <span className="text-green-400">ceramic-mug-us-west-1a</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700">
                    <span className="text-zinc-500">STATUS:</span>
                    <span className="text-blue-400 animate-pulse">STEEPING (HPA Active)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative hidden lg:block">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search pods, mugs, kettles..." 
                    className="bg-zinc-800 border border-zinc-700 rounded-md pl-9 pr-4 py-1.5 text-xs focus:outline-none focus:border-green-500 transition-colors w-64"
                  />
                </div>
                <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-900" />
                </button>
                <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 border border-white/10" />
              </div>
            </header>

            <main className="p-4 lg:p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
              
        {/* Left Sidebar - Navigation Parody */}
        <nav className="col-span-12 lg:col-span-2 space-y-1">
          <NavItem 
            icon={<Activity className="w-4 h-4" />} 
            label="Dashboards" 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
          />
          <NavItem 
            icon={<Database className="w-4 h-4" />} 
            label="Prom-TEA-us" 
            active={currentView === 'prom-teaus'}
            onClick={() => setCurrentView('prom-teaus')}
          />
            <NavItem 
              icon={<Server className="w-4 h-4" />} 
              label="Pod Topology" 
              active={currentView === 'pod-topology'}
              onClick={() => setCurrentView('pod-topology')}
            />
            <NavItem 
              icon={<Cloud className="w-4 h-4" />} 
              label="Service Mesh" 
              active={currentView === 'service-mesh'}
              onClick={() => setCurrentView('service-mesh')}
            />
            <NavItem 
              icon={<Terminal className="w-4 h-4" />} 
              label="Kettle Shell" 
              active={currentView === 'kettle-shell'}
              onClick={() => setCurrentView('kettle-shell')}
            />
          
          <div className="pt-8 pb-2 px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Infrastructure</div>
          <NavItem 
            icon={<Droplets className="w-4 h-4" />} 
            label="Water Ingress" 
            active={currentView === 'water-ingress'}
            onClick={() => setCurrentView('water-ingress')}
          />
          <NavItem 
            icon={<Thermometer className="w-4 h-4" />} 
            label="Heat Operators" 
            active={currentView === 'heat-operators'}
            onClick={() => setCurrentView('heat-operators')}
          />
          <NavItem 
            icon={<Wind className="w-4 h-4" />} 
            label="Aroma Sidecars" 
            active={currentView === 'aroma-sidecars'}
            onClick={() => setCurrentView('aroma-sidecars')}
          />
        </nav>

              {/* Main Dashboard Area */}
              <div className="col-span-12 lg:col-span-10 space-y-6">
                
                {/* Top Row: Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard 
                    title="Steep_time_p99" 
                    value={metrics.p99} 
                    unit="ms" 
                    data={history.p99}
                    color="#3b82f6"
                    description="Latency of leaf saturation"
                  />
                  <MetricCard 
                    title="Water_Opacity" 
                    value={metrics.opacity} 
                    unit="%" 
                    data={history.opacity}
                    color="#10b981"
                    description="Turbidity of the infusion"
                  />
                  <MetricCard 
                    title="Bergamot_Saturation" 
                    value={metrics.bergamot} 
                    unit="%" 
                    data={history.bergamot}
                    color="#f59e0b"
                    description="Earl Grey specific metric"
                  />
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">Pod Health</h3>
                  <div className="flex items-center gap-3 group relative">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-900/50 border border-green-500/50 flex items-center justify-center text-xs">🍵</div>
                      <div className="w-8 h-8 rounded-full bg-green-900/50 border border-green-500/50 flex items-center justify-center text-xs">🍵</div>
                    </div>
                    <span className="text-sm font-mono font-bold text-green-400">Chai Pods: 2/2 Running</span>
                    
                    {/* Taint Tooltip */}
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50">
                      <div className="bg-zinc-800 border border-zinc-700 p-2 rounded text-[10px] font-mono text-zinc-300 shadow-xl whitespace-nowrap">
                        <p className="text-red-400 font-bold mb-1">Taints Detected:</p>
                        <p>effect: NoSchedule</p>
                        <p>key: coffee-smell</p>
                      </div>
                    </div>
                  </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-zinc-800">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <span>UPTIME: 4h 12m</span>
                        <span className="text-green-500">HEALTHY</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Row: HPA & Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* HPA Panel */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-blue-400" />
                        <h3 className="font-bold text-sm uppercase tracking-tight">Kettle-HPA-v1</h3>
                      </div>
                      <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">SCALING ACTIVE</span>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="flex justify-between items-end">
                        <span className="text-xs text-zinc-500">Current Replicas</span>
                        <span className="text-3xl font-black text-white">{teaReplicas}</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500"
                          initial={{ width: "30%" }}
                          animate={{ width: `${(teaReplicas / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-zinc-500 italic">Target CPU (Caffeine Processing Unit) Utilization: 70%</p>
                    </div>

                    <button 
                      onClick={scaleTea}
                      className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Scale Tea Replicas
                    </button>
                  </div>

                  {/* Alert Panel */}
                  <div className="lg:col-span-2">
                    <AlertPanel onOpenRunbook={() => setCurrentView('runbook')} />
                  </div>
                </div>

                {/* Bottom Row: Logs & AI Chaos */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[500px]">
                  
                  {/* Log Stream */}
                  <div className="lg:col-span-8 h-full min-h-0">
                    <LogStream />
                  </div>

                  {/* AI Chaos & Coffee Trigger */}
                  <div className="lg:col-span-4 flex flex-col gap-6 h-full min-h-0">
                    
                    {/* AI Root Cause Analysis */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 flex-1 flex flex-col min-h-0">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 text-purple-400" />
                        <h3 className="font-bold text-sm uppercase tracking-tight">AI Root Cause Analysis</h3>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto mb-4 min-h-0">
                        <AnimatePresence mode="wait">
                          {isAnalyzing ? (
                            <motion.div 
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex flex-col items-center justify-center h-full gap-3"
                            >
                              <RefreshCw className="w-6 h-6 text-purple-500 animate-spin" />
                              <span className="text-[10px] font-mono text-zinc-500 animate-pulse">CONSULTING TEA LEAVES...</span>
                            </motion.div>
                          ) : aiAnalysis ? (
                            <motion.div 
                              key="result"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-xs font-mono text-purple-300 leading-relaxed italic"
                            >
                              "{aiAnalysis}"
                            </motion.div>
                          ) : (
                            <div className="flex items-center justify-center h-full text-zinc-600 text-[10px] font-mono text-center px-4">
                              System stable. No anomalies detected in the tea-dust logs.
                            </div>
                          )}
                        </AnimatePresence>
                      </div>

                      <button 
                        onClick={runAIAnalysis}
                        disabled={isAnalyzing}
                        className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/50 rounded-md font-bold text-xs transition-all disabled:opacity-50 shrink-0"
                      >
                        Run Gemini RCA
                      </button>
                    </div>

                    {/* The Dangerous Coffee Button */}
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 flex-1 flex flex-col justify-center items-center text-center relative overflow-hidden group min-h-0">
                      <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="bg-zinc-800 p-3 rounded-full mb-4 border border-zinc-700">
                        <Coffee className="w-8 h-8 text-zinc-500 group-hover:text-red-500 transition-colors" />
                      </div>
                      <h3 className="font-bold text-sm mb-2">Legacy Infrastructure</h3>
                      <p className="text-[10px] text-zinc-500 mb-6 px-4">Warning: Attempting to schedule coffee pods on this cluster violates RFC 2324.</p>
                      
                      <button 
                        onClick={() => setIsTeapotErrorOpen(true)}
                        className="px-6 py-2 bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-400 border border-zinc-700 rounded-md font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95"
                      >
                        DEPLOY COFFEE.EXE
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </main>

            {/* Footer / Status Bar */}
            <footer className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] font-mono text-zinc-500 fixed bottom-0 w-full z-40 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>CLUSTER: TEA-PROD-01</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3" />
                  <span>CPU: 12%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Database className="w-3 h-3" />
                  <span>MEM: 256MB / 1GB</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span>v1.4.18-teapot</span>
                <span className="text-zinc-600">|</span>
                <span>© 2026 KuberneTEAS Foundation</span>
              </div>
            </footer>
          </motion.div>
        ) : currentView === 'runbook' ? (
          <motion.div 
            key="runbook"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Runbook onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : currentView === 'prom-teaus' ? (
          <motion.div 
            key="prom-teaus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PromTeaus onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : currentView === 'pod-topology' ? (
          <motion.div 
            key="pod-topology"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PodTopology onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : currentView === 'service-mesh' ? (
          <motion.div 
            key="service-mesh"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ServiceMesh onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : currentView === 'kettle-shell' ? (
          <motion.div 
            key="kettle-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <KettleShell onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : currentView === 'water-ingress' ? (
          <motion.div 
            key="water-ingress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WaterIngress onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : currentView === 'heat-operators' ? (
          <motion.div 
            key="heat-operators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeatOperators onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        ) : (
          <motion.div 
            key="aroma-sidecars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AromaSidecars onBack={() => setCurrentView('dashboard')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* RFC 2324 Modal */}
      <TeapotError 
        isOpen={isTeapotErrorOpen} 
        onClose={() => setIsTeapotErrorOpen(false)} 
      />
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all",
        active 
          ? "bg-green-600/10 text-green-400 border border-green-600/20" 
          : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

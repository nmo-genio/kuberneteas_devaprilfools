import React, { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Shield, Zap, Activity, Filter, RefreshCw, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface ServiceMeshProps {
  onBack: () => void;
}

interface ServiceNode {
  id: string;
  name: string;
  type: 'kettle' | 'mug' | 'infuser' | 'honey-pot';
  status: 'healthy' | 'degraded' | 'critical';
  mtls: boolean;
  traffic: number; // requests per second
  errorRate: number; // percentage
}

const MOCK_SERVICES: ServiceNode[] = [
  { id: 's1', name: 'earl-grey-kettle', type: 'kettle', status: 'healthy', mtls: true, traffic: 42.5, errorRate: 0.01 },
  { id: 's2', name: 'chamomile-infuser', type: 'infuser', status: 'healthy', mtls: true, traffic: 12.2, errorRate: 0.05 },
  { id: 's3', name: 'office-mug-01', type: 'mug', status: 'healthy', mtls: true, traffic: 8.4, errorRate: 0.0 },
  { id: 's4', name: 'office-mug-02', type: 'mug', status: 'degraded', mtls: false, traffic: 15.1, errorRate: 12.4 },
  { id: 's5', name: 'honey-pot-service', type: 'honey-pot', status: 'critical', mtls: true, traffic: 2.1, errorRate: 98.2 },
];

export const ServiceMesh: React.FC<ServiceMeshProps> = ({ onBack }) => {
  const [selectedService, setSelectedService] = useState<ServiceNode | null>(null);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600/20 rounded flex items-center justify-center border border-purple-500/30">
              <Share2 className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="font-black tracking-tighter text-lg text-white uppercase">Aroma-Mesh Control Plane</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700 text-[10px] font-mono">
            <Shield className="w-3 h-3 text-green-400" />
            <span className="text-zinc-500">mTLS:</span>
            <span className="text-green-400">ENFORCED</span>
          </div>
          <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full overflow-hidden">
        {/* Left Panel: Service List */}
        <div className="col-span-12 lg:col-span-4 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-widest">Active Services</h2>
            <Filter className="w-3 h-3 text-zinc-600" />
          </div>
          
          {MOCK_SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all group relative overflow-hidden",
                selectedService?.id === service.id 
                  ? "bg-purple-600/10 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    service.status === 'healthy' ? "bg-green-500" : 
                    service.status === 'degraded' ? "bg-yellow-500" : "bg-red-500 animate-pulse"
                  )} />
                  <span className="text-sm font-bold text-zinc-200 group-hover:text-white">{service.name}</span>
                </div>
                {service.mtls && <Shield className="w-3 h-3 text-green-500/50" />}
              </div>
              <div className="grid grid-cols-2 gap-4 text-[10px] font-mono text-zinc-500">
                <div>
                  <span className="block text-zinc-600 uppercase text-[8px] mb-0.5">Traffic</span>
                  <span className="text-zinc-300">{service.traffic} rps</span>
                </div>
                <div>
                  <span className="block text-zinc-600 uppercase text-[8px] mb-0.5">Error Rate</span>
                  <span className={cn(service.errorRate > 5 ? "text-red-400" : "text-zinc-300")}>
                    {service.errorRate}%
                  </span>
                </div>
              </div>
              {selectedService?.id === service.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Right Panel: Visualization & Details */}
        <div className="col-span-12 lg:col-span-8 space-y-6 flex flex-col min-h-0">
          {/* Mesh Visualization Parody */}
          <div className="flex-1 bg-zinc-900/30 border border-zinc-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-purple-900/30 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-900/30 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-purple-900/30 rounded-full" />
              {/* Grid lines */}
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #27272a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Mock Nodes in Mesh */}
            <div className="relative w-full h-full">
              {/* Connections (Static SVG Lines) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                <line x1="50%" y1="20%" x2="30%" y2="50%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="50%" y1="20%" x2="70%" y2="50%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="30%" y1="50%" x2="40%" y2="80%" stroke="#a855f7" strokeWidth="1" />
                <line x1="70%" y1="50%" x2="60%" y2="80%" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
              </svg>

              {/* Node Components */}
              <MeshNode x="50%" y="20%" label="Ingress-Gate-Tea" status="healthy" />
              <MeshNode x="30%" y="50%" label="Earl-Grey-Service" status="healthy" />
              <MeshNode x="70%" y="50%" label="Honey-Pot-Service" status="critical" />
              <MeshNode x="40%" y="80%" label="Mug-01-Sidecar" status="healthy" />
              <MeshNode x="60%" y="80%" label="Mug-02-Sidecar" status="degraded" />
            </div>

            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
              <div className="bg-black/60 backdrop-blur-md border border-zinc-800 p-4 rounded-xl space-y-2">
                <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Mesh Health</div>
                <div className="flex items-center gap-4">
                  <div className="space-y-1">
                    <div className="text-[8px] text-zinc-500 uppercase">Aroma Latency</div>
                    <div className="text-sm font-mono text-white">12.4ms</div>
                  </div>
                  <div className="w-px h-8 bg-zinc-800" />
                  <div className="space-y-1">
                    <div className="text-[8px] text-zinc-500 uppercase">Sugar Retries</div>
                    <div className="text-sm font-mono text-white">0.2%</div>
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-zinc-600 bg-black/40 px-3 py-1 rounded-full border border-zinc-800">
                PROTOCOL: HTCPCP/1.1 (Mutual-Tea-Saturation)
              </div>
            </div>
          </div>

          {/* Service Details Parody */}
          <AnimatePresence mode="wait">
            {selectedService ? (
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center border border-purple-500/30">
                      <Activity className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">{selectedService.name}</h3>
                      <p className="text-xs text-zinc-500 font-mono">Service Type: {selectedService.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors">View Traces</button>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-purple-500 transition-colors">Edit Policy</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <DetailCard 
                    icon={<Zap className="w-4 h-4 text-yellow-400" />}
                    label="Bergamot Throughput"
                    value="1.2kg/min"
                    desc="Saturation velocity"
                  />
                  <DetailCard 
                    icon={<Shield className="w-4 h-4 text-blue-400" />}
                    label="mTLS Status"
                    value={selectedService.mtls ? "ENCRYPTED" : "PLAINTEXT"}
                    desc="Tea leaf isolation"
                  />
                  <DetailCard 
                    icon={<AlertCircle className="w-4 h-4 text-red-400" />}
                    label="Sidecar Health"
                    value={selectedService.status === 'critical' ? "CRASHING" : "HEALTHY"}
                    desc="Honey-Injector status"
                  />
                </div>

                {selectedService.status === 'critical' && (
                  <div className="bg-red-900/10 border border-red-900/20 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-red-400 uppercase">Critical Anomaly Detected</div>
                      <p className="text-[10px] text-red-300 font-mono leading-relaxed">
                        The honey-pot-service sidecar is experiencing a recursive crystallization loop. 
                        Bergamot packets are being dropped at the ingress gateway. 
                        Recommendation: Apply heat-operator-v2 or re-steep the entire namespace.
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="bg-zinc-900/20 border border-dashed border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                <Info className="w-8 h-8 text-zinc-700" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">No Service Selected</h3>
                  <p className="text-xs text-zinc-600 font-mono">Select a service from the sidebar to inspect its aroma-mesh telemetry.</p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] font-mono text-zinc-500 fixed bottom-0 w-full z-40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>MESH: OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Share2 className="w-3 h-3" />
            <span>SIDECARS: 12 INJECTED</span>
          </div>
        </div>
        <div>© 2026 KuberneTEAS Aroma-Mesh v1.0.0</div>
      </footer>
    </div>
  );
};

function MeshNode({ x, y, label, status }: { x: string, y: string, label: string, status: 'healthy' | 'degraded' | 'critical' }) {
  return (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      style={{ left: x, top: y }}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all group-hover:scale-110 shadow-lg",
        status === 'healthy' ? "bg-green-900/20 border-green-500/50 text-green-400" :
        status === 'degraded' ? "bg-yellow-900/20 border-yellow-500/50 text-yellow-400" :
        "bg-red-900/20 border-red-500/50 text-red-400 animate-pulse"
      )}>
        <Zap className="w-5 h-5" />
      </div>
      <div className="bg-black/80 backdrop-blur-sm border border-zinc-800 px-2 py-0.5 rounded text-[8px] font-mono text-zinc-300 uppercase tracking-tighter whitespace-nowrap">
        {label}
      </div>
    </motion.div>
  );
}

function DetailCard({ icon, label, value, desc }: { icon: React.ReactNode, label: string, value: string, desc: string }) {
  return (
    <div className="bg-black/40 border border-zinc-800/50 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
        {icon}
        {label}
      </div>
      <div className="text-xl font-black text-white tracking-tight">{value}</div>
      <div className="text-[9px] font-mono text-zinc-600">{desc}</div>
    </div>
  );
}

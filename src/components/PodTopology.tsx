import React from 'react';
import { ArrowLeft, Server, Cpu, Database, Shield, Zap, Info, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface PodTopologyProps {
  onBack: () => void;
}

interface Pod {
  id: string;
  name: string;
  status: 'Running' | 'Steeping' | 'Pending' | 'Failed' | 'CrashLoopBackOff';
  restarts: number;
  age: string;
  flavor: string;
}

interface Node {
  id: string;
  name: string;
  cpu: string;
  mem: string;
  pods: Pod[];
  taints?: string[];
}

const MOCK_NODES: Node[] = [
  {
    id: 'node-1',
    name: 'kitchen-counter-us-west-1a',
    cpu: '12%',
    mem: '45%',
    taints: ['key: coffee-smell, effect: NoSchedule'],
    pods: [
      { id: 'p1', name: 'earl-grey-7f8d9b-x1', status: 'Running', restarts: 0, age: '4h', flavor: 'Earl Grey' },
      { id: 'p2', name: 'earl-grey-7f8d9b-x2', status: 'Steeping', restarts: 1, age: '2h', flavor: 'Earl Grey' },
      { id: 'p3', name: 'honey-injector-sidecar', status: 'CrashLoopBackOff', restarts: 42, age: '12m', flavor: 'Wildflower' },
    ]
  },
  {
    id: 'node-2',
    name: 'office-desk-us-west-1b',
    cpu: '85%',
    mem: '92%',
    pods: [
      { id: 'p4', name: 'chamomile-v2-1a2b3c', status: 'Running', restarts: 0, age: '6h', flavor: 'Chamomile' },
      { id: 'p5', name: 'oolong-canary-deploy', status: 'Pending', restarts: 0, age: '1m', flavor: 'Oolong' },
    ]
  },
  {
    id: 'node-3',
    name: 'nightstand-edge-01',
    cpu: '2%',
    mem: '10%',
    pods: [
      { id: 'p6', name: 'sleepy-time-cronjob', status: 'Running', restarts: 0, age: '8h', flavor: 'Valerian' },
    ]
  }
];

export const PodTopology: React.FC<PodTopologyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 font-sans flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 flex items-center px-6 justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center border border-blue-500/30">
              <Server className="w-5 h-5 text-blue-400" />
            </div>
            <h1 className="font-black tracking-tighter text-lg text-white uppercase">Pod Topology</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700">
            <span className="text-zinc-500">CLUSTER:</span>
            <span className="text-green-400">TEA-PROD-01</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-800 rounded border border-zinc-700">
            <span className="text-zinc-500">REGION:</span>
            <span className="text-blue-400">KITCHEN-US-WEST</span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Cluster Visualization</h2>
            <p className="text-zinc-500 text-xs font-mono">Mapping the physical distribution of tea leaves across the enterprise.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-colors">Refresh Topology</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors">Rebalance Entropy</button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg text-[10px] font-mono uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            <span>Running / Steeping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Pending / Scaling</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span>Failed / Crystallized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-600" />
            <span>Tainted Node</span>
          </div>
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {MOCK_NODES.map((node, idx) => (
            <motion.div 
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "bg-zinc-900/50 border rounded-xl overflow-hidden flex flex-col",
                node.taints ? "border-zinc-700/50 grayscale-[0.5]" : "border-zinc-800 shadow-xl shadow-black/20"
              )}
            >
              {/* Node Header */}
              <div className="p-4 bg-zinc-800/50 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center border",
                    node.taints ? "bg-zinc-800 border-zinc-700 text-zinc-500" : "bg-blue-600/10 border-blue-500/30 text-blue-400"
                  )}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white uppercase tracking-tight">{node.name}</div>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase">Architecture: Ceramic/v8</div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-zinc-600">CPU</span>
                    <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: node.cpu }} />
                    </div>
                    <span className="text-blue-400 w-8">{node.cpu}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="text-zinc-600">MEM</span>
                    <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: node.mem }} />
                    </div>
                    <span className="text-green-400 w-8">{node.mem}</span>
                  </div>
                </div>
              </div>

              {/* Node Taints */}
              {node.taints && (
                <div className="px-4 py-2 bg-red-900/10 border-b border-red-900/20 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-red-500" />
                  <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest">Taint: {node.taints[0]}</span>
                </div>
              )}

              {/* Pods List */}
              <div className="p-4 flex-1 space-y-3">
                <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Allocated Pods ({node.pods.length})</div>
                {node.pods.map(pod => (
                  <div key={pod.id} className="bg-black/40 border border-zinc-800/50 rounded-lg p-3 flex items-center justify-between group hover:border-zinc-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        pod.status === 'Running' || pod.status === 'Steeping' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.3)]" : 
                        pod.status === 'Pending' ? "bg-yellow-500" : "bg-red-500 animate-pulse"
                      )} />
                      <div>
                        <div className="text-[11px] font-bold text-zinc-300 group-hover:text-white transition-colors">{pod.name}</div>
                        <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-600">
                          <span>{pod.flavor}</span>
                          <span>•</span>
                          <span>{pod.age}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={cn(
                        "text-[9px] font-bold uppercase tracking-widest",
                        pod.status === 'CrashLoopBackOff' ? "text-red-500" : "text-zinc-500"
                      )}>{pod.status}</div>
                      <div className="text-[8px] font-mono text-zinc-700">Restarts: {pod.restarts}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Node Footer */}
              <div className="p-3 bg-zinc-900/80 border-t border-zinc-800 flex justify-between items-center">
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded bg-zinc-800 flex items-center justify-center"><Shield className="w-2 h-2 text-zinc-500" /></div>
                  <div className="w-4 h-4 rounded bg-zinc-800 flex items-center justify-center"><Database className="w-2 h-2 text-zinc-500" /></div>
                  <div className="w-4 h-4 rounded bg-zinc-800 flex items-center justify-center"><Cpu className="w-2 h-2 text-zinc-500" /></div>
                </div>
                <button className="text-[9px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest flex items-center gap-1">
                  <Info className="w-3 h-3" /> Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Topology Map Parody */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-zinc-700 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-zinc-700 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-zinc-700 rounded-full" />
          </div>
          
          <div className="z-10 text-center space-y-4">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30 mx-auto animate-pulse">
              <Database className="w-8 h-8 text-blue-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">Core Tea-Mesh</h3>
              <p className="text-zinc-500 text-xs font-mono max-w-md">Visualizing the inter-mug communication protocol (IMCP) and aroma-propagation paths.</p>
            </div>
            <div className="pt-4 flex gap-4 justify-center">
              <div className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded text-[9px] font-mono text-zinc-400">LATENCY: 42ms (Bergamot-to-Mug)</div>
              <div className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded text-[9px] font-mono text-zinc-400">THROUGHPUT: 1.2 Cups/sec</div>
            </div>
          </div>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="h-8 border-t border-zinc-800 bg-zinc-900/80 flex items-center px-4 justify-between text-[10px] font-mono text-zinc-500 fixed bottom-0 w-full z-40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>TOPOLOGY: SYNCED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            <span>NODES: 3 ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>v1.4.18-teapot</span>
          <span className="text-zinc-600">|</span>
          <span>© 2026 KuberneTEAS Foundation</span>
        </div>
      </footer>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Play, AlertCircle, CheckCircle2, XCircle, Info } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { cn } from '../lib/utils';

interface PromTeausProps {
  onBack: () => void;
}

const MOCK_METRICS = [
  "tea_saturation_ratio",
  "kettle_boil_velocity_deg_per_sec",
  "mug_heat_dissipation_joules",
  "bergamot_aroma_particles_ppm",
  "caffeine_jitter_index_p99",
  "sugar_dissolution_latency_ms",
  "tannin_bitterness_coefficient",
];

export const PromTeaus: React.FC<PromTeausProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'Graph' | 'Alerts' | 'Status' | 'Help'>('Graph');
  const [subTab, setSubTab] = useState<'Graph' | 'Table'>('Graph');
  const [query, setQuery] = useState('sum(irate(tea_consumption_total[5m])) by (flavor)');
  const [graphData, setGraphData] = useState<any[]>([]);

  useEffect(() => {
    const data = Array.from({ length: 30 }, (_, i) => ({
      time: i,
      earl_grey: Math.floor(Math.random() * 40 + 20),
      chamomile: Math.floor(Math.random() * 20 + 10),
      oolong: Math.floor(Math.random() * 60 + 30),
    }));
    setGraphData(data);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Graph':
        return (
          <div className="space-y-6">
            {/* Expression Bar */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase text-zinc-500">Expression</span>
                <Info className="w-3 h-3 text-zinc-600" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 font-mono text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 font-mono">
                    [Shift + Enter]
                  </div>
                </div>
                <button className="bg-[#337ab7] hover:bg-[#286090] text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-colors">
                  <Play className="w-4 h-4 fill-current" /> Execute
                </button>
              </div>
            </div>

            {/* Graph/Table Area */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm overflow-hidden">
              <div className="bg-zinc-800/50 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
                <div className="flex gap-4 text-xs font-bold text-zinc-400 uppercase">
                  <button 
                    onClick={() => setSubTab('Graph')}
                    className={cn(subTab === 'Graph' ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "hover:text-blue-400")}
                  >
                    Graph
                  </button>
                  <button 
                    onClick={() => setSubTab('Table')}
                    className={cn(subTab === 'Table' ? "text-blue-400 border-b-2 border-blue-400 pb-1" : "hover:text-blue-400")}
                  >
                    Table
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-xs text-zinc-300 hover:bg-zinc-700">1h</button>
                  <button className="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-xs text-zinc-300 hover:bg-zinc-700">Stacked</button>
                </div>
              </div>
              
              {subTab === 'Graph' ? (
                <>
                  <div className="p-6 h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                        <XAxis dataKey="time" hide />
                        <YAxis stroke="#666" fontSize={12} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', fontSize: '12px', color: '#ccc' }}
                          itemStyle={{ padding: '2px 0' }}
                        />
                        <Line type="monotone" dataKey="earl_grey" stroke="#e6522c" strokeWidth={2} dot={false} name="flavor='earl_grey'" />
                        <Line type="monotone" dataKey="chamomile" stroke="#337ab7" strokeWidth={2} dot={false} name="flavor='chamomile'" />
                        <Line type="monotone" dataKey="oolong" stroke="#5cb85c" strokeWidth={2} dot={false} name="flavor='oolong'" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-zinc-950/50 border-t border-zinc-800 p-4 font-mono text-[11px] space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#e6522c]" />
                      <span className="text-zinc-400">{"{flavor=\"earl_grey\", instance=\"kettle-01\", job=\"tea-orchestrator\"}"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <div className="w-3 h-3 bg-[#337ab7]" />
                      <span>{"{flavor=\"chamomile\", instance=\"kettle-02\", job=\"tea-orchestrator\"}"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <div className="w-3 h-3 bg-[#5cb85c]" />
                      <span>{"{flavor=\"oolong\", instance=\"kettle-01\", job=\"tea-orchestrator\"}"}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-xs font-mono border-collapse">
                    <thead>
                      <tr className="bg-zinc-800/50 border-b border-zinc-800 text-left text-zinc-400">
                        <th className="p-2 border-r border-zinc-800">Element</th>
                        <th className="p-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-zinc-800 text-zinc-300">
                        <td className="p-2 border-r border-zinc-800">{"{flavor=\"earl_grey\", instance=\"kettle-01\"}"}</td>
                        <td className="p-2 text-blue-400 font-bold">{graphData[graphData.length - 1]?.earl_grey}</td>
                      </tr>
                      <tr className="border-b border-zinc-800 text-zinc-300">
                        <td className="p-2 border-r border-zinc-800">{"{flavor=\"chamomile\", instance=\"kettle-02\"}"}</td>
                        <td className="p-2 text-blue-400 font-bold">{graphData[graphData.length - 1]?.chamomile}</td>
                      </tr>
                      <tr className="border-b border-zinc-800 text-zinc-300">
                        <td className="p-2 border-r border-zinc-800">{"{flavor=\"oolong\", instance=\"kettle-01\"}"}</td>
                        <td className="p-2 text-blue-400 font-bold">{graphData[graphData.length - 1]?.oolong}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Targets & Alerts Parody */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm">
                <div className="bg-zinc-800/50 border-b border-zinc-800 px-4 py-2 font-bold text-sm text-zinc-300">
                  Scrape Targets (2/3 UP)
                </div>
                <div className="p-4 space-y-3">
                  <TargetItem name="kettle-exporter:9100" status="UP" lastScrape="2.4s ago" />
                  <TargetItem name="honey-pot-metrics:9101" status="DOWN" lastScrape="45m ago" error="Crystallization Error" />
                  <TargetItem name="sugar-cube-node:9102" status="UP" lastScrape="1.1s ago" />
                </div>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm">
                <div className="bg-zinc-800/50 border-b border-zinc-800 px-4 py-2 font-bold text-sm text-zinc-300">
                  Active Alerts (1 Firing)
                </div>
                <div className="p-4 space-y-3">
                  <AlertItem name="TeaIsCold" status="FIRING" severity="critical" summary="Water temperature dropped below 80°C" />
                  <AlertItem name="TooMuchSugar" status="PENDING" severity="warning" summary="Glucose levels exceeding recommended enterprise limits" />
                </div>
              </div>
            </div>

            {/* Metric Explorer Parody */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm p-4">
              <h3 className="font-bold text-sm text-zinc-300 mb-4 uppercase tracking-wider">Metric Explorer</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {MOCK_METRICS.map(metric => (
                  <div 
                    key={metric} 
                    onClick={() => setQuery(metric)}
                    className="text-[11px] font-mono bg-zinc-800 hover:bg-blue-900/30 hover:text-blue-400 p-2 rounded cursor-pointer transition-colors truncate text-zinc-400 border border-zinc-700"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'Alerts':
        return (
          <div className="space-y-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm overflow-hidden">
              <div className="bg-zinc-800/50 border-b border-zinc-800 px-4 py-2 font-bold text-sm text-zinc-300">
                Alerting Rules
              </div>
              <div className="p-0">
                <div className="p-4 bg-red-900/10 border-b border-zinc-800">
                  <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>TeaIsCold (1 firing)</span>
                  </div>
                  <div className="ml-6 space-y-2">
                    <div className="bg-zinc-950 border border-red-900/30 p-3 rounded text-xs font-mono">
                      <p className="text-zinc-500 mb-1">Labels:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-300">alertname="TeaIsCold"</span>
                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-300">severity="critical"</span>
                        <span className="bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-300">instance="mug-01"</span>
                      </div>
                      <p className="text-zinc-500 mt-3 mb-1">Annotations:</p>
                      <p className="text-zinc-300"><span className="font-bold text-zinc-400">summary:</span> Water temperature dropped below 80°C</p>
                      <p className="text-zinc-300"><span className="font-bold text-zinc-400">description:</span> The tea is becoming undrinkable. Immediate microwave intervention required.</p>
                      <div className="mt-4 flex gap-2">
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded text-[10px] font-bold border border-zinc-700">Silence</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-900/10">
                  <div className="flex items-center gap-2 text-yellow-400 font-bold mb-2">
                    <Info className="w-4 h-4" />
                    <span>TooMuchSugar (0 firing, 1 pending)</span>
                  </div>
                  <div className="ml-6">
                    <p className="text-xs text-zinc-500">Expression: sugar_cubes_total {">"} 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Status':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm">
              <div className="bg-zinc-800/50 border-b border-zinc-800 px-4 py-2 font-bold text-sm text-zinc-300">Runtime Information</div>
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <StatusRow label="Tea Version" value="1.19.4" />
                  <StatusRow label="Brewing Mode" value="Loose Leaf" />
                  <StatusRow label="Max Open Mugs" value="1024" />
                  <StatusRow label="Storage Engine" value="TSDB (Tea Storage Data Base)" />
                </tbody>
              </table>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm">
              <div className="bg-zinc-800/50 border-b border-zinc-800 px-4 py-2 font-bold text-sm text-zinc-300">Build Information</div>
              <table className="w-full text-xs border-collapse">
                <tbody>
                  <StatusRow label="Version" value="2.41.8-tea" />
                  <StatusRow label="Revision" value="rfc-2324-compliance" />
                  <StatusRow label="Branch" value="master-steep" />
                  <StatusRow label="BuildUser" value="larry-masinter" />
                  <StatusRow label="BuildDate" value="2026-04-01T12:00:00Z" />
                </tbody>
              </table>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm md:col-span-2">
              <div className="bg-zinc-800/50 border-b border-zinc-800 px-4 py-2 font-bold text-sm text-zinc-300">Command-line Flags</div>
              <div className="p-4 font-mono text-xs text-zinc-500 space-y-1">
                <p>--config.file="tea.yml"</p>
                <p>--storage.tea.path="/var/lib/tea"</p>
                <p>--web.listen-address=":9090"</p>
                <p>--kettle.boil-timeout="5m"</p>
                <p>--honey.crystallization-check.interval="1h"</p>
              </div>
            </div>
          </div>
        );
      case 'Help':
        return (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded shadow-sm p-6 space-y-6">
            <h2 className="text-xl font-bold border-b border-zinc-800 pb-2 text-zinc-200">Prom-TEA-QL Cheat Sheet</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-blue-400">Selectors</h3>
                <div className="space-y-2">
                  <HelpItem query="tea_saturation_ratio" desc="Select all saturation metrics" />
                  <HelpItem query="tea_saturation_ratio{flavor='earl_grey'}" desc="Filter by flavor" />
                  <HelpItem query="tea_saturation_ratio[5m]" desc="Range vector for the last 5 minutes" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-blue-400">Functions</h3>
                <div className="space-y-2">
                  <HelpItem query="rate(tea_consumption_total[5m])" desc="Per-second rate of consumption" />
                  <HelpItem query="sum(tea_replicas) by (flavor)" desc="Aggregate replicas by flavor" />
                  <HelpItem query="predict_linear(tea_temp[1h], 3600)" desc="Predict tea temp in 1 hour" />
                </div>
              </div>
            </div>
            <div className="bg-blue-900/10 p-4 rounded border border-blue-900/30 text-sm text-blue-300 italic">
              "If the query returns 418, you are likely using a coffee pot. Please upgrade to a certified teapot."
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 font-sans flex flex-col">
      {/* Prometheus Style Header */}
      <header className="bg-[#1a1a1a] text-white px-4 py-2 flex items-center justify-between shadow-md border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="hover:bg-white/10 p-1 rounded transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-[#e6522c] p-1 rounded">
              <Search className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight">Prom-TEA-us</h1>
          </div>
          <nav className="hidden md:flex gap-4 ml-8 text-sm font-medium opacity-80">
            <button 
              onClick={() => setActiveTab('Graph')}
              className={cn("pb-1 transition-all", activeTab === 'Graph' ? "border-b-2 border-white opacity-100" : "hover:opacity-100")}
            >
              Graph
            </button>
            <button 
              onClick={() => setActiveTab('Alerts')}
              className={cn("pb-1 transition-all", activeTab === 'Alerts' ? "border-b-2 border-white opacity-100" : "hover:opacity-100")}
            >
              Alerts
            </button>
            <button 
              onClick={() => setActiveTab('Status')}
              className={cn("pb-1 transition-all", activeTab === 'Status' ? "border-b-2 border-white opacity-100" : "hover:opacity-100")}
            >
              Status
            </button>
            <button 
              onClick={() => setActiveTab('Help')}
              className={cn("pb-1 transition-all", activeTab === 'Help' ? "border-b-2 border-white opacity-100" : "hover:opacity-100")}
            >
              Help
            </button>
          </nav>
        </div>
        <div className="text-xs opacity-60 font-mono">
          Server time: {new Date().toLocaleTimeString()}
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {renderContent()}
      </main>

      <footer className="bg-[#1a1a1a] border-t border-zinc-800 px-4 py-1 text-[10px] text-zinc-500 flex justify-between">
        <span>Prom-TEA-us v2.41.8-tea</span>
        <span>Build: 2026-04-01T12:00:00Z</span>
      </footer>
    </div>
  );
};

function StatusRow({ label, value }: { label: string, value: string }) {
  return (
    <tr className="border-b border-zinc-800 last:border-0">
      <td className="p-2 font-bold text-zinc-400 bg-zinc-900/50 w-1/3 border-r border-zinc-800">{label}</td>
      <td className="p-2 font-mono text-zinc-300">{value}</td>
    </tr>
  );
}

function HelpItem({ query, desc }: { query: string, desc: string }) {
  return (
    <div className="space-y-1">
      <div className="bg-zinc-800 p-1.5 rounded font-mono text-xs border border-zinc-700 text-zinc-300">{query}</div>
      <div className="text-[11px] text-zinc-500 pl-1">{desc}</div>
    </div>
  );
}

function TargetItem({ name, status, lastScrape, error }: { name: string, status: 'UP' | 'DOWN', lastScrape: string, error?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
      <div className="flex flex-col">
        <span className="text-xs font-mono font-bold text-blue-400">{name}</span>
        {error && <span className="text-[10px] text-red-500 italic">{error}</span>}
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] text-zinc-500">{lastScrape}</span>
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${status === 'UP' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
          {status === 'UP' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
          {status}
        </div>
      </div>
    </div>
  );
}

function AlertItem({ name, status, severity, summary }: { name: string, status: 'FIRING' | 'PENDING', severity: 'critical' | 'warning', summary: string }) {
  return (
    <div className="flex items-start gap-3 border-b border-zinc-800 pb-2 last:border-0 last:pb-0">
      <div className={`mt-1 ${status === 'FIRING' ? 'text-red-500' : 'text-yellow-500'}`}>
        <AlertCircle className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300">{name}</span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${status === 'FIRING' ? 'bg-red-600 text-white' : 'bg-yellow-400 text-black'}`}>
            {status}
          </span>
        </div>
        <p className="text-[10px] text-zinc-500 mt-0.5">{summary}</p>
      </div>
    </div>
  );
}

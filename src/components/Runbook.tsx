import React from 'react';
import { ArrowLeft, Book, ShieldAlert, Thermometer, RefreshCw, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface RunbookProps {
  onBack: () => void;
}

export const Runbook: React.FC<RunbookProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 font-mono p-4 md:p-8 selection:bg-red-500/30">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>

        <header className="border-b-4 border-red-600 pb-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Book className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">SOP-418: Cold-Tea-Syndrome (CTS)</h1>
          </div>
          <p className="text-zinc-500 text-sm">Standard Operating Procedure for Enterprise Tea Orchestration</p>
        </header>

        <div className="grid gap-8">
          <section className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <h2 className="text-red-500 font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" /> 1. INITIAL TRIAGE
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-zinc-600">01.</span>
                <span>Verify that the kettle is not currently in a <strong>'Coffee-Induced'</strong> state. If coffee residue is detected, perform a full <code>wipe --force</code> of the mug node.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-zinc-600">02.</span>
                <span>Check the <strong>'Heat-Service'</strong> mesh. Is the kettle plugged into the wall? If not, this is a <code>Physical-Layer-Disconnect</code>. Plug it in.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-zinc-600">03.</span>
                <span>Validate the <strong>'Tea-Bag'</strong> pod. Is it actually in the mug? If it's still in the box, you have a <code>Scheduling-Error</code>.</span>
              </li>
            </ul>
          </section>

          <section className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <h2 className="text-blue-500 font-bold mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5" /> 2. THERMAL REMEDIATION
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-950/20 border border-blue-900/50 rounded">
                <p className="text-xs text-blue-400 font-bold mb-2 uppercase tracking-widest">IF TEMPERATURE &lt; 90°C:</p>
                <p className="text-sm">Apply the <strong>'Microwave'</strong> patch. <br/> <span className="text-zinc-500 italic">Warning: This may cause flavor regression and 'Soggy-Bag' side-effects.</span></p>
              </div>
              <div className="p-4 bg-yellow-950/20 border border-yellow-900/50 rounded">
                <p className="text-xs text-yellow-400 font-bold mb-2 uppercase tracking-widest">IF TEMPERATURE IS NULL:</p>
                <p className="text-sm">The water has likely evaporated. Re-provision the kettle with <code>water:latest</code>.</p>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg">
            <h2 className="text-green-500 font-bold mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5" /> 3. ENTROPY BALANCING
            </h2>
            <p className="text-sm mb-4 text-zinc-400">Perform a manual <strong>'Spoon-Stir'</strong> rotation to balance the sugar-entropy levels across the liquid substrate.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-zinc-800 p-3 rounded text-center">
                <span className="block text-[10px] text-zinc-600 uppercase mb-1">Clockwise</span>
                <span className="text-xs">Dissolves Sugar</span>
              </div>
              <div className="border border-zinc-800 p-3 rounded text-center">
                <span className="block text-[10px] text-zinc-600 uppercase mb-1">Counter-Clockwise</span>
                <span className="text-xs">Invokes Chaos</span>
              </div>
            </div>
          </section>

          <section className="bg-red-600 text-white p-8 rounded-none border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)]">
            <h2 className="text-2xl font-black mb-4 uppercase italic flex items-center gap-2">
              <Zap className="w-6 h-6" /> NUCLEAR OPTION
            </h2>
            <p className="font-bold mb-4">If all else fails and the tea remains cold/unpalatable:</p>
            <ol className="list-decimal list-inside space-y-2 font-mono text-sm">
              <li>Delete the <code>mug-node</code>.</li>
              <li>Purge the <code>kettle-cache</code>.</li>
              <li>Re-provision the entire kitchen namespace.</li>
              <li>Go to the pub.</li>
            </ol>
          </section>
        </div>

        <footer className="mt-12 pt-8 border-t border-zinc-800 text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          End of SOP-418 | Classification: TOP SECRET / TEA ONLY
        </footer>
      </div>
    </div>
  );
};

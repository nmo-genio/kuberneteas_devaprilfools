import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface AlertPanelProps {
  onOpenRunbook: () => void;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ onOpenRunbook }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-950/20 border border-red-900/50 rounded-lg p-4 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-red-600 animate-pulse" />
      
      <div className="flex items-start gap-3">
        <div className="bg-red-600 p-2 rounded-md">
          <AlertCircle className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-red-500 font-bold uppercase tracking-tighter text-sm">SEV-1 INCIDENT ACTIVE</h3>
            <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-mono">CRITICAL</span>
          </div>
          <p className="text-zinc-200 text-sm mt-1 font-medium">
            Earl Grey Pod <code className="bg-red-900/40 px-1 rounded text-red-300">eg-node-03f4</code> has gone cold.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-4 text-[11px] font-mono">
            <div>
              <span className="text-zinc-500 block uppercase">MTTR (Mean Time to Reboil)</span>
              <span className="text-zinc-300">Calculating...</span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase">Incident Commander</span>
              <span className="text-zinc-300">kettle-operator-6f8d</span>
            </div>
          </div>
          
          <button 
            onClick={onOpenRunbook}
            className="mt-4 flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors underline decoration-red-900 underline-offset-4"
          >
            Open Runbook <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

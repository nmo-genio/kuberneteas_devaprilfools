import React, { useState, useEffect } from 'react';
import { Coffee, AlertTriangle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TeapotErrorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeapotError: React.FC<TeapotErrorProps> = ({ isOpen, onClose }) => {
  const [intercepting, setIntercepting] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIntercepting(true);
      const timer1 = setTimeout(() => {
        setIntercepting(false);
        setShowError(true);
      }, 2000);
      return () => clearTimeout(timer1);
    } else {
      setIntercepting(false);
      setShowError(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        >
          {intercepting && (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-zinc-900 border border-blue-500 p-8 rounded-lg max-w-md w-full font-mono text-sm"
            >
              <div className="flex items-center gap-3 text-blue-400 mb-4">
                <ShieldAlert className="animate-pulse" />
                <span className="font-bold uppercase tracking-widest">Istio-Proxy Interception</span>
              </div>
              <div className="space-y-2 text-zinc-400">
                <p className="text-green-500">{"[ENVOY]"} Intercepting Coffee Request...</p>
                <p className="animate-pulse">{"[WASM]"} Evaluating RFC 2324 Compliance...</p>
                <p className="text-red-400">{"[POLICY]"} Violation detected: Coffee scheduling on tea-only node.</p>
              </div>
            </motion.div>
          )}

          {showError && (
            <motion.div 
              initial={{ scale: 0.8, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-black text-green-500 p-12 rounded-none border-8 border-green-500 shadow-[20px_20px_0px_0px_rgba(0,255,0,0.3)] max-w-2xl w-full text-left relative overflow-hidden font-mono"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-green-500/20 animate-scanline" />
              
              <div className="bg-green-500 text-black px-4 py-2 font-black mb-8 uppercase tracking-tighter text-xl">
                FATAL EXCEPTION: RFC 2324 COMPLIANCE FAILURE
              </div>
              
              <div className="space-y-6 mb-12">
                <p className="text-2xl leading-tight font-bold">
                  The infrastructure has detected an attempt to brew coffee on a teapot-exclusive node.
                </p>
                <p className="text-xl opacity-80">
                  This is a violation of the Hyper Text Coffee Pot Control Protocol (HTCPCP).
                </p>
                <div className="text-xs opacity-50 space-y-1">
                  <p>NODE_ID: ceramic-mug-us-west-1a</p>
                  <p>TAINT: tea-only:NoSchedule</p>
                  <p>PROTOCOL_VERSION: HTCPCP/1.0</p>
                  <p>AUTHORITY: Larry Masinter</p>
                </div>
              </div>

              <div className="flex flex-col items-start gap-6">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-green-500 text-black px-8 py-4 font-black hover:bg-white transition-all active:scale-95 uppercase tracking-widest text-lg border-4 border-transparent hover:border-green-400"
                >
                  Acknowledged. I am a teapot.
                </button>
                <div className="flex items-center gap-2 text-[10px] opacity-40 animate-pulse">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>SYSTEM_HALTED // REBOOT_REQUIRED</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

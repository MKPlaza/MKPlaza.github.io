import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ExternalLink, Maximize2 } from 'lucide-react';
import { PROXIES } from '../proxyData';

const SimpleProxiesHub = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Persist active tab in localStorage
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return parseInt(localStorage.getItem('simpleProxiesActiveTab') || '0', 10) || 0;
    } catch {
      return 0;
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('simpleProxiesActiveTab', activeTab.toString());
  }, [activeTab]);

  const onTabChange = (index: number) => {
    setActiveTab(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-12 h-12 text-[var(--fas-gold)] drop-shadow-lg" />
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[var(--fas-gold)] to-[var(--mk-eye-glow)] bg-clip-text text-transparent mb-2">
              Pr0x135 Hub
            </h1>
            <p className="text-xl text-[var(--fas-silver)]">Embedded proxy viewer • Saved tabs • Fullscreen ESC</p>
          </div>
        </div>
      </motion.div>

      {/* Tab Buttons - Proxy 1 / Proxy 2 */}
      <div className="flex bg-[var(--glass)] backdrop-blur-xl border border-[var(--fas-gold)]/20 rounded-2xl p-1 mb-8 shadow-xl mx-auto">
        {[0, 1].map((index) => (
          <motion.button
            key={index}
            onClick={() => onTabChange(index)}
            className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center ${
              activeTab === index
                ? 'bg-gradient-to-r from-[var(--fas-gold)] to-[var(--mk-eye-glow)] text-[var(--mk-midnight)] shadow-lg'
                : 'text-[var(--fas-silver)] hover:text-[var(--fas-gold)] hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proxy {index + 1}
          </motion.button>
        ))}
      </div>

      {/* Active Tab Content - No bottom button */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {/* Iframe Container */}
          <div className="relative w-full h-[80vh] rounded-3xl border border-[var(--fas-gold)]/20 shadow-2xl overflow-hidden bg-white group">
            <iframe
              ref={iframeRef}
              src={PROXIES[activeTab].url}
              title={`Proxy ${activeTab + 1}`}
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation-by-user-activation allow-downloads"
              referrerPolicy="no-referrer"
              loading="lazy"
              allow="fullscreen *; autoplay; encrypted-media; fullscreen"
            />
            {/* Fullscreen Button */}
            <motion.button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 bg-[var(--glass)] backdrop-blur-xl border border-[var(--fas-gold)]/30 p-3 rounded-2xl text-[var(--fas-gold)] shadow-lg hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Toggle Fullscreen (Esc to exit)"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SimpleProxiesHub;

/* Final Updates:
- Tabs: "Proxy 1" / "Proxy 2" (no names).
- Removed bottom "Open New Tab" button.
- localStorage + fullscreen + tabs persist. Clean/minimal.
*/

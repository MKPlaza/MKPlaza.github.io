import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Heart, 
  ExternalLink, 
  X, 
  Maximize2,
  ChevronLeft,
  Shield,
  Clock,
  Eye
} from 'lucide-react';
import { FavoriteItem, Proxy } from '../types';
import { PROXIES } from '../proxyData';

interface Props {
  favorites: FavoriteItem[];
  onToggleFavorite: (item: FavoriteItem) => void;
  initialSelectedId?: string | null;
  onClearSelectedId?: () => void;
}

const ProxiesHub: React.FC<Props> = ({
  favorites,
  onToggleFavorite,
  initialSelectedId,
  onClearSelectedId
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId || null);
  const [proxyStats, setProxyStats] = useState<Record<string, { uptime: number; speed: string }>>({});

  useEffect(() => {
    setSelectedId(initialSelectedId || null);
  }, [initialSelectedId]);

  const selectedProxy = selectedId ? PROXIES.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === selectedId) : null;

  const toggleFavorite = useCallback((proxy: Proxy) => {
    const item: FavoriteItem = {
      id: proxy.name.toLowerCase().replace(/\s+/g, '-'),
      type: 'proxy',
      title: proxy.name,
      imageUrl: proxy.imageUrl || '',
      link: proxy.url
    };
    onToggleFavorite(item);
  }, [onToggleFavorite]);

  const isFavorite = (proxy: Proxy) => favorites.some(f => f.id === proxy.name.toLowerCase().replace(/\s+/g, '-'));

  const handleOpenDetail = (id: string) => {
    setSelectedId(id);
    onClearSelectedId?.();
  };

  const handleCloseDetail = () => {
    setSelectedId(null);
    onClearSelectedId?.();
  };

  const handleFullscreen = () => {
    const iframe = document.querySelector('#proxy-iframe') as HTMLIFrameElement;
    if (iframe && !document.fullscreenElement) {
      iframe.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Mock proxy stats
  useEffect(() => {
    const stats: Record<string, { uptime: number; speed: string }> = {};
    PROXIES.forEach(p => {
      stats[p.name.toLowerCase().replace(/\s+/g, '-')] = {
        uptime: 99 + Math.random() * 1,
        speed: ['Fast', 'Medium', 'Slow'][Math.floor(Math.random() * 3)]
      };
    });
    setProxyStats(stats);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-8">
          <Shield className="w-12 h-12 text-[var(--fas-gold)] drop-shadow-lg" />
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[var(--fas-gold)] to-[var(--mk-eye-glow)] bg-clip-text text-transparent mb-2">
              Pr0x135 Hub
            </h1>
            <p className="text-xl text-[var(--fas-silver)]">Access the web anonymously • 12 services • High-speed proxies</p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedId && selectedProxy ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-[var(--mk-midnight)]/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex-none bg-[var(--glass)] backdrop-blur-xl flex items-center justify-between px-6 py-4 border-b border-[var(--fas-gold)]/20">
              <button 
                onClick={handleCloseDetail}
                className="flex items-center gap-2 text-[var(--fas-silver)] hover:text-[var(--fas-gold)] font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Grid
              </button>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => window.open(selectedProxy.url, '_blank')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[var(--fas-gold)]/10 hover:bg-[var(--fas-gold)]/20 border border-[var(--fas-gold)]/20 text-[var(--fas-gold)] rounded-xl text-sm font-bold transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open External
                </button>
                <button 
                  onClick={handleFullscreen}
                  className="p-3 text-[var(--fas-silver)] hover:text-[var(--fas-gold)] rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-grow overflow-hidden">
              <iframe
                id="proxy-iframe"
                src={selectedProxy.url}
                className="w-full h-full border-none bg-white"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
          >
            {PROXIES.map((proxy) => {
              const id = proxy.name.toLowerCase().replace(/\s+/g, '-');
              const stat = proxyStats[id];
              const isFav = isFavorite(proxy);
              return (
                <motion.div
                  key={id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-[var(--glass)] backdrop-blur-xl border border-[var(--fas-gold)]/15 hover:border-[var(--fas-gold)]/30 p-8 rounded-3xl shadow-2xl hover:shadow-[0_20px_40px_rgba(255,215,0,0.15)] overflow-hidden"
                >
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleFavorite(proxy)}
                      className={`p-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-[var(--fas-gold)]/20 transition-all ${
                        isFav ? 'text-[var(--fas-gold)] shadow-[0_0_10px_rgba(255,215,0,0.5)]' : 'text-[var(--fas-silver)]'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFav ? 'fill-[var(--fas-gold)]' : ''}`} />
                    </button>
                  </div>
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--fas-gold)]/10 to-[var(--mk-eye-glow)]/10 border-2 border-[var(--fas-gold)]/20 flex items-center justify-center group-hover:scale-110 transition-all">
                    <img 
                      src={proxy.imageUrl || '/placeholder-proxy.png'} 
                      alt={proxy.name}
                      className="w-12 h-12 rounded-xl drop-shadow-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjAiIGZpbGw9IiM0QTY5RkYiLz4KPGcgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogPHBhdGggZD0iTTIwIDE2SDI0VjIwSDIwVjE2WiIvPgogPHBhdGggZD0iTTI0IDE2SDI4VjIwSDI0VjE2WiIvPgo8L2c+Cjwvc3ZnPgo=';
                      }}
                    />
                  </div>
                  <h3 className="text-2xl font-black text-[var(--fas-gold)] mb-4 text-center leading-tight">
                    {proxy.name}
                  </h3>
                  {proxy.description && (
                    <p className="text-[var(--fas-silver)] text-sm mb-6 text-center opacity-90 leading-relaxed">
                      {proxy.description}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-4 mb-8 text-xs opacity-80">
                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{stat?.uptime?.toFixed(1) ?? '99.5'}% Uptime</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/5 px-3 py-1.5 rounded-full">
                      <Eye className="w-3 h-3" />
                      <span>{stat?.speed ?? 'Fast'}</span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOpenDetail(id)}
                    className="w-full bg-gradient-to-r from-[var(--fas-gold)] to-[var(--mk-eye-glow)] text-[var(--mk-midnight)] py-4 px-8 rounded-2xl font-bold text-lg shadow-[0_10px_20px_rgba(255,215,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,215,0,0.4)] transition-all duration-300"
                  >
                    Launch Proxy <Globe className="inline ml-2 w-5 h-5" />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProxiesHub;


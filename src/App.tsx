import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Film, 
  Tv, 
  Gamepad2, 
  BookOpenText, 
  Settings, 
  ChevronUp, 
  ChevronDown, 
  X, 
  Terminal, 
  Palette, 
  Ghost,
  Battery,
  BatteryCharging,
  BatteryMedium,
  BatteryLow,
  Clock,
  ChevronLeft,
  Home,
  EyeOff,
  Maximize2,
  ExternalLink,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { THEMES, CLOAKS } from './constants';
import { ThemePreset, FavoriteItem, Game } from './types';
import { GAME_PAYLOADS } from './gamePayloads';
import { MOVIES } from './movieData';
import { TV_SHOWS } from './tvData';
import { ANIME } from './animeData';
import { MANGA } from './mangaData';
import { GAMES } from './gameData';
import { PROXIES } from './proxyData';
import MovieHub from './components/MovieHub';
import TVHub from './components/TVHub';
import AnimeHub from './components/AnimeHub';
import MangaHub from './components/MangaHub';
import HomeHub from './components/HomeHub';
import GamesHub from './components/GamesHub';
import SimpleProxiesHub from './components/SimpleProxiesHub';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemePreset>(THEMES.dark);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [activeHub, setActiveHub] = useState<string | null>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlayerCollapsed, setIsPlayerCollapsed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const saved = localStorage.getItem('fas_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fas_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === item.id);
      if (exists) {
        return prev.filter(f => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

const PLAYLIST: Array<{title: string; filename: string}> = [
  {title: 'My Demons', filename: '28 - Starset-My Demons (Lyrics Video).mp3'},
  {title: 'Another Love', filename: 'Another Love - Tom Odell.mp3'},
  {title: 'Heat Waves', filename: 'Heat Waves - Glass Animals.mp3'},
  {title: 'Hymn for the Weekend', filename: '03 Hymn for the Weekend.mp3'},
  {title: 'Mortals (Slowed + Reverb)', filename: 'Mortals (Slowed + Reverb).mp3'},
  {title: 'All my friends are toxic', filename: 'All my friends are toxic.mp3'},
  {title: 'Matushka Ultrafunk', filename: 'Matushka Ultrafunk.mp3'},
  {title: 'Džanum', filename: '[YT2mp3.info] - Teya Dora - Džanum (lyrics_english lyrics) _ Moje more, my nightmare #dzanum #lyrics #edit #shorts (320kbps).mp3'}
];
  const MUSIC_BASE_URL = './theme-songs/';

  
  const [cloakTarget, setCloakTarget] = useState('classroom');
  const [customCloakTitle, setCustomCloakTitle] = useState('');
  const [customCloakFavicon, setCustomCloakFavicon] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        const updateBattery = () => {
          setBattery({ level: Math.round(batt.level * 100), charging: batt.charging });
        };
        updateBattery();
        batt.addEventListener('levelchange', updateBattery);
        batt.addEventListener('chargingchange', updateBattery);
      });
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--fas-midnight', currentTheme.midnight);
    root.style.setProperty('--fas-eye-glow', currentTheme.eyes);
    root.style.setProperty('--fas-gold', currentTheme.gold);
    
    if (currentTheme.pixel) {
      document.body.classList.add('pixel-theme');
    } else {
      document.body.classList.remove('pixel-theme');
    }

    // Angry cursor effect
    const handleMouseDown = () => document.body.classList.add('pressed');
    const handleMouseUp = () => document.body.classList.remove('pressed');

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentTheme]);



  useEffect(() => {
    const audio = audioRef.current;
    if (audio && PLAYLIST[currentSongIndex]) {
      audio.src = MUSIC_BASE_URL + encodeURIComponent(PLAYLIST[currentSongIndex].filename);
      audio.preload = 'metadata';
      audio.loop = isLooping;
      if (isPlaying) {
        audio.play().catch(e => console.error('Audio play failed:', e));
      }
    }
  }, [currentSongIndex, isPlaying, isLooping]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(e => console.error('Play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const nextSong = useCallback(() => {
    setCurrentSongIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  }, []);

  const prevSong = useCallback(() => {
    setCurrentSongIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        if (!isLooping) {
          nextSong();
        }
      };
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, [isLooping, nextSong]);

  const loadHub = (type: string) => {
    setActiveHub(type);
  };

  const handleClearSelectedId = React.useCallback(() => {
    setSelectedItemId(null);
  }, []);

  const handleOpenItem = (item: FavoriteItem) => {
    if (item.type === 'game') {
      const game = GAMES.find(g => g.id === item.id);
      if (game) {
        setSelectedGame(game);
        loadHub('games');
      }
    } else {
      setSelectedItemId(item.id);
      loadHub(item.type);
    }
  };

  const goHome = () => {
    setActiveHub('home');
  };

  const initiateCloak = () => {
    let finalTitle, finalIcon;
    if (cloakTarget === 'custom') {
      finalTitle = customCloakTitle || "Home";
      finalIcon = customCloakFavicon || "https://www.google.com/favicon.ico";
    } else {
      finalTitle = CLOAKS[cloakTarget].title;
      finalIcon = CLOAKS[cloakTarget].icon;
    }

    const win = window.open('about:blank', '_blank');
    if (win) {
      const doc = win.document;
      doc.title = finalTitle;
      
      const link = doc.createElement('link');
      link.rel = 'icon';
      link.href = finalIcon;
      doc.head.appendChild(link);

      const iframe = doc.createElement('iframe');
      iframe.style.width = '100vw';
      iframe.style.height = '100vh';
      iframe.style.border = 'none';
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.margin = '0';
      iframe.style.padding = '0';
      iframe.src = window.location.href;
      
      doc.body.appendChild(iframe);
      doc.body.style.margin = '0';
      doc.body.style.overflow = 'hidden';
    }
    setIsSettingsOpen(false);
  };

  const getBatteryIcon = () => {
    if (!battery) return <Battery className="w-4 h-4" />;
    if (battery.charging) return <BatteryCharging className="w-4 h-4" />;
    if (battery.level > 70) return <Battery className="w-4 h-4" />;
    if (battery.level > 30) return <BatteryMedium className="w-4 h-4" />;
    return <BatteryLow className="w-4 h-4" />;
  };

  return (
      <div 
        className="min-h-screen w-full relative transition-all duration-700 bg-black/60 backdrop-blur-md"
        style={{ 
          backgroundImage: `url(${currentTheme.bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          fontFamily: currentTheme.fontFamily || 'var(--font-cinzel)',
          fontStyle: currentTheme.fontStyle || 'normal'
        }}
      >
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[5000] bg-[var(--mk-midnight)]/90 backdrop-blur-xl border border-[var(--mk-gold)]/30 px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.2)] flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-[var(--fas-gold)]/10 flex items-center justify-center">
              <motion.img 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                src={currentTheme.logo} 
                className="w-6 h-6" 
              />
            </div>
            <div>
              <h3 className="text-[var(--fas-gold)] font-bold text-sm uppercase tracking-widest">Tab Open!</h3>
              <p className="text-[var(--fas-silver)] text-xs font-medium">Welcome to Fasahat Hub</p>
            </div>
            <button 
              onClick={() => setShowWelcome(false)}
              className="ml-4 text-[var(--fas-silver)]/40 hover:text-[var(--fas-gold)] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 w-full h-20 bg-[var(--glass)] backdrop-blur-xl flex items-center justify-between px-8 z-[2000] shadow-2xl border-b border-white/5">
        <div className="flex items-center gap-6">
          <motion.img 
            whileHover={{ scale: 1.1, rotate: 5 }}
            src={currentTheme.logo} 
            alt="Logo" 
            className="h-12 w-auto cursor-pointer drop-shadow-[0_0_8px_var(--mk-gold)]"
            onClick={goHome}
          />
          <div 
            className="text-xl font-black uppercase tracking-[3px] text-[var(--fas-gold)] drop-shadow-[0_0_12px_var(--fas-gold)] select-none"
          >
            Fasahat Hub
          </div>
          
          <div className="flex items-center gap-5 bg-yellow-400/5 px-4 py-1.5 rounded-full border border-yellow-400/10 font-orbitron text-[11px] text-[var(--fas-gold)] shadow-[0_0_8px_rgba(255,215,0,0.1)]">
            <div className="flex items-center gap-2">
              {getBatteryIcon()}
              <span>{battery ? `${battery.level}%` : '--%'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{time.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden mx-8 hidden lg:flex items-center">
        <div className="flex gap-12 animate-marquee-reverse whitespace-nowrap text-[var(--fas-gold)] font-bold tracking-widest uppercase text-sm opacity-70">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span>Chill Vibes Only</span>
                <span>M0v135 Galore</span>
                <span>Fasahat Supermancy</span>
                <span>Cloak before you click</span>
                <span>Peak Content</span>
                <span>😂</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-5">

          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="text-[var(--mk-silver)] opacity-70 hover:opacity-100 hover:text-[var(--mk-gold)] transition-all hover:rotate-45"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <motion.nav 
        animate={{ 
          y: isNavCollapsed ? -140 : 0,
          opacity: isNavCollapsed ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="fixed top-20 left-0 w-full h-[60px] bg-[var(--glass-heavy)] backdrop-blur-2xl border-b border-yellow-400/15 flex items-center justify-center gap-4 px-5 z-[1999]"
      >
{[
          { id: 'home', label: 'Home', icon: Home },
          { id: 'movies', label: 'M0v135', icon: Film, count: MOVIES.length },
          { id: 'tv', label: 'TV 5h0w5', icon: Tv, count: TV_SHOWS.length },
          { id: 'anime', label: 'An1m3', icon: Ghost, count: ANIME.length },
          { id: 'manga', label: 'M4ng4', icon: BookOpenText, count: MANGA.length },
          { id: 'proxies', label: 'Pr0x135', icon: Shield, count: PROXIES.length },
          { id: 'games', label: 'G4m35', icon: Gamepad2, count: GAMES.length },

        ].map((item) => (
          <button
            key={item.id}
            onClick={() => item.id === 'home' ? goHome() : loadHub(item.id)}
            className="flex items-center gap-2.5 text-[var(--mk-silver)] px-4 py-2 rounded-lg transition-all border border-transparent hover:bg-yellow-400/10 hover:border-yellow-400/30 hover:-translate-y-0.5 group"
          >
            <item.icon className="w-5 h-5 text-[var(--mk-eye-glow)] drop-shadow-[0_0_5px_var(--mk-eye-glow)]" />
            <div className="flex flex-col items-start">
              <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-[9px] opacity-50 font-mono tracking-tighter">
                  {item.count.toString().padStart(2, '0')} Units
                </span>
              )}
            </div>
          </button>
        ))}

          <button 
            onClick={() => setIsNavCollapsed(true)}
            className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 flex items-center justify-center bg-[var(--glass-heavy)] backdrop-blur-md border border-yellow-400/20 border-t-0 text-[var(--fas-gold)] w-[60px] h-[22px] rounded-b-xl hover:h-[26px] transition-all"
          >
          <ChevronUp className="w-4 h-4" />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isNavCollapsed && (
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={() => setIsNavCollapsed(false)}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[2001] bg-[var(--fas-gold)] text-[var(--fas-midnight)] w-[60px] h-[22px] rounded-b-xl flex items-center justify-center shadow-lg"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <main 
        className={`absolute left-0 w-full transition-all duration-500 z-50 ${activeHub === 'partners' ? 'bg-[var(--mk-midnight)]/60' : 'bg-[var(--mk-midnight)]/90'} overflow-y-auto ${activeHub ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ 
          top: isNavCollapsed ? '80px' : '140px',
          height: isNavCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 140px)'
        }}
      >
        {activeHub === 'home' && (
          <HomeHub 
            onNavigate={loadHub} 
            onOpenSettings={() => setIsSettingsOpen(true)}
            favorites={favorites}
            onRemoveFavorite={(id) => setFavorites(prev => prev.filter(f => f.id !== id))}
            currentTheme={currentTheme}
            onOpenItem={handleOpenItem}
          />
        )}
        {activeHub === 'movies' && <MovieHub favorites={favorites} onToggleFavorite={toggleFavorite} initialSelectedId={selectedItemId} onClearSelectedId={handleClearSelectedId} />}
        {activeHub === 'tv' && <TVHub favorites={favorites} onToggleFavorite={toggleFavorite} initialSelectedId={selectedItemId} onClearSelectedId={handleClearSelectedId} />}
        {activeHub === 'anime' && <AnimeHub favorites={favorites} onToggleFavorite={toggleFavorite} initialSelectedId={selectedItemId} onClearSelectedId={handleClearSelectedId} />}
        {activeHub === 'manga' && <MangaHub favorites={favorites} onToggleFavorite={toggleFavorite} />}
{activeHub === 'proxies' && <SimpleProxiesHub />}
        {activeHub === 'games' && <GamesHub favorites={favorites} onToggleFavorite={toggleFavorite} setSelectedGame={setSelectedGame} />}
      </main>

<audio ref={audioRef} preload="metadata" />

      <AnimatePresence>
        {selectedGame && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[6000] bg-black flex flex-col h-screen overflow-hidden"
          >
            <div className="flex-none bg-black/50 backdrop-blur-md flex items-center justify-between px-4 py-2 border-b border-white/10">
              <button 
                onClick={() => setSelectedGame(null)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors font-medium text-sm"
              >
                <X className="w-4 h-4" /> Back
              </button>
              <div className="text-white text-xs font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[var(--mk-gold)] rounded-full animate-pulse"></div>
                {selectedGame.title}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }} className="p-2 text-neutral-400 hover:text-white transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button onClick={() => {
                  if (selectedGame?.link) {
                    window.open(selectedGame.link, '_blank');
                  } else if (selectedGame && GAME_PAYLOADS[selectedGame.id]?.customHtml) {
                    const blob = new Blob([GAME_PAYLOADS[selectedGame.id].customHtml], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    window.open(url, '_blank');
                  }
                }} className="p-2 text-neutral-400 hover:text-white transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-grow bg-black relative">
              <iframe 
                className="w-full h-full border-none bg-black"
                allow="fullscreen; gamepad; autoplay"
                srcDoc={GAME_PAYLOADS[selectedGame.id]?.customHtml || `<!DOCTYPE html><html><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh;color:#fff;font-family:sans-serif">
                    <div style="text-align:center">
                        <h2 style="letter-spacing:4px">EMULATING ${selectedGame.title.toUpperCase()}</h2>
                        <div style="width:50px;height:2px;background:#e63946;margin:20px auto"></div>
                        <p style="opacity:0.6;font-size:12px;text-transform:uppercase">Connecting to secure ROM vault...</p>
                    </div>
                </body></html>`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>


        {isPlayerCollapsed ? null : (
          <motion.div 
            className="fixed bottom-6 left-6 z-[1000] flex items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="h-[54px] w-[400px] bg-[var(--mk-midnight)]/90 backdrop-blur-2xl rounded-full border border-yellow-400/20 flex items-center px-6 shadow-2xl">
              <div className="flex-1 overflow-hidden whitespace-nowrap mr-4" title={PLAYLIST[currentSongIndex]?.title}>
                <div className="inline-block text-sm text-[var(--mk-silver)]">
                  {PLAYLIST[currentSongIndex]?.title || 'No tracks loaded'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSong}
                  className="p-2 text-[var(--mk-silver)] hover:text-[var(--mk-gold)] transition-colors rounded-full bg-white/5 hover:bg-white/10"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 bg-[var(--mk-gold)] text-[var(--mk-midnight)] rounded-full flex items-center justify-center shadow-lg font-bold transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button 
                  onClick={nextSong}
                  className="p-2 text-[var(--mk-silver)] hover:text-[var(--mk-gold)] transition-colors rounded-full bg-white/5 hover:bg-white/10"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsLooping(!isLooping)}
                  className={`p-1.5 ml-1 rounded-full transition-colors ${isLooping ? 'bg-[var(--mk-gold)] text-[var(--mk-midnight)]' : 'text-[var(--mk-silver)] hover:text-[var(--mk-gold)] bg-white/5 hover:bg-white/10'}`}
                  title="Toggle Loop"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

      <AnimatePresence>
        {isSettingsOpen && (
          <div 
            className="fixed inset-0 bg-black/10 z-[3000] flex items-center justify-end pr-12"
            onClick={(e) => e.target === e.currentTarget && setIsSettingsOpen(false)}
          >
            <motion.div 
              initial={{ x: 100, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0, scale: 0.95 }}
              className="w-[400px] bg-[var(--glass-heavy)] backdrop-blur-2xl border border-yellow-400/30 rounded-2xl shadow-2xl max-h-[90vh] flex flex-col text-[var(--mk-silver)]"
            >
              <div className="flex justify-between items-center p-6 border-b border-yellow-400/15 shrink-0">
                <h2 className="text-sm font-bold text-[var(--mk-gold)] uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Settings
                </h2>
                <button onClick={() => setIsSettingsOpen(false)} className="hover:text-[var(--mk-gold)] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="mb-8">
                  <div className="text-[11px] text-[var(--mk-eye-glow)] uppercase mb-4 font-bold flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Knight Presets
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-yellow-400/5 flex flex-col gap-2">
                  <span className="text-xs opacity-70">Active Theme Profile</span>
                  <select 
                    value={Object.keys(THEMES).find(key => THEMES[key] === currentTheme)}
                    onChange={(e) => setCurrentTheme(THEMES[e.target.value])}
                    className="bg-[var(--mk-midnight)]/80 border border-yellow-400/30 text-[var(--mk-silver)] p-2.5 rounded-lg w-full outline-none text-xs"
                    style={{ fontFamily: currentTheme.fontFamily, fontStyle: currentTheme.fontStyle || 'normal' }}
                  >
                    {Object.entries(THEMES).map(([key, theme]) => (
                      <option 
                        key={key} 
                        value={key}
                        style={{ fontFamily: currentTheme.fontFamily, fontStyle: currentTheme.fontStyle || 'normal' }}
                      >
                        {theme.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="text-[11px] text-[var(--mk-eye-glow)] uppercase mb-4 font-bold flex items-center gap-2">
                  <Ghost className="w-4 h-4" /> Cloak Methods
                </div>
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-white/5 rounded-xl border border-yellow-400/5 flex flex-col gap-2">
                    <span className="text-xs opacity-70">Cloak Site</span>
                    <select 
                      value={cloakTarget}
                      onChange={(e) => setCloakTarget(e.target.value)}
                      className="bg-[var(--mk-midnight)]/80 border border-yellow-400/30 text-[var(--mk-silver)] p-2.5 rounded-lg w-full outline-none text-xs"
                      style={{ fontFamily: currentTheme.fontFamily, fontStyle: currentTheme.fontStyle || 'normal' }}
                    >
                      {Object.entries(CLOAKS).map(([key, cloak]) => (
                        <option key={key} value={key}>{cloak.title}</option>
                      ))}
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  {cloakTarget === 'custom' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="p-3 bg-white/5 rounded-xl border border-yellow-400/5 flex flex-col gap-3"
                    >
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] opacity-70 uppercase">Custom Title</span>
                        <input 
                          type="text" 
                          value={customCloakTitle}
                          onChange={(e) => setCustomCloakTitle(e.target.value)}
                          placeholder="Enter custom title"
                          className="bg-[var(--mk-midnight)]/80 border border-yellow-400/30 text-[var(--mk-silver)] p-2 rounded-lg w-full outline-none text-xs"
                          style={{ fontFamily: currentTheme.fontFamily, fontStyle: currentTheme.fontStyle || 'normal' }}
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] opacity-70 uppercase">Custom Favicon URL</span>
                        <input 
                          type="text" 
                          value={customCloakFavicon}
                          onChange={(e) => setCustomCloakFavicon(e.target.value)}
                          placeholder="https://example.com/favicon.ico"
                          className="bg-[var(--mk-midnight)]/80 border border-yellow-400/30 text-[var(--mk-silver)] p-2 rounded-lg w-full outline-none text-xs"
                          style={{ fontFamily: currentTheme.fontFamily, fontStyle: currentTheme.fontStyle || 'normal' }}
                        />
                      </div>
                    </motion.div>
                  )}

                  <button 
                    onClick={initiateCloak}
                    className="bg-[var(--mk-accent-red)] hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-colors shadow-lg shadow-red-500/20"
                  >
                    Open Now
                  </button>
                </div>
              </div>
              </div>

              <div className="p-6 border-t border-yellow-400/15 shrink-0">
                <button 
                  onClick={() => setIsCreditsOpen(true)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-[var(--mk-silver)] py-3 rounded-xl font-bold transition-colors"
                >
                  Credits
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCreditsOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[4000] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setIsCreditsOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[var(--mk-midnight)] border border-[var(--mk-gold)]/30 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl shadow-[var(--mk-gold)]/10"
            >
              <h3 className="text-2xl font-bold text-[var(--mk-gold)] mb-4">Credits</h3>
              <p className="text-[var(--mk-silver)] text-lg">made by samtheskeleton.</p>
              <button 
                onClick={() => setIsCreditsOpen(false)}
                className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

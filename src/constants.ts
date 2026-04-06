import { ThemePreset, CloakOption, Song } from './types';

export const THEMES: Record<string, ThemePreset> = {
  galacta: {
    name: 'Galacta Knight',
    midnight: '#2d0a1a',
    eyes: '#ffffff',
    gold: '#ff8eb1',
    pixel: false,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/Galacta-Knight-peak.jpg',
    logo: 'https://lh3.googleusercontent.com/sitesv/APaQ0SRJqlzUxI1h3ZZTlwnrpwQQvQpm8r4Rw_xfaRCduWIZ9kmnzfRKMUvS5cRXR9lbcdDBgTNI-Cs4Quac14TBnGsC5rXRXZOwIemBNTQV8_3ypSGu-Qiat09ViZzuSaPEehEx8H36vuhXd63BIzgn1K7Am6k-YBBvgePpF6NGbnsMYa-4n0qaX8yNEmI=w16383',
    fontFamily: '"Kirsty", "Cinzel Decorative", serif'
  },
  original: {
    name: 'Dark Mode',
    midnight: '#0a1128',
    eyes: '#ffeb3b',
    gold: '#ffd700',
    pixel: false,
    bg: 'https://picsum.photos/1920/1080?random=1',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiNmZmQ3MDAiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjE2IiB5PSIyMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMDAwIj7wn6UgL3RleHQ+Cjwvc3ZnPgo=',
    fontFamily: '"Cinzel Decorative", serif'
  },
  classic: {
    name: 'Classic Meta Knight (8-Bit)',
    midnight: '#2a1b4d',
    eyes: '#fdff9a',
    gold: '#ffda44',
    pixel: true,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/argb6b7heiv81.png',
    logo: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/meta-knights-galaxia-sword-v0-pratfn5zqwbb1-removebg-preview.png',
    fontFamily: '"Press Start 2P", cursive'
  },
  dark: {
    name: 'Dark Meta Knight',
    midnight: '#111827',
    eyes: '#ef4444',
    gold: '#ff2a50',
    pixel: false,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/RaFxim.webp',
    logo: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/yr10lm032g111-removebg-preview.png',
    fontFamily: '"Goudy Medieval", "Uncial Antiqua", serif'
  },
  galacta: {
    name: 'Galacta Knight',
    midnight: '#2d0a1a',
    eyes: '#ffffff',
    gold: '#ff8eb1',
    pixel: false,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/Galacta-Knight-peak.jpg',
    logo: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/galacta-knight.png',
    fontFamily: '"Kirsty", "Cinzel Decorative", serif'
  },
  morpho: {
    name: 'Morpho Knight',
    midnight: '#1a0505',
    eyes: '#ff7700',
    gold: '#ff4d00',
    pixel: false,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/morpho-knight.jpeg',
    logo: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/Morpho_Knight_icon.webp',
    fontFamily: '"Luminari", fantasy'
  },
  mecha: {
    name: 'Mecha Knight',
    midnight: '#0b162a',
    eyes: '#00ffff',
    gold: '#00ffff',
    pixel: false,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/KPR_Mecha_Knight_Infobox.jpg',
    logo: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/mecha-knight-icon.png',
    fontFamily: '"Orbitron", sans-serif'
  },
  phantom: {
    name: 'Phantom Meta Knight',
    midnight: '#130a1e',
    eyes: '#00fff2',
    gold: '#00fff2',
    pixel: false,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/Phantom_MK-Picsart-AiImageEnhancer.webp',
    logo: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/FL_Phantom_MK-modified.png',
    fontFamily: '"Exo 2", sans-serif',
    fontStyle: 'italic'
  },
  parallel: {
    name: 'Parallel Meta Knight',
    midnight: '#121212',
    eyes: '#ffeb3b',
    gold: '#ffeb3b',
    pixel: false,
    bg: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/Parallel_Meta_Knight_Splash_Screen.webp',
    logo: 'https://cdn.jsdelivr.net/gh/MKPlaza/MKPlaza.github.io@main/Ds6OqHcWwAAmiNu-modified.png',
    fontFamily: '"Beleren", serif'
  }
};

export const CLOAKS: Record<string, CloakOption> = {
  classroom: { title: "Classes", icon: "https://cdn.jsdelivr.net/gh/samtheskeleton/random-things@main/Google_Classroom_Logo.png" },
  clever: { title: "Clever | Portal", icon: "https://www.google.com/s2/favicons?domain=clever.com&sz=64" },
  edpuzzle: { title: "Edpuzzle", icon: "https://www.google.com/s2/favicons?domain=edpuzzle.com&sz=64" },
  ixl: { title: "IXL | Personalized Learning", icon: "https://www.google.com/s2/favicons?domain=ixl.com&sz=64" },
  gmail: { title: "Gmail", icon: "https://cdn.jsdelivr.net/gh/samtheskeleton/random-things@main/Gmail_icon_(2020).svg.webp" },
  docs: { title: "Google Docs", icon: "https://cdn.jsdelivr.net/gh/samtheskeleton/random-things@main/google-docs-icon-logo-symbol-free-png.webp" },
  slides: { title: "Google Slides", icon: "https://www.google.com/s2/favicons?domain=slides.google.com&sz=64" },
  khan: { title: "Khan Academy", icon: "https://www.google.com/s2/favicons?domain=khanacademy.org&sz=64" },
  desmos: { title: "Desmos | Graphing Calculator", icon: "https://www.google.com/s2/favicons?domain=desmos.com&sz=64" },
  canvas: { title: "Dashboard", icon: "https://www.google.com/s2/favicons?domain=canvas.instructure.com&sz=64" },
  google: { title: "Google", icon: "https://www.google.com/s2/favicons?domain=google.com&sz=64" },
  drive: { title: "My Drive - Google Drive", icon: "https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_4.ico" }
};

/* Music removed */

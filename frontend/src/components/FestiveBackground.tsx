import { useMemo } from 'react';

// Muted color Christmas elements
const SantaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <circle cx="32" cy="26" r="14" fill="#C27070" />
    <circle cx="32" cy="42" r="10" fill="#F5DEB3" />
    <ellipse cx="32" cy="50" rx="8" ry="5" fill="#F0F0F0" />
    <circle cx="32" cy="14" r="7" fill="#F0F0F0" />
    <circle cx="40" cy="11" r="4" fill="#F0F0F0" />
    <circle cx="28" cy="40" r="1.5" fill="#555" />
    <circle cx="36" cy="40" r="1.5" fill="#555" />
  </svg>
);

const SleighIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 90 50" className={className} fill="none">
    <path d="M10 35 Q3 35 3 28 L3 18 Q3 10 18 10 L70 10 Q85 10 85 18 L85 28 Q85 35 78 35 Z" fill="#C27070" />
    <path d="M3 38 Q-3 38 -3 32 L-3 28 Q-3 24 5 24 L83 24 Q90 24 90 30 L90 34 Q90 38 83 38 Z" fill="#A85858" />
    <ellipse cx="15" cy="44" rx="6" ry="3" fill="#7A5C3E" />
    <ellipse cx="73" cy="44" rx="6" ry="3" fill="#7A5C3E" />
  </svg>
);

const ReindeerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 55 55" className={className} fill="none">
    <ellipse cx="27" cy="32" rx="14" ry="10" fill="#9A8060" />
    <circle cx="27" cy="18" r="9" fill="#A89070" />
    <circle cx="27" cy="14" r="4" fill="#C27070" />
    <path d="M18 10 L12 0 M18 10 L14 3 M18 10 L20 4" stroke="#6B5040" strokeWidth="2.5" fill="none" />
    <path d="M36 10 L42 0 M36 10 L40 3 M36 10 L34 4" stroke="#6B5040" strokeWidth="2.5" fill="none" />
    <ellipse cx="20" cy="44" rx="3" ry="5" fill="#6B5040" />
    <ellipse cx="34" cy="44" rx="3" ry="5" fill="#6B5040" />
  </svg>
);

const TreeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 65" className={className} fill="none">
    <polygon points="25,0 45,22 36,22 50,42 32,42 32,60 18,60 18,42 0,42 14,22 5,22" fill="#4A7A4A" />
    <rect x="18" y="55" width="14" height="10" fill="#7A5C3E" />
    <polygon points="25,0 40,18 33,18 45,35 30,35 30,42 20,42 20,35 5,35 17,18 10,18" fill="#5A8A5A" />
    <circle cx="25" cy="6" r="4" fill="#E8C860" />
    <circle cx="18" cy="18" r="3" fill="#C27070" />
    <circle cx="32" cy="16" r="2.5" fill="#E8C860" />
    <circle cx="22" cy="28" r="3" fill="#7090B0" />
    <circle cx="35" cy="30" r="2.5" fill="#C27070" />
  </svg>
);

const GiftIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 45 50" className={className} fill="none">
    <rect x="3" y="15" width="39" height="32" rx="3" fill="#C27070" />
    <rect x="3" y="8" width="39" height="12" rx="3" fill="#A85858" />
    <rect x="18" y="8" width="9" height="39" fill="#4A7A4A" />
    <rect x="3" y="12" width="39" height="8" fill="#4A7A4A" />
    <ellipse cx="22.5" cy="6" rx="6" ry="5" fill="#4A7A4A" />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 30 30" className={className} fill="none">
    <polygon points="15,0 18.5,11 30,11 21,18 24,30 15,22 6,30 9,18 0,11 11.5,11" fill="#E8C860" />
    <polygon points="15,4 17,11 24,11 18.5,16 20.5,24 15,19 9.5,24 11.5,16 6,11 13,11" fill="#F0D878" />
  </svg>
);

const SnowflakeBgIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 30 30" className={className} fill="none" stroke="#A0C0D8" strokeWidth="1.5">
    <line x1="15" y1="2" x2="15" y2="28" />
    <line x1="2" y1="15" x2="28" y2="15" />
    <line x1="5" y1="5" x2="25" y2="25" />
    <line x1="25" y1="5" x2="5" y2="25" />
    <circle cx="15" cy="15" r="2.5" fill="#A0C0D8" />
  </svg>
);

interface FestiveElement {
  id: number;
  type: 'santa' | 'sleigh' | 'reindeer' | 'tree' | 'gift' | 'star' | 'snowflake';
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  animationDelay: number;
  zLayer: number;
}

const FestiveBackground = () => {
  const elements = useMemo<FestiveElement[]>(() => {
    const items: FestiveElement[] = [];
    
    // Generate dense background elements
    for (let i = 0; i < 90; i++) {
      const typeRoll = Math.random();
      let type: FestiveElement['type'];
      let zLayer: number;
      
      if (typeRoll < 0.14) {
        type = 'santa';
        zLayer = 1;
      } else if (typeRoll < 0.28) {
        type = 'reindeer';
        zLayer = 3;
      } else if (typeRoll < 0.40) {
        type = 'sleigh';
        zLayer = 2;
      } else if (typeRoll < 0.55) {
        type = 'tree';
        zLayer = Math.random() > 0.5 ? 1 : 2;
      } else if (typeRoll < 0.70) {
        type = 'gift';
        zLayer = Math.random() > 0.5 ? 2 : 3;
      } else if (typeRoll < 0.85) {
        type = 'star';
        zLayer = Math.floor(Math.random() * 3) + 1;
      } else {
        type = 'snowflake';
        zLayer = Math.floor(Math.random() * 3) + 1;
      }
      
      // Opacity strictly between 0.25 and 0.30
      const baseOpacity = 0.25 + Math.random() * 0.05;
      
      items.push({
        id: i,
        type,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: type === 'star' ? 18 + Math.random() * 28 : 35 + Math.random() * 55,
        opacity: baseOpacity,
        rotation: Math.random() * 30 - 15,
        animationDelay: Math.random() * 12,
        zLayer,
      });
    }
    
    return items.sort((a, b) => a.zLayer - b.zLayer);
  }, []);

  const renderElement = (type: FestiveElement['type']) => {
    switch (type) {
      case 'santa':
        return <SantaIcon className="w-full h-full" />;
      case 'sleigh':
        return <SleighIcon className="w-full h-full" />;
      case 'reindeer':
        return <ReindeerIcon className="w-full h-full" />;
      case 'tree':
        return <TreeIcon className="w-full h-full" />;
      case 'gift':
        return <GiftIcon className="w-full h-full" />;
      case 'star':
        return <StarIcon className="w-full h-full" />;
      case 'snowflake':
        return <SnowflakeBgIcon className="w-full h-full" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Warm snow-sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,20%,97%)] via-background to-[hsl(30,15%,95%)]" />
      
      {/* Unified festive background layer */}
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-slow"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: el.size * (el.zLayer === 1 ? 0.85 : el.zLayer === 3 ? 1.1 : 1),
            height: el.size * (el.zLayer === 1 ? 0.85 : el.zLayer === 3 ? 1.1 : 1),
            opacity: el.opacity,
            transform: `rotate(${el.rotation}deg) translate(-50%, -50%)`,
            animationDelay: `${el.animationDelay}s`,
            animationDuration: `${14 + Math.random() * 8}s`,
            zIndex: el.zLayer,
          }}
        >
          {renderElement(el.type)}
        </div>
      ))}
      
      {/* Large corner decorations for depth */}
      <div className="absolute -top-8 -left-8 w-52 h-52 opacity-[0.27] rotate-12" style={{ zIndex: 1 }}>
        <TreeIcon className="w-full h-full" />
      </div>
      <div className="absolute top-20 -right-10 w-40 h-40 opacity-[0.26] -rotate-8" style={{ zIndex: 1 }}>
        <SantaIcon className="w-full h-full" />
      </div>
      <div className="absolute -bottom-10 -left-10 w-56 h-56 opacity-[0.28]" style={{ zIndex: 3 }}>
        <ReindeerIcon className="w-full h-full" />
      </div>
      <div className="absolute -bottom-8 -right-8 w-60 h-60 opacity-[0.27] rotate-6" style={{ zIndex: 2 }}>
        <SleighIcon className="w-full h-full" />
      </div>
      <div className="absolute top-1/3 -left-6 w-40 h-40 opacity-[0.26] rotate-10" style={{ zIndex: 2 }}>
        <GiftIcon className="w-full h-full" />
      </div>
      <div className="absolute top-1/4 -right-6 w-36 h-36 opacity-[0.27] -rotate-12" style={{ zIndex: 1 }}>
        <TreeIcon className="w-full h-full" />
      </div>
      
      {/* Twinkling stars scattered throughout */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`star-twinkle-${i}`}
          className="absolute animate-twinkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 12 + Math.random() * 20,
            height: 12 + Math.random() * 20,
            opacity: 0.25 + Math.random() * 0.05,
            animationDelay: `${i * 0.2}s`,
            zIndex: Math.floor(Math.random() * 3) + 1,
          }}
        >
          <StarIcon className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default FestiveBackground;

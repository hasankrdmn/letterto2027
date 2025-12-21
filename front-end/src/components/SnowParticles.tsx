import { useMemo } from 'react';

interface Snowflake {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
  drift: number;
  layer: 'back' | 'mid' | 'front';
}

const SnowParticles = () => {
  const snowflakes = useMemo<Snowflake[]>(() => {
    const flakes: Snowflake[] = [];
    
    // Back layer - slower, smaller, less opaque
    for (let i = 0; i < 40; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 6,
        size: 2 + Math.random() * 4,
        opacity: 0.3 + Math.random() * 0.2,
        drift: -15 + Math.random() * 30,
        layer: 'back',
      });
    }
    
    // Mid layer - medium speed and size
    for (let i = 40; i < 90; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 5,
        size: 4 + Math.random() * 5,
        opacity: 0.45 + Math.random() * 0.25,
        drift: -20 + Math.random() * 40,
        layer: 'mid',
      });
    }
    
    // Front layer - faster, larger, more visible
    for (let i = 90; i < 130; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 4,
        size: 5 + Math.random() * 7,
        opacity: 0.55 + Math.random() * 0.3,
        drift: -30 + Math.random() * 60,
        layer: 'front',
      });
    }
    
    return flakes;
  }, []);

  const getZIndex = (layer: Snowflake['layer']) => {
    switch (layer) {
      case 'back': return 2;
      case 'mid': return 12;
      case 'front': return 22;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(245,248,255,0.7) 60%, rgba(230,240,255,0.3) 100%)',
            animation: `snowfall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            ['--drift' as string]: `${flake.drift}px`,
            boxShadow: flake.layer === 'front' 
              ? '0 0 6px rgba(255,255,255,0.8), 0 0 2px rgba(255,255,255,1)' 
              : '0 0 3px rgba(255,255,255,0.5)',
            zIndex: getZIndex(flake.layer),
          }}
        />
      ))}
    </div>
  );
};

export default SnowParticles;

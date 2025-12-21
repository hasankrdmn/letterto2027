import { useEffect, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scrollY: number;
}

const CursorSanta = () => {
  const [reindeerPos, setReindeerPos] = useState<Position>({
    x: 200,
    y: 200,
    targetX: 200,
    targetY: 200,
    scrollY: 0,
  });
  
  const [santaPos, setSantaPos] = useState<Position>({
    x: 200,
    y: 200,
    targetX: 200,
    targetY: 200,
    scrollY: 0,
  });

  const [bobOffset, setBobOffset] = useState({ x: 0, y: 0 });
  const [swayAngle, setSwayAngle] = useState(0);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const targetX = e.clientX;
      const targetY = e.clientY + window.scrollY;
      
      setReindeerPos(prev => ({ ...prev, targetX, targetY }));
      setSantaPos(prev => ({ ...prev, targetX: targetX - 80, targetY: targetY + 10 }));
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setReindeerPos(prev => ({ ...prev, scrollY }));
      setSantaPos(prev => ({ ...prev, scrollY }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animate positions with different easing
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      // Reindeer - faster response (0.08 easing)
      setReindeerPos(prev => ({
        ...prev,
        x: prev.x + (prev.targetX - prev.x) * 0.08,
        y: prev.y + (prev.targetY - prev.scrollY - prev.y) * 0.08,
      }));
      
      // Santa - slower, heavier movement (0.04 easing)
      setSantaPos(prev => ({
        ...prev,
        x: prev.x + (prev.targetX - prev.x) * 0.04,
        y: prev.y + (prev.targetY - prev.scrollY - prev.y) * 0.04,
      }));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Bobbing and swaying animation
  useEffect(() => {
    let time = 0;
    let animationId: number;
    
    const animateBob = () => {
      time += 0.02;
      setBobOffset({
        x: Math.sin(time * 1.5) * 8,
        y: Math.sin(time * 2) * 5,
      });
      setSwayAngle(Math.sin(time * 1.2) * 3);
      animationId = requestAnimationFrame(animateBob);
    };
    
    animationId = requestAnimationFrame(animateBob);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const isVisible = reindeerPos.targetX !== 200 || reindeerPos.targetY !== 200;

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {/* Santa - Back layer (slower, heavier) */}
      <div
        className="absolute transition-opacity duration-500"
        style={{
          left: santaPos.x + bobOffset.x * 0.6 - 50,
          top: santaPos.y + bobOffset.y * 0.8 - 25,
          opacity: isVisible ? 0.9 : 0,
          transform: `rotate(${swayAngle * 0.5}deg)`,
        }}
      >
        <svg viewBox="0 0 100 80" className="w-24 h-20 drop-shadow-lg">
          {/* Sleigh */}
          <g transform="translate(10, 30)">
            <path d="M5 25 Q0 25 0 18 L0 10 Q0 3 12 3 L65 3 Q78 3 78 10 L78 18 Q78 25 72 25 Z" fill="#C94C4C" />
            <path d="M0 28 Q-5 28 -5 22 L-5 20 Q-5 17 3 17 L75 17 Q82 17 82 22 L82 25 Q82 28 75 28 Z" fill="#A43939" />
            <ellipse cx="12" cy="32" rx="5" ry="2.5" fill="#6B4423" />
            <ellipse cx="66" cy="32" rx="5" ry="2.5" fill="#6B4423" />
          </g>
          
          {/* Santa on sleigh */}
          <g transform="translate(35, 8)">
            <circle cx="20" cy="14" r="10" fill="#C94C4C" />
            <circle cx="20" cy="26" r="6" fill="#FFE4C4" />
            <ellipse cx="20" cy="32" rx="5" ry="3" fill="#FFFFFF" />
            <circle cx="20" cy="6" r="5" fill="#FFFFFF" />
            <circle cx="27" cy="3" r="3" fill="#FFFFFF" />
            {/* Face */}
            <circle cx="17" cy="24" r="1" fill="#333" />
            <circle cx="23" cy="24" r="1" fill="#333" />
            <path d="M18 27 Q20 29 22 27" stroke="#333" strokeWidth="0.8" fill="none" />
            {/* Gift bag */}
            <ellipse cx="38" cy="22" rx="8" ry="10" fill="#C94C4C" opacity="0.9" />
            <rect x="34" y="14" width="8" height="4" rx="1" fill="#2D6B2D" />
          </g>
          
          {/* Connection rope */}
          <path d="M10 42 Q-10 40 -30 38" stroke="#8B4513" strokeWidth="2" fill="none" strokeDasharray="4 2" />
        </svg>
      </div>

      {/* Reindeer - Front layer (faster, leads the way) */}
      <div
        className="absolute transition-opacity duration-500"
        style={{
          left: reindeerPos.x + bobOffset.x - 70,
          top: reindeerPos.y + bobOffset.y - 30,
          opacity: isVisible ? 0.95 : 0,
          transform: `rotate(${swayAngle}deg)`,
        }}
      >
        <svg viewBox="0 0 140 60" className="w-32 h-14 drop-shadow-lg">
          {/* Reindeer 1 (front) */}
          <g transform="translate(85, 12)">
            <ellipse cx="20" cy="22" rx="12" ry="7" fill="#A0722D" />
            <circle cx="20" cy="12" r="6" fill="#B8860B" />
            <circle cx="23" cy="9" r="2.5" fill="#C41E3A" />
            <path d="M14 7 L8 -2 M14 7 L10 0 M14 7 L16 1" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M26 7 L32 -2 M26 7 L30 0 M26 7 L24 1" stroke="#5D4037" strokeWidth="2" fill="none" />
            <ellipse cx="14" cy="32" rx="2" ry="4" fill="#5D4037" />
            <ellipse cx="26" cy="32" rx="2" ry="4" fill="#5D4037" />
            {/* Eyes */}
            <circle cx="17" cy="11" r="1.5" fill="#333" />
            <circle cx="23" cy="11" r="1.5" fill="#333" />
          </g>
          
          {/* Reindeer 2 (middle) */}
          <g transform="translate(45, 8)">
            <ellipse cx="20" cy="22" rx="12" ry="7" fill="#8B6914" />
            <circle cx="20" cy="12" r="6" fill="#A07830" />
            <circle cx="23" cy="9" r="2.5" fill="#C41E3A" />
            <path d="M14 7 L8 -2 M14 7 L10 0 M14 7 L16 1" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M26 7 L32 -2 M26 7 L30 0 M26 7 L24 1" stroke="#5D4037" strokeWidth="2" fill="none" />
            <ellipse cx="14" cy="32" rx="2" ry="4" fill="#5D4037" />
            <ellipse cx="26" cy="32" rx="2" ry="4" fill="#5D4037" />
            <circle cx="17" cy="11" r="1.5" fill="#333" />
            <circle cx="23" cy="11" r="1.5" fill="#333" />
          </g>
          
          {/* Reindeer 3 (lead - Rudolph) */}
          <g transform="translate(5, 15)">
            <ellipse cx="20" cy="22" rx="11" ry="6" fill="#A0722D" />
            <circle cx="20" cy="12" r="5.5" fill="#B8860B" />
            <circle cx="23" cy="10" r="3" fill="#FF4444" />
            <path d="M14 8 L9 -1 M14 8 L11 1 M14 8 L16 2" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M26 8 L31 -1 M26 8 L29 1 M26 8 L24 2" stroke="#5D4037" strokeWidth="2" fill="none" />
            <ellipse cx="14" cy="30" rx="2" ry="3.5" fill="#5D4037" />
            <ellipse cx="26" cy="30" rx="2" ry="3.5" fill="#5D4037" />
            <circle cx="17" cy="11" r="1.5" fill="#333" />
            <circle cx="23" cy="11" r="1.5" fill="#333" />
          </g>
          
          {/* Connection ropes */}
          <path d="M65 28 L85 26" stroke="#8B4513" strokeWidth="1.5" fill="none" />
          <path d="M105 28 L130 32" stroke="#8B4513" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default CursorSanta;

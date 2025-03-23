
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    let animationFrameId: number;
    
    const updateMousePosition = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const animateCursor = () => {
      // Smoothly interpolate between current position and target position
      setPosition(prev => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.1,
        y: prev.y + (targetPosition.y - prev.y) * 0.1
      }));
      
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Start animation loop
    animationFrameId = requestAnimationFrame(animateCursor);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, targetPosition]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className="fixed pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease'
      }}
    >
      <div className={`
        w-64 h-64 rounded-full opacity-20 blur-3xl 
        ${theme === 'dark' ? 'bg-white/30' : 'bg-primary/20'}
        transition-all duration-700 ease-out
      `} />
    </div>
  );
};

export default CursorEffect;

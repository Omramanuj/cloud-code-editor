'use client';
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export interface ResizerProps {
  orientation: 'horizontal' | 'vertical';
  onResize: (delta: number) => void;
  className?: string;
}

export const Resizer: React.FC<ResizerProps> = ({
  orientation,
  onResize,
  className,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const startPosRef = useRef<number>(0);
  const startSizeRef = useRef<number>(0);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = orientation === 'horizontal'
        ? startPosRef.current - e.clientY
        : e.clientX - startPosRef.current;
      onResize(delta);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, orientation, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startPosRef.current = orientation === 'horizontal' ? e.clientY : e.clientX;
  };

  return (
    <div
      className={cn(
        'bg-white/5 hover:bg-white/10 transition-colors cursor-resize',
        orientation === 'horizontal' ? 'h-1 cursor-ns-resize' : 'w-1 cursor-ew-resize',
        className
      )}
      onMouseDown={handleMouseDown}
    />
  );
};

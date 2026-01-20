'use client';
import React from 'react';
import { cn } from '../../utils/cn';

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  blur?: number;
  opacity?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  enableGlass?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  blur = 10,
  opacity = 0.7,
  backgroundColor = 'rgba(17, 24, 39, 0.7)',
  borderColor = 'rgba(255, 255, 255, 0.1)',
  borderWidth = 1,
  enableGlass = true,
  style,
  ...props
}) => {
  const glassStyles = enableGlass
    ? {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)` as any,
        backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    : {};

  return (
    <div
      className={cn('rounded-lg', className)}
      style={{ ...glassStyles, ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

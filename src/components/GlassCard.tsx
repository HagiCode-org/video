// GlassCard - Glassmorphism card component
import React from 'react';
import { glass, colors } from '../utils/theme';

export interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'card' | 'panel';
  glow?: boolean;
  accent?: boolean;
  style?: React.CSSProperties;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'card',
  glow = false,
  accent = false,
  style = {},
}) => {
  const baseStyle = variant === 'card' ? glass.card : glass.panel;

  return (
    <div
      style={{
        ...baseStyle,
        borderRadius: '16px',
        padding: variant === 'card' ? '40px' : '32px',
        position: 'relative',
        overflow: 'hidden',
        ...(glow && {
          boxShadow: `0 0 40px ${accent ? colors.secondary.glow : colors.primary.glow}`,
        }),
        ...(accent && {
          borderColor: colors.border.accent,
        }),
        ...style,
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: accent
            ? `linear-gradient(180deg, ${colors.secondary.glow}20 0%, transparent 100%)`
            : `linear-gradient(180deg, ${colors.primary.glow}15 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

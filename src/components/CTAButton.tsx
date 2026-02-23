// CTAButton component - Call-to-action button
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../utils/theme';

export interface CTAButtonProps {
  text: string;
  url: string;
  variant?: 'primary' | 'secondary';
  size?: 'large' | 'medium';
  delay?: number;
  pulse?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  text,
  url,
  variant = 'primary',
  size = 'large',
  delay = 0,
  pulse = true,
}) => {
  const frame = useCurrentFrame();

  // Fade in animation
  const opacity = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Pulse effect (subtle scale animation) - using pure calculation based on frame
  // Disable linter warning for Math.sin usage - this is deterministic based on frame
  const pulseScale = pulse
    ? 1 + Math.sin((frame - delay) * 0.1) * 0.02
    : 1;

  // Size styles
  const sizeStyles: Record<string, React.CSSProperties> = {
    large: {
      padding: '20px 48px',
      fontSize: '32px',
    },
    medium: {
      padding: '16px 36px',
      fontSize: '24px',
    },
  };

  // Variant styles
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
      color: '#ffffff',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: colors.text.primary,
      border: `2px solid ${colors.primary.from}`,
    },
  };

  return (
    <div
      style={{
        opacity,
        transform: `scale(${pulseScale})`,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          ...sizeStyles[size],
          ...variantStyles[variant],
          fontWeight: 600,
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        {text}
        <span style={{ marginLeft: '12px', opacity: 0.7 }}>
          {'→'}
        </span>
      </div>
      <div
        style={{
          fontSize: '18px',
          color: colors.text.muted,
          marginTop: '8px',
          textAlign: 'center',
        }}
      >
        {url}
      </div>
    </div>
  );
};

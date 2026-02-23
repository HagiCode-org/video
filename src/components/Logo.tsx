// Logo component - Hagicode text-based brand logo
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../utils/theme';

export interface LogoProps {
  variant?: 'full' | 'wordmark' | 'minimal';
  size?: number;
  animation?: 'fade' | 'scale' | 'reveal' | 'gradient';
  showTagline?: boolean;
  useGradient?: boolean;
  tagline?: string;
  delay?: number;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size,
  animation = 'scale',
  showTagline = false,
  useGradient = true,
  tagline = 'AI 驱动的智能开发平台',
  delay = 0,
}) => {
  const frame = useCurrentFrame();

  // Animation values - always calculate in same order
  const scaleProgress = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });
  const fadeProgress = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });

  const scale = animation === 'scale' ? scaleProgress : 1;
  const opacity = animation === 'fade' ? fadeProgress : 1;

  // Determine size based on variant
  const fontSize = size || (variant === 'full' ? 120 : variant === 'wordmark' ? 100 : 48);

  // Gradient style
  const gradientStyle: React.CSSProperties = useGradient
    ? {
        background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }
    : {
        color: colors.text.primary,
      };

  // Tagline animation (fades in after logo)
  const taglineDelay = delay + 30;
  const taglineOpacity = interpolate(frame, [taglineDelay, taglineDelay + 30], [0, 1], { extrapolateRight: 'clamp' });

  const shouldShowTagline = showTagline && tagline && taglineOpacity > 0;

  return (
    <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
      <div
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          ...gradientStyle,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        Hagicode
      </div>
      {shouldShowTagline && (
        <div
          style={{
            fontSize: '36px',
            color: colors.text.secondary,
            fontWeight: 400,
            opacity: taglineOpacity,
          }}
        >
          {tagline}
        </div>
      )}
    </AbsoluteFill>
  );
};

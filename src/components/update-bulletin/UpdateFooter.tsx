// UpdateFooter component - Footer section for update bulletin video
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, random } from 'remotion';
import { Logo } from '../Logo';
import { colors, typography } from '../../utils/theme';

export interface UpdateFooterProps {
  tagline?: string;
  delay?: number;
}

export const UpdateFooter: React.FC<UpdateFooterProps> = ({
  tagline = '感谢使用，持续更新中...',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Background gradient transition
  const bgGradient = interpolate(
    effectiveFrame,
    [0, 60],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Logo scale animation from center
  const logoSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 1,
    },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);

  // Tagline fade in with delay
  const taglineDelay = 30;
  const taglineOpacity = interpolate(
    effectiveFrame,
    [taglineDelay, taglineDelay + 30],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const taglineY = interpolate(
    effectiveFrame,
    [taglineDelay, taglineDelay + 30],
    [30, 0],
    { extrapolateRight: 'clamp' }
  );

  // Decorative particles - use random with null for seed to allow per-frame variation
  const particleCount = 8;
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      return {
        id: i,
        x: Math.cos(angle) * 400,
        y: Math.sin(angle) * 300,
        size: 4 + random(null) * 8,
        delay: 20 + i * 5,
      };
    });
  }, []);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, ${colors.background.medium} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colors.primary.glow} 0%, transparent 60%)`,
          opacity: bgGradient * 0.15,
        }}
      />

      {/* Decorative particles */}
      {particles.map((particle) => {
        const particleOpacity = interpolate(
          effectiveFrame,
          [particle.delay, particle.delay + 30],
          [0, 0.6],
          { extrapolateRight: 'clamp' }
        );

        const particleScale = interpolate(
          effectiveFrame,
          [particle.delay, particle.delay + 30],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: particle.size,
              height: particle.size,
              background: colors.primary.from,
              borderRadius: '50%',
              opacity: particleOpacity,
              transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px)) scale(${particleScale})`,
            }}
          />
        );
      })}

      {/* Logo component - reusing existing Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <Logo
          variant="wordmark"
          size={100}
          animation="fade"
          showTagline={false}
          delay={0}
        />
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: typography.fontSize.bodyLarge,
          color: colors.text.secondary,
          fontWeight: typography.fontWeight.normal,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: 'center',
        }}
      >
        {tagline}
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: '300px',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.primary.from}, ${colors.secondary.to}, transparent)`,
          opacity: interpolate(effectiveFrame, [45, 75], [0, 0.8], {
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

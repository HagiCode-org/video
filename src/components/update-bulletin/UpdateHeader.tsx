// UpdateHeader component - Header section for update bulletin video
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { colors, typography } from '../../utils/theme';

export interface UpdateHeaderProps {
  version: string;
  releaseDate: string;
  delay?: number;
}

export const UpdateHeader: React.FC<UpdateHeaderProps> = ({
  version,
  releaseDate,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Logo spring animation - fade in + scale from above
  const logoSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    },
  });

  // Logo position - slides from top
  const logoY = interpolate(logoSpring, [0, 1], [-100, 0]);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.8, 1]);

  // Subtitle (version info) slides from bottom
  const subtitleDelay = 15;
  const subtitleProgress = spring({
    frame: Math.max(0, effectiveFrame - subtitleDelay),
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
    },
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [100, 0]);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, ${colors.background.medium} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '60px',
      }}
    >
      {/* Logo/Title */}
      <div
        style={{
          transform: `translateY(${logoY}px) scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        {/* "Hagicode 更新简报" text */}
        <div
          style={{
            fontSize: typography.fontSize.hero,
            fontWeight: typography.fontWeight.bold,
            fontFamily: typography.fontFamily.heading,
            background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '20px',
            textShadow: `0 0 60px ${colors.primary.glow}`,
          }}
        >
          Hagicode
        </div>
        <div
          style={{
            fontSize: typography.fontSize.title,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.body,
            color: colors.text.secondary,
            textAlign: 'center',
          }}
        >
          更新简报
        </div>
      </div>

      {/* Version and Date */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
        }}
      >
        <div
          style={{
            fontSize: typography.fontSize.subtitle,
            fontWeight: typography.fontWeight.medium,
            fontFamily: typography.fontFamily.mono,
            background: `linear-gradient(135deg, ${colors.secondary.from} 0%, ${colors.secondary.to} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {version}
        </div>
        <div
          style={{
            width: '2px',
            height: '40px',
            background: colors.border.medium,
          }}
        />
        <div
          style={{
            fontSize: typography.fontSize.bodyLarge,
            fontWeight: typography.fontWeight.normal,
            fontFamily: typography.fontFamily.mono,
            color: colors.text.secondary,
          }}
        >
          {releaseDate}
        </div>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: '200px',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.primary.from}, transparent)`,
          opacity: interpolate(effectiveFrame, [30, 60], [0, 0.6], {
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

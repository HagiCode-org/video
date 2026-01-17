// Welcome component - Welcome/Intro page for update bulletin video
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Logo } from '../Logo';
import { colors, typography } from '../../utils/theme';

export interface WelcomeProps {
  title?: string;
  subtitle?: string;
  version?: string;
  delay?: number;
}

export const Welcome: React.FC<WelcomeProps> = ({
  title = 'Hagicode',
  subtitle = '更新简报',
  version,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Logo scale pulse animation (starts visible, pulses to highlight)
  const logoSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    },
  });

  // Logo starts at 1 (visible), scales up to 1.1 and back to 1
  const logoScale = interpolate(logoSpring, [0, 0.5, 1], [1, 1.1, 1]);

  // Title subtle pulse effect
  const titleScale = interpolate(effectiveFrame, [0, 60, 120], [1, 1.02, 1], {
    extrapolateRight: 'clamp',
  });

  // Subtle glow pulse
  const glowIntensity = interpolate(effectiveFrame, [0, 90, 180], [0.3, 0.6, 0.3], {
    extrapolateRight: 'clamp',
  });

  // Version badge slide down animation
  const versionSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
    },
  });
  const versionY = interpolate(versionSpring, [0, 1], [-20, 0]);
  const versionOpacity = interpolate(versionSpring, [0, 1], [0.8, 1]);

  // Decorative line expand animation
  const lineWidth = interpolate(effectiveFrame, [0, 45], [0, 400], {
    extrapolateRight: 'clamp',
  });
  const lineOpacity = interpolate(effectiveFrame, [0, 30], [0, 0.8], {
    extrapolateRight: 'clamp',
  });

  // Decorative particles - subtle rotation and pulse
  const particleCount = 12;
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 350 + Math.random() * 150;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 3 + Math.random() * 6,
        delay: i * 2,
      };
    });
  }, []);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background.dark} 0%, ${colors.background.medium} 50%, ${colors.background.light} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colors.primary.glow} 0%, transparent 50%)`,
          opacity: glowIntensity * 0.2,
        }}
      />

      {/* Decorative particles - already visible, subtle pulse */}
      {particles.map((particle) => {
        const particlePulse = interpolate(
          effectiveFrame,
          [particle.delay, particle.delay + 60],
          [0.4, 0.7],
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
              opacity: particlePulse,
              transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
            }}
          />
        );
      })}

      {/* Logo - starts visible with scale pulse */}
      <div
        style={{
          transform: `scale(${logoScale})`,
        }}
      >
        <Logo
          variant="wordmark"
          size={140}
          animation="scale"
          showTagline={false}
          delay={0}
        />
      </div>

      {/* Title - starts visible with subtle pulse */}
      <div
        style={{
          fontSize: typography.fontSize.hero,
          fontWeight: typography.fontWeight.bold,
          fontFamily: typography.fontFamily.heading,
          background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 50%, ${colors.secondary.from} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textAlign: 'center',
          transform: `scale(${titleScale})`,
        }}
      >
        {title}
      </div>

      {/* Subtitle - always visible */}
      <div
        style={{
          fontSize: typography.fontSize.sectionTitle,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.body,
          color: colors.text.secondary,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </div>

      {/* Version badge - slides down */}
      {version && (
        <div
          style={{
            padding: '12px 32px',
            background: `linear-gradient(135deg, ${colors.secondary.from}20 0%, ${colors.secondary.to}20 100%)`,
            border: `2px solid ${colors.secondary.from}40`,
            borderRadius: '30px',
            opacity: versionOpacity,
            transform: `translateY(${versionY}px)`,
          }}
        >
          <span
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
          </span>
        </div>
      )}

      {/* Decorative line - expands from center */}
      <div
        style={{
          width: `${lineWidth}px`,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.primary.from}, ${colors.secondary.to}, transparent)`,
          opacity: lineOpacity,
        }}
      />
    </AbsoluteFill>
  );
};

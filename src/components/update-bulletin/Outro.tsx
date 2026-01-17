// Outro component - Enhanced ending page for update bulletin video
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing } from 'remotion';
import { Logo } from '../Logo';
import { colors, typography } from '../../utils/theme';

export interface OutroProps {
  title?: string;
  tagline?: string;
  website?: string;
  delay?: number;
}

export const Outro: React.FC<OutroProps> = ({
  title = '感谢使用',
  tagline = '持续更新中，敬请期待更多精彩功能',
  website = 'hagicode.com',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Logo scale pulse animation (starts visible)
  const logoSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 1,
    },
  });

  // Logo starts at 1 (visible), pulses to 1.08 and back to 1
  const logoScale = interpolate(logoSpring, [0, 0.6, 1], [1, 1.08, 1]);

  // Title subtle slide animation
  const titleSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
    },
  });
  const titleX = interpolate(titleSpring, [0, 1], [-15, 0]);

  // Website fade in
  const websiteSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
    },
  });
  const websiteOpacity = interpolate(websiteSpring, [0, 1], [0.85, 1]);

  // Subtle glow pulse
  const glowIntensity = interpolate(effectiveFrame, [0, 90, 180], [0.25, 0.5, 0.25], {
    extrapolateRight: 'clamp',
  });

  // Decorative particles orbiting - already visible
  const particleCount = 16;
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 400 + Math.random() * 100;
      return {
        id: i,
        angle,
        distance,
        size: 3 + Math.random() * 5,
        delay: i * 2,
        speed: 0.001 + Math.random() * 0.002,
      };
    });
  }, []);

  // Animated ring - pulse effect
  const ringScale = interpolate(effectiveFrame, [0, 90, 180], [0.95, 1.15, 0.95], {
    extrapolateRight: 'clamp',
    easing: Easing.sin,
  });
  const ringOpacity = interpolate(effectiveFrame, [0, 45], [0.2, 0.35], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, ${colors.background.medium} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '30px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${colors.primary.glow} 0%, transparent 70%)`,
          opacity: glowIntensity * 0.2,
        }}
      />

      {/* Animated ring */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          border: `2px solid ${colors.primary.from}`,
          borderRadius: '50%',
          opacity: ringOpacity,
          transform: `scale(${ringScale})`,
        }}
      />

      {/* Decorative particles - already visible with subtle pulse */}
      {particles.map((particle) => {
        const particlePulse = interpolate(
          effectiveFrame,
          [particle.delay, particle.delay + 60],
          [0.5, 0.75],
          { extrapolateRight: 'clamp' }
        );

        // Rotate particles
        const rotation = effectiveFrame * particle.speed * 100;
        const x = Math.cos(particle.angle + rotation * 0.01) * particle.distance;
        const y = Math.sin(particle.angle + rotation * 0.01) * particle.distance;

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: particle.size,
              height: particle.size,
              background: particle.id % 2 === 0 ? colors.primary.from : colors.secondary.from,
              borderRadius: '50%',
              opacity: particlePulse,
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          />
        );
      })}

      {/* Logo - starts visible with pulse */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          zIndex: 1,
        }}
      >
        <Logo
          variant="wordmark"
          size={120}
          animation="scale"
          showTagline={false}
          delay={0}
        />
      </div>

      {/* Title - starts visible with subtle slide */}
      <div
        style={{
          fontSize: typography.fontSize.sectionTitle,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.heading,
          color: colors.text.primary,
          transform: `translateX(${titleX}px)`,
          zIndex: 1,
        }}
      >
        {title}
      </div>

      {/* Tagline - always visible */}
      <div
        style={{
          maxWidth: '800px',
          fontSize: typography.fontSize.bodyLarge,
          color: colors.text.secondary,
          fontWeight: typography.fontWeight.normal,
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        {tagline}
      </div>

      {/* Website - fades in */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px 40px',
          background: `linear-gradient(135deg, ${colors.secondary.from}20 0%, ${colors.secondary.to}20 100%)`,
          border: `2px solid ${colors.secondary.from}40`,
          borderRadius: '40px',
          opacity: websiteOpacity,
          zIndex: 1,
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
          {website}
        </span>
      </div>

      {/* Decorative bottom line - expands */}
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          width: `${interpolate(effectiveFrame, [0, 60], [0, 500], { extrapolateRight: 'clamp' })}px`,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.primary.from}, ${colors.secondary.to}, transparent)`,
          opacity: interpolate(effectiveFrame, [0, 45], [0, 0.8], {
            extrapolateRight: 'clamp',
          }),
        }}
      />
    </AbsoluteFill>
  );
};

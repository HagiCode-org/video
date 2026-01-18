// AnimatedParticleBackground - Dynamic particle effect for tech aesthetics
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../utils/theme';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
}

export const AnimatedParticleBackground: React.FC<{
  particleCount?: number;
  color?: string;
}> = ({ particleCount = 30, color = colors.primary.from }) => {
  const frame = useCurrentFrame();

  // Generate static particles
  const particles: Particle[] = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 60,
    }));
  }, [particleCount]);

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {particles.map((particle) => {
        // Calculate opacity with fade in/out
        const opacity = interpolate(
          frame,
          [particle.delay, particle.delay + 30, particle.delay + 150, particle.delay + 180],
          [0, 1, 1, 0],
          { extrapolateRight: 'clamp' }
        );

        // Floating movement
        const yOffset = interpolate(
          frame,
          [0, 300],
          [0, -particle.speed * 300],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={particle.id}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y + yOffset,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: color,
              opacity: opacity * 0.6,
              filter: 'blur(1px)',
            }}
          />
        );
      })}

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: `
            linear-gradient(${colors.border.light} 1px, transparent 1px),
            linear-gradient(90deg, ${colors.border.light} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </AbsoluteFill>
  );
};

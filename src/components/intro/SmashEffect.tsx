// SmashEffect - Hagicode logo drop-in animation with complete shatter effect
// Creates a dramatic impact where problem cards are completely shattered into fragments
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring } from 'remotion';
import { colors } from '../../utils/theme';

export interface SmashEffectProps {
  triggerFrame: number;
  impactFrame: number;
  shatterCompleteFrame?: number;
}

export const SmashEffect: React.FC<SmashEffectProps> = ({
  triggerFrame,
  impactFrame,
  shatterCompleteFrame,
}) => {
  const frame = useCurrentFrame();

  // Logo drop animation using spring for gravity effect
  const dropProgress = spring({
    frame: Math.max(0, frame - triggerFrame),
    fps: 60,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 1,
    },
  });

  // Logo position (drops from top to center)
  const logoY = interpolate(dropProgress, [0, 1], [-200, 0], {
    extrapolateRight: 'clamp',
  });

  // Impact flash effect - brighter and longer for dramatic effect
  const flashOpacity = interpolate(
    frame,
    [impactFrame, impactFrame + 3, impactFrame + 8, impactFrame + 20],
    [0, 1, 0.6, 0],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );

  // Impact scale effect - more dramatic bounce
  const impactScale = interpolate(
    frame,
    [impactFrame, impactFrame + 6, impactFrame + 15],
    [1.4, 1.1, 1],
    {
      extrapolateRight: 'clamp',
      extrapolateLeft: 'clamp',
    }
  );

  // Shockwave rings
  const shockwaves = React.useMemo(() => [1, 2, 3], []);

  // Calculate if we're past impact
  const pastImpact = frame >= impactFrame;
  const debrisFrame = pastImpact ? frame - impactFrame : 0;
  const shatterEndFrame = shatterCompleteFrame ? shatterCompleteFrame - impactFrame : 60;

  // Primary debris - larger fragments from card pieces
  const primaryDebris = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2 + Math.random() * 0.2;
      const distance = 200 + Math.random() * 150;
      return {
        angle,
        distance,
        size: 15 + Math.random() * 20,
        rotation: Math.random() * 360,
        color: Math.random() > 0.5 ? colors.error.primary : colors.error.glow,
      };
    });
  }, []);

  // Secondary debris - smaller fragments that create shatter effect
  const secondaryDebris = React.useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * Math.PI * 2 + Math.random() * 0.3;
      const distance = 150 + Math.random() * 200;
      return {
        angle,
        distance,
        size: 5 + Math.random() * 10,
        rotation: Math.random() * 360,
        color: colors.error.primary,
      };
    });
  }, []);

  // Micro debris - tiny particles for explosion effect
  const microDebris = React.useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 250;
      return {
        angle,
        distance,
        size: 2 + Math.random() * 5,
        color: Math.random() > 0.7 ? '#FFF' : colors.error.glow,
      };
    });
  }, []);

  return (
    <AbsoluteFill>
      {/* Logo dropping from top */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, calc(-50% + ${logoY}px)) scale(${pastImpact ? impactScale : 1})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: '120px',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: `0 0 60px ${colors.primary.glow}`,
          }}
        >
          HAGICODE
        </div>
      </div>

      {/* Impact flash overlay - brighter white flash */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: 'white',
            opacity: flashOpacity,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Shockwave rings expanding outward */}
      {pastImpact && debrisFrame < 40 && (
        <>
          {shockwaves.map((waveIndex) => {
            const waveDelay = waveIndex * 4;
            const waveFrame = Math.max(0, debrisFrame - waveDelay);

            if (waveFrame < 1) return null;

            const waveRadius = interpolate(waveFrame, [0, 30], [50, 400], {
              extrapolateRight: 'clamp',
            });
            const waveOpacity = interpolate(waveFrame, [0, 10, 30], [0.8, 0.4, 0], {
              extrapolateRight: 'clamp',
            });
            const waveThickness = interpolate(waveFrame, [0, 30], [8, 2], {
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={waveIndex}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${waveRadius * 2}px`,
                  height: `${waveRadius * 2}px`,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: `${waveThickness}px solid ${colors.error.primary}`,
                  opacity: waveOpacity,
                  boxShadow: `0 0 30px ${colors.error.glow}`,
                }}
              />
            );
          })}
        </>
      )}

      {/* Primary debris - larger card fragments */}
      {pastImpact && debrisFrame < shatterEndFrame && (
        <>
          {primaryDebris.map((particle, i) => {
            const progress = interpolate(debrisFrame, [0, shatterEndFrame * 0.7], [0, 1], {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.quad),
            });

            const x = Math.cos(particle.angle) * particle.distance * progress;
            const y = Math.sin(particle.angle) * particle.distance * progress + progress * 120;
            const opacity = interpolate(
              debrisFrame,
              [0, 10, shatterEndFrame * 0.7, shatterEndFrame],
              [1, 1, 0.6, 0],
              {
                extrapolateRight: 'clamp',
              }
            );
            const rotation = particle.rotation + progress * 900;
            const scale = interpolate(debrisFrame, [0, 20, shatterEndFrame], [1, 1.2, 0.3], {
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={`primary-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(${scale})`,
                  opacity,
                  background: particle.color,
                  borderRadius: '3px',
                  boxShadow: `0 0 15px ${colors.error.glow}`,
                }}
              />
            );
          })}
        </>
      )}

      {/* Secondary debris - medium fragments with delayed start */}
      {pastImpact && debrisFrame < shatterEndFrame && debrisFrame > 3 && (
        <>
          {secondaryDebris.map((particle, i) => {
            const adjustedFrame = debrisFrame - 3;
            const progress = interpolate(adjustedFrame, [0, shatterEndFrame * 0.6], [0, 1], {
              extrapolateRight: 'clamp',
              easing: Easing.out(Easing.cubic),
            });

            const x = Math.cos(particle.angle) * particle.distance * progress;
            const y = Math.sin(particle.angle) * particle.distance * progress + progress * 80;
            const opacity = interpolate(
              adjustedFrame,
              [0, 8, shatterEndFrame * 0.6, shatterEndFrame],
              [0.9, 0.9, 0.4, 0],
              {
                extrapolateRight: 'clamp',
              }
            );
            const rotation = particle.rotation + progress * 720;
            const scale = interpolate(adjustedFrame, [0, 15, shatterEndFrame], [0.8, 1, 0.2], {
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={`secondary-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg) scale(${scale})`,
                  opacity,
                  background: particle.color,
                  borderRadius: '2px',
                  boxShadow: `0 0 8px ${colors.error.glow}`,
                }}
              />
            );
          })}
        </>
      )}

      {/* Micro debris - tiny particles for explosion */}
      {pastImpact && debrisFrame < shatterEndFrame && debrisFrame > 5 && (
        <>
          {microDebris.map((particle, i) => {
            const adjustedFrame = debrisFrame - 5;
            const progress = interpolate(adjustedFrame, [0, shatterEndFrame * 0.5], [0, 1], {
              extrapolateRight: 'clamp',
            });

            const x = Math.cos(particle.angle) * particle.distance * progress;
            const y = Math.sin(particle.angle) * particle.distance * progress + progress * 60;
            const opacity = interpolate(adjustedFrame, [0, 10, shatterEndFrame * 0.5], [1, 0.8, 0], {
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={`micro-${i}`}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  opacity,
                  background: particle.color,
                  borderRadius: '50%',
                  boxShadow: `0 0 6px ${particle.color === '#FFF' ? colors.primary.glow : colors.error.glow}`,
                }}
              />
            );
          })}
        </>
      )}
    </AbsoluteFill>
  );
};

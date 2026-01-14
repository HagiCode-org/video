// ScreenshotShowcase - Display product screenshots with animations
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { easing, duration, colors } from '../utils/theme';

export interface ScreenshotShowcaseProps {
  imageSrc: string;
  caption?: string;
  delay?: number;
  accent?: boolean;
}

export const ScreenshotShowcase: React.FC<ScreenshotShowcaseProps> = ({
  imageSrc,
  caption,
  delay = 0,
  accent = false,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  // Container animations
  const scaleProgress = interpolate(effectiveFrame, [0, 45], [0.9, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  const opacityProgress = interpolate(effectiveFrame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  // Glow pulse
  const glowIntensity = interpolate(
    effectiveFrame,
    [30, 90, 150],
    [0.3, 0.6, 0.3],
    { extrapolateRight: 'clamp', easing: Easing.sin }
  );

  return (
    <div
      style={{
        position: 'relative',
        transform: `scale(${scaleProgress})`,
        opacity: opacityProgress,
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          inset: -20,
          background: accent
            ? `radial-gradient(circle, ${colors.secondary.glow.replace('0.3', String(glowIntensity))} 0%, transparent 70%)`
            : `radial-gradient(circle, ${colors.primary.glow.replace('0.4', String(glowIntensity))} 0%, transparent 70%)`,
          filter: 'blur(40px)',
          borderRadius: '20px',
          zIndex: -1,
        }}
      />

      {/* Image container with glass effect */}
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: `1px solid ${accent ? colors.secondary.glow : colors.border.accent}`,
          boxShadow: accent
            ? `0 0 ${40 * glowIntensity}px ${colors.secondary.glow}`
            : `0 0 ${40 * glowIntensity}px ${colors.primary.glow}`,
          background: colors.background.medium,
        }}
      >
        <img
          src={imageSrc}
          alt={caption || 'Screenshot'}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Caption */}
      {caption && effectiveFrame > 45 && (
        <div
          style={{
            marginTop: '20px',
            textAlign: 'center',
            fontSize: '20px',
            color: colors.text.secondary,
            opacity: interpolate(effectiveFrame, [45, 60], [0, 1], {
              extrapolateRight: 'clamp',
            }),
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};

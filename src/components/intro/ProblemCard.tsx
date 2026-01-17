// ProblemCard - Display individual AI development problem
// Mobile-optimized with large readable fonts and clear visual hierarchy
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, videoTypography, videoLayout } from '../../utils/theme';

export interface ProblemCardProps {
  text: string;
  index: number;
  delay?: number;
  visibleUntil?: number;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  text,
  index,
  delay = 0,
  visibleUntil,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Stagger animation with video-optimized timing
  const staggerDelay = index * 8;
  const fadeInStart = staggerDelay;
  const fadeInEnd = staggerDelay + 20;

  const actualFadeProgress = interpolate(effectiveFrame, [fadeInStart, fadeInEnd], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const opacity = visibleUntil !== undefined
    ? interpolate(frame, [visibleUntil - 12, visibleUntil], [actualFadeProgress, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      })
    : actualFadeProgress;

  const scale = visibleUntil !== undefined
    ? interpolate(frame, [visibleUntil - 12, visibleUntil], [1, 0.85], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      })
    : 1;

  return (
    <div
      style={{
        // Glass card with mobile-optimized sizing
        background: `rgba(239, 68, 68, 0.12)`,
        backdropFilter: 'blur(16px)',
        border: `3px solid ${colors.error.primary}50`,
        borderRadius: '20px',
        padding: '36px 40px',
        opacity,
        transform: `scale(${scale})`,
        boxShadow: `0 8px 32px ${colors.error.glow}`,
        // Ensure minimum touch target size
        minHeight: videoLayout.component.buttonMinHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {/* Warning icon - Large and visible */}
      <div
        style={{
          fontSize: '56px',
          flexShrink: 0,
          filter: `drop-shadow(0 0 20px ${colors.error.primary})`,
        }}
      >
        ⚠️
      </div>

      {/* Problem text - Mobile-optimized font size */}
      <span
        style={{
          fontSize: videoTypography.fontSize.bodySmall,
          fontWeight: videoTypography.fontWeight.body,
          color: colors.text.primary,
          lineHeight: videoTypography.lineHeight.normal,
          textAlign: 'left',
          maxWidth: videoLayout.maxLineLength.body,
        }}
      >
        {text}
      </span>
    </div>
  );
};

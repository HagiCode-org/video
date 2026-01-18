// ThreadVisualization - Animated display of thread count (1 → 5)
// Mobile-optimized with larger elements
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, videoTypography } from '../../utils/theme';

export interface ThreadVisualizationProps {
  threadCount: number;
  delay?: number;
  maxThreads?: number;
}

export const ThreadVisualization: React.FC<ThreadVisualizationProps> = ({
  threadCount,
  delay = 0,
  maxThreads = 5,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  // Fade in animation
  const opacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(effectiveFrame, [0, 20], [30, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
      }}
    >
      {/* Title - Mobile-optimized */}
      <div
        style={{
          fontSize: videoTypography.fontSize.subtitle,
          fontWeight: videoTypography.fontWeight.subheading,
          color: colors.text.secondary,
          marginBottom: '10px',
        }}
      >
        线程可视化
      </div>

      {/* Thread dots - Larger for mobile */}
      <div
        style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: maxThreads }).map((_, index) => {
          const isActive = Math.ceil(threadCount) > index;
          const isFilling = threadCount > index && threadCount < index + 1;

          const fillProgress = isFilling ? threadCount - index : 1;

          const scale = isActive
            ? interpolate(fillProgress, [0, 1], [0.7, 1], {
                extrapolateRight: 'clamp',
              })
            : 0.5;

          const glowOpacity = isActive ? 1 : 0.2;

          return (
            <div
              key={index}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: isActive
                  ? `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`
                  : colors.background.light,
                transform: `scale(${scale})`,
                boxShadow: isActive
                  ? `0 0 ${50 * glowOpacity}px ${colors.primary.glow}`
                  : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
                color: isActive ? 'white' : colors.text.muted,
                fontWeight: videoTypography.fontWeight.body,
                transition: 'all 0.3s ease',
              }}
            >
              {isActive ? index + 1 : ''}
            </div>
          );
        })}
      </div>

      {/* Thread count label - Mobile-optimized */}
      <div
        style={{
          fontSize: videoTypography.fontSize.body,
          fontWeight: videoTypography.fontWeight.body,
          color: colors.text.secondary,
          marginTop: '10px',
        }}
      >
        {threadCount < 1 ? '单线程' : `${Math.ceil(threadCount)} 线程`}
      </div>
    </div>
  );
};

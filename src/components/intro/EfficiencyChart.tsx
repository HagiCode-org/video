// EfficiencyChart - Animated bar chart (20% → 100%)
// Mobile-optimized with larger elements
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, videoTypography } from '../../utils/theme';

export interface EfficiencyChartProps {
  percentage: number;
  delay?: number;
  showLabel?: boolean;
}

export const EfficiencyChart: React.FC<EfficiencyChartProps> = ({
  percentage,
  delay = 0,
  showLabel = true,
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

  // Bar fill height - Taller chart
  const barHeight = interpolate(percentage, [0, 100], [0, 280], {
    extrapolateRight: 'clamp',
  });

  // Color interpolation based on percentage (red -> yellow -> green)
  const getColor = (pct: number) => {
    if (pct < 50) {
      const progress = pct / 50;
      return `rgb(${interpolate(progress, [0, 1], [239, 245])}, ${interpolate(progress, [0, 1], [68, 158])}, ${interpolate(progress, [0, 1], [68, 11])})`;
    } else {
      const progress = (pct - 50) / 50;
      return `rgb(${interpolate(progress, [0, 1], [245, 16])}, ${interpolate(progress, [0, 1], [158, 185])}, ${interpolate(progress, [0, 1], [11, 129])})`;
    }
  };

  const currentColor = getColor(percentage);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
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
        效能图表
      </div>

      {/* Chart container - Mobile-optimized size */}
      <div
        style={{
          position: 'relative',
          width: '300px',
          height: '280px',
          background: colors.background.medium,
          borderRadius: '20px',
          border: `3px solid ${colors.border.medium}`,
          overflow: 'hidden',
        }}
      >
        {/* Bar fill */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${barHeight}px`,
            background: `linear-gradient(to top, ${currentColor}, ${getColor(Math.max(0, percentage - 20))})`,
            boxShadow: `0 0 50px ${currentColor}40`,
          }}
        />

        {/* Percentage label - Large for mobile */}
        {showLabel && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: videoTypography.fontSize.title,
              fontWeight: videoTypography.fontWeight.display,
              color: percentage > 50 ? 'white' : colors.text.primary,
              textShadow: percentage > 50 ? '0 4px 20px rgba(0,0,0,0.8)' : 'none',
            }}
          >
            {Math.round(percentage)}%
          </div>
        )}
      </div>

      {/* Legend - Mobile-optimized */}
      <div
        style={{
          display: 'flex',
          gap: '40px',
          fontSize: videoTypography.fontSize.label,
          fontWeight: videoTypography.fontWeight.body,
          color: colors.text.secondary,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: colors.error.primary,
            }}
          />
          低效能
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: colors.success.primary,
            }}
          />
          高效能
        </div>
      </div>
    </div>
  );
};

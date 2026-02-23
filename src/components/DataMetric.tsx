// DataMetric - Animated data visualization component
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { easing, colors } from '../utils/theme';

export interface DataMetricProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
  accent?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const DataMetric: React.FC<DataMetricProps> = ({
  value,
  label,
  suffix = '%',
  delay = 0,
  accent = false,
  size = 'medium',
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  // Value counting animation
  const displayValue = interpolate(effectiveFrame, [0, 45], [0, value], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  // Opacity fade in
  const opacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Scale animation
  const scale = interpolate(effectiveFrame, [0, 30], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  const sizeStyles = {
    small: { valueSize: '48px', labelSize: '18px', spacing: '8px' },
    medium: { valueSize: '72px', labelSize: '24px', spacing: '12px' },
    large: { valueSize: '96px', labelSize: '28px', spacing: '16px' },
  };

  const { valueSize, labelSize, spacing } = sizeStyles[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: spacing,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: valueSize,
          fontWeight: 700,
          background: accent
            ? `linear-gradient(135deg, ${colors.secondary.from}, ${colors.secondary.to})`
            : `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {Math.round(displayValue)}
        {suffix}
      </div>
      <div
        style={{
          fontSize: labelSize,
          color: colors.text.secondary,
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {label}
      </div>
    </div>
  );
};

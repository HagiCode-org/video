// UpdateSummary component - Statistics summary for update bulletin
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography } from '../../utils/theme';

export interface UpdateSummaryProps {
  featuresCount: number;
  bugfixesCount: number;
  improvementsCount: number;
  summary?: string;
  delay?: number;
}

// Stat card component
interface StatCardProps {
  icon: string;
  value: number;
  label: string;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color, delay }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  // Count up animation for the value
  const displayValue = interpolate(effectiveFrame, [0, 45], [0, value], {
    extrapolateRight: 'clamp',
  });

  // Fade in and scale
  const opacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(effectiveFrame, [0, 30], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  // Pulse animation for icon
  const pulseScale = interpolate(
    effectiveFrame,
    [30, 60, 90],
    [1, 1.1, 1],
    { extrapolateRight: 'clamp', easing: Easing.sin }
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Icon with pulse */}
      <div
        style={{
          fontSize: '56px',
          transform: `scale(${pulseScale})`,
        }}
      >
        {icon}
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: '72px',
          fontWeight: 700,
          fontFamily: typography.fontFamily.heading,
          background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {Math.round(displayValue)}
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: typography.fontSize.body,
          color: colors.text.secondary,
          fontWeight: typography.fontWeight.medium,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const UpdateSummary: React.FC<UpdateSummaryProps> = ({
  featuresCount,
  bugfixesCount,
  improvementsCount,
  summary,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Title slide in from left
  const titleOpacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleX = interpolate(effectiveFrame, [0, 30], [-100, 0], {
    extrapolateRight: 'clamp',
  });

  // Summary text fade in
  const summaryOpacity = interpolate(
    effectiveFrame,
    [120, 150],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: colors.background.medium,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: typography.fontSize.sectionTitle,
          fontWeight: typography.fontWeight.semibold,
          fontFamily: typography.fontFamily.heading,
          color: colors.text.primary,
          marginBottom: '80px',
          opacity: titleOpacity,
          transform: `translateX(${titleX}px)`,
        }}
      >
        本版本更新
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'flex',
          gap: '100px',
          marginBottom: summary ? '60px' : '0',
        }}
      >
        <StatCard
          icon="📊"
          value={featuresCount}
          label="新功能"
          color={colors.primary.from}
          delay={delay + 30}
        />
        <StatCard
          icon="🐛"
          value={bugfixesCount}
          label="Bug修复"
          color={colors.secondary.from}
          delay={delay + 45}
        />
        <StatCard
          icon="✨"
          value={improvementsCount}
          label="改进"
          color={colors.success.primary}
          delay={delay + 60}
        />
      </div>

      {/* Optional summary text */}
      {summary && (
        <div
          style={{
            maxWidth: '1200px',
            textAlign: 'center',
            fontSize: typography.fontSize.bodyLarge,
            color: colors.text.secondary,
            lineHeight: typography.lineHeight.relaxed,
            opacity: summaryOpacity,
          }}
        >
          {summary}
        </div>
      )}
    </AbsoluteFill>
  );
};

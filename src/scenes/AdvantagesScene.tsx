// AdvantagesScene - Product advantages (50-55s, 150 frames)
// Enhanced with data visualization metrics and glassmorphism
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Zap, Building2, Unlock, TrendingUp } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';
import { DataMetric } from '../components/DataMetric';

const ADVANTAGES = [
  {
    icon: Zap,
    title: '开箱即用',
    description: '快速启动，即刻上手',
    color: colors.accent.primary,
    metric: 5,
    metricLabel: '分钟启动',
  },
  {
    icon: Building2,
    title: '企业级架构',
    description: 'Orleans + PostgreSQL',
    color: colors.primary.from,
    metric: 99.9,
    metricLabel: '可用性 %',
  },
  {
    icon: Unlock,
    title: '开源可定制',
    description: '完全掌控，自由扩展',
    color: colors.secondary.from,
    metric: 100,
    metricLabel: '开源 %',
  },
];

export const AdvantagesScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-60f (0-2s): Title appears
  // 30-120f (1-4s): Cards slide in with metrics
  // 120-150f (4-5s): Hold with emphasis

  // Title animation
  const titleProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  const titleOpacity = titleProgress;

  // Cards stagger animation
  const getCardAnimation = (index: number) => {
    const startFrame = 30 + index * 25;
    const progress = interpolate(frame, [startFrame, startFrame + 35], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.bounce),
    });

    return {
      opacity: progress,
      y: interpolate(progress, [0, 1], [50, 0]),
      scale: interpolate(progress, [0, 1], [0.9, 1]),
    };
  };

  // Trend icon animation
  const trendOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const trendScale = interpolate(frame, [100, 130], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: `radial-gradient(ellipse, ${colors.primary.glow}15 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Title with icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '80px',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, Inter, sans-serif',
            background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0,
          }}
        >
          为什么选择 Hagicode？
        </h2>
        <div
          style={{
            opacity: trendOpacity,
            transform: `scale(${trendScale})`,
          }}
        >
          <TrendingUp
            size={36}
            color={colors.success.primary}
            style={{ filter: `drop-shadow(0 0 10px ${colors.success.glow})` }}
          />
        </div>
      </div>

      {/* Advantage cards with metrics */}
      <div
        style={{
          display: 'flex',
          gap: '48px',
          maxWidth: '1400px',
        }}
      >
        {ADVANTAGES.map((advantage, index) => {
          const Icon = advantage.icon;
          const anim = getCardAnimation(index);

          return (
            <GlassCard
              key={advantage.title}
              variant="card"
              accent={index === 0}
              glow={true}
              style={{
                opacity: anim.opacity,
                transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                padding: '40px',
                width: '320px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${advantage.color}30, ${advantage.color}15)`,
                  border: `2px solid ${advantage.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: `drop-shadow(0 0 15px ${advantage.color}40)`,
                }}
              >
                <Icon size={40} color={advantage.color} />
              </div>

              {/* Metric */}
              <DataMetric
                value={advantage.metric}
                label={advantage.metricLabel}
                delay={30 + index * 25 + 35}
                accent={index === 1}
                size="large"
              />

              {/* Title */}
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 600,
                  color: colors.text.primary,
                  textAlign: 'center',
                }}
              >
                {advantage.title}
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: '18px',
                  color: colors.text.secondary,
                  textAlign: 'center',
                }}
              >
                {advantage.description}
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

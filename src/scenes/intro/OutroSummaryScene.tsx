// OutroSummaryScene - Scene 5: Summary outro (120 frames / 2 seconds @ 60fps)
// UI/UX Pro optimized for 1920x1080 landscape video
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { colors, videoTypography, videoLayout } from '../../utils/theme';

export interface OutroSummarySceneProps {
  delay?: number;
}

const FEATURES = [
  { icon: '🎯', text: '智能可控', sub: '引导 AI 更聪明' },
  { icon: '⚡', text: '发挥最大效率', sub: '多 Agent 并发协作' },
  { icon: '✨', text: '有趣体验', sub: '让编程充满乐趣' },
];

export const OutroSummaryScene: React.FC<OutroSummarySceneProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  // Main entrance animation
  const entranceProgress = spring({
    frame: effectiveFrame,
    fps: 60,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const opacity = interpolate(entranceProgress, [0, 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(entranceProgress, [0, 1], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  // Feature card stagger animation
  const getCardDelay = (index: number) => 10 + index * 12;

  return (
    <AbsoluteFill
      style={{
        background: colors.background.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${videoLayout.safeZone.vertical}px ${videoLayout.safeZone.horizontal}px`,
      }}
    >
      {/* Logo/Brand name */}
      <div
        style={{
          fontSize: videoTypography.fontSize.hero,
          fontWeight: videoTypography.fontWeight.display,
          background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: `0 0 80px ${colors.primary.glow}`,
          textAlign: 'center',
          opacity,
          transform: `scale(${scale})`,
          marginBottom: '40px',
          lineHeight: 1.15,
        }}
      >
        HagiCode
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: videoTypography.fontSize.bodyLarge,
          fontWeight: videoTypography.fontWeight.subheading,
          color: colors.text.secondary,
          textAlign: 'center',
          opacity: interpolate(entranceProgress, [0.3, 0.7], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          marginBottom: '50px',
        }}
      >
        让你可以同时处理十个需求
      </div>

      {/* Feature cards - 3x1 horizontal layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          width: '100%',
          maxWidth: '1400px',
          marginBottom: '50px',
        }}
      >
        {FEATURES.map((feature, index) => {
          const cardDelay = getCardDelay(index);

          const cardOpacity = interpolate(
            effectiveFrame,
            [cardDelay, cardDelay + 15, cardDelay + 25],
            [0, 1, 1],
            { extrapolateRight: 'clamp' }
          );

          const cardSlideUp = interpolate(
            effectiveFrame,
            [cardDelay, cardDelay + 20],
            [30, 0],
            { extrapolateRight: 'clamp' }
          );

          const cardScale = interpolate(
            effectiveFrame,
            [cardDelay, cardDelay + 20],
            [0.92, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={index}
              style={{
                background: `linear-gradient(145deg, ${colors.background.medium} 0%, ${colors.background.light}40 100%)`,
                border: `2px solid ${colors.primary.to}30`,
                borderRadius: '20px',
                padding: '28px 24px',
                opacity: cardOpacity,
                transform: `translateY(${cardSlideUp}px) scale(${cardScale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                boxShadow: `0 8px 24px ${colors.background.black}30`,
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: '56px',
                  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                }}
              >
                {feature.icon}
              </div>

              {/* Feature text */}
              <div
                style={{
                  fontSize: videoTypography.fontSize.body,
                  fontWeight: videoTypography.fontWeight.subheading,
                  color: colors.text.primary,
                  textAlign: 'center',
                }}
              >
                {feature.text}
              </div>

              {/* Sub text */}
              <div
                style={{
                  fontSize: videoTypography.fontSize.label,
                  color: colors.text.secondary,
                  textAlign: 'center',
                }}
              >
                {feature.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info - GitHub + QQ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          opacity: interpolate(effectiveFrame, [60, 80], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          transform: `translateY(${interpolate(effectiveFrame, [60, 80], [20, 0], {
            extrapolateRight: 'clamp',
          })}px)`,
        }}
      >
        {/* GitHub CTA button */}
        <div
          style={{
            padding: '18px 48px',
            borderRadius: '16px',
            background: `${colors.accent.primary}20`,
            border: `3px solid ${colors.accent.primary}60`,
            fontSize: videoTypography.fontSize.button,
            fontWeight: videoTypography.fontWeight.body,
            color: colors.accent.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 40px ${colors.accent.glow}`,
            cursor: 'pointer',
          }}
        >
          github.com/HagiCode-org
        </div>

        {/* QQ Group */}
        <div
          style={{
            padding: '12px 32px',
            borderRadius: '12px',
            background: `${colors.secondary.to}15`,
            border: `2px solid ${colors.secondary.to}40`,
            fontSize: videoTypography.fontSize.bodySmall,
            fontWeight: videoTypography.fontWeight.body,
            color: colors.secondary.to,
            letterSpacing: '1px',
            boxShadow: `0 0 20px ${colors.secondary.glow}30`,
          }}
        >
          QQ 群: 610394020
        </div>
      </div>
    </AbsoluteFill>
  );
};

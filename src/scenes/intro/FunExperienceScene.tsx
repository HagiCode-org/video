// FunExperienceScene - Scene 4: Fun experience features (180 frames / 3 seconds @ 60fps)
// UI/UX Pro optimized for 1920x1080 landscape video
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, videoTypography } from '../../utils/theme';
import { SceneLayout } from '../../components/intro/SceneLayout';

export interface FunExperienceSceneProps {
  delay?: number;
}

const FEATURES = [
  { icon: '🎨', text: '主题定制' },
  { icon: '🎵', text: '音效定制' },
  { icon: '✨', text: '样式定制' },
  { icon: '🏆', text: '成就系统' },
  { icon: '📋', text: '历史简报' },
  { icon: '📜', text: '详细记录' },
];

export const FunExperienceScene: React.FC<FunExperienceSceneProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  const titleOpacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleScale = interpolate(effectiveFrame, [0, 30], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  const getCardDelay = (index: number) => index * 6;

  return (
    <SceneLayout
      title="HagiCode 让编程更加有趣"
      titleOpacity={titleOpacity}
      titleScale={titleScale}
    >
      {/* Feature grid - 3x2 layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '36px',
          width: '100%',
          maxWidth: '1400px',
          height: '400px',
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
            [40, 0],
            { extrapolateRight: 'clamp' }
          );

          const cardScale = interpolate(
            effectiveFrame,
            [cardDelay, cardDelay + 20],
            [0.9, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={index}
              style={{
                background: `linear-gradient(145deg, ${colors.background.medium} 0%, ${colors.background.light}40 100%)`,
                border: `2px solid ${colors.primary.to}40`,
                borderRadius: '24px',
                padding: '32px 40px',
                opacity: cardOpacity,
                transform: `translateY(${cardSlideUp}px) scale(${cardScale})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                boxShadow: `0 8px 32px ${colors.background.black}40, 0 0 0 1px ${colors.primary.to}20`,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: '64px',
                  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                }}
              >
                {feature.icon}
              </div>

              {/* Text */}
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

              {/* Decorative glow */}
              {cardOpacity >= 1 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '26px',
                    background: `linear-gradient(145deg, ${colors.primary.from}, ${colors.primary.to})`,
                    opacity: interpolate(
                      effectiveFrame,
                      [cardDelay + 20, cardDelay + 40],
                      [0.6, 0],
                      { extrapolateRight: 'clamp' }
                    ),
                    zIndex: -1,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </SceneLayout>
  );
};

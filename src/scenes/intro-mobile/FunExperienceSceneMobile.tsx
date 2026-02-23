// FunExperienceSceneMobile - Scene 4: Fun experience features (180 frames / 3 seconds @ 60fps)
// Mobile-optimized for 1080x1920 vertical canvas
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors, mobileVideoTypography } from '../../utils/theme';
import { SceneLayoutMobile } from '../../components/intro-mobile/SceneLayoutMobile';

export interface FunExperienceSceneMobileProps {
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

/**
 * FunExperienceSceneMobile - Mobile-optimized fun experience features
 *
 * Key adaptations from desktop FunExperienceScene:
 * - Single-column stacked layout instead of 3x2 grid
 * - Full-width cards for mobile
 * - Tighter vertical spacing for compact layout
 * - Same staggered entrance animations
 */
export const FunExperienceSceneMobile: React.FC<FunExperienceSceneMobileProps> = ({ delay = 0 }) => {
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
    <SceneLayoutMobile
      title="让编程更加有趣"
      titleOpacity={titleOpacity}
      titleScale={titleScale}
    >
      {/* Feature stack - Single column layout for mobile */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px', // 减小间距，从 20px → 16px
          width: '100%',
          maxWidth: '840px',
          position: 'relative',
          top: '120px',
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
                borderRadius: '20px',
                padding: '28px 36px',
                opacity: cardOpacity,
                transform: `translateY(${cardSlideUp}px) scale(${cardScale})`,
                display: 'flex',
                flexDirection: 'row', // Horizontal layout for each card
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '24px',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${colors.primary.to}20`,
                width: '100%',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  fontSize: '56px',
                  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                  flexShrink: 0,
                }}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <div
                style={{
                  fontSize: mobileVideoTypography.fontSize.body,
                  fontWeight: mobileVideoTypography.fontWeight.subheading,
                  color: colors.text.primary,
                  textAlign: 'left',
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
                    borderRadius: '22px',
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
    </SceneLayoutMobile>
  );
};

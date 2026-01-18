// MultiThreadEfficientSceneMobile - Scene 3: Bar chart efficiency comparison (180 frames / 3 seconds @ 60fps)
// Mobile-optimized for 1080x1920 vertical canvas
import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { colors, mobileVideoTypography } from '../../utils/theme';
import { SceneLayoutMobile } from '../../components/intro-mobile/SceneLayoutMobile';

export interface MultiThreadEfficientSceneMobileProps {
  delay?: number;
}

const BARS = [
  { label: '1x', height: 80, name: 'VibeCoding' },
  { label: '2x', height: 150, name: '' },
  { label: '3x', height: 220, name: '' },
  { label: '4x', height: 290, name: '' },
  { label: '5x', height: 360, name: 'HagiCode' },
];

/**
 * MultiThreadEfficientSceneMobile - Mobile-optimized efficiency bar chart
 *
 * Key adaptations from desktop MultiThreadEfficientScene:
 * - Narrower bars to fit 1080px width (120px vs 140-160px desktop)
 * - Adjusted bar heights for vertical layout
 * - Smaller fonts to fit narrow canvas
 * - Same staggered animation pattern
 */
export const MultiThreadEfficientSceneMobile: React.FC<MultiThreadEfficientSceneMobileProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  const titleOpacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleScale = interpolate(effectiveFrame, [0, 30], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  // Calculate animation progress for each bar (staggered from left to right)
  const getBarProgress = (index: number) => {
    const startFrame = index * 15;
    const duration = 25;

    if (effectiveFrame < startFrame) return 0;
    if (effectiveFrame > startFrame + duration) return 1;

    return spring({
      frame: effectiveFrame - startFrame,
      fps: 60,
      config: {
        damping: 12,
        stiffness: 100,
        mass: 0.5,
      },
    });
  };

  // Last bar progress for 5x badge animation
  const lastBarProgress = getBarProgress(BARS.length - 1);

  return (
    <SceneLayoutMobile
      title="HagiCode 发挥最大效率"
      titleOpacity={titleOpacity}
      titleScale={titleScale}
    >

      {/* Bar chart container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '18px', // Smaller gap for mobile
          width: '100%',
          maxWidth: '840px', // Fit within safe zone
          flex: 1,
          paddingBottom: '200px', // 减小底部间距，从 350px → 200px
          position: 'relative',
        }}
      >
        {BARS.map((bar, index) => {
          const barProgress = getBarProgress(index);
          const isLastBar = index === BARS.length - 1;

          // Bar height animation
          const barHeight = interpolate(barProgress, [0, 1], [0, bar.height], {
            extrapolateRight: 'clamp',
          });

          // Opacity for label inside bar
          const labelOpacity = interpolate(barProgress, [0.5, 0.8], [0, 1], {
            extrapolateRight: 'clamp',
          });

          // Name label below bar
          const nameOpacity = interpolate(barProgress, [0.6, 0.9], [0, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* Spacer for 5x badge (independent element) */}
              {isLastBar && (
                <div
                  style={{
                    height: mobileVideoTypography.fontSize.hero,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                />
              )}

              {/* Name above bar */}
              {bar.name && (
                <div
                  style={{
                    fontSize: mobileVideoTypography.fontSize.caption,
                    fontWeight: mobileVideoTypography.fontWeight.subheading,
                    color: isLastBar ? colors.text.primary : colors.text.secondary,
                    textAlign: 'center',
                    opacity: nameOpacity,
                  }}
                >
                  {bar.name}
                </div>
              )}

              {/* Bar */}
              <div
                style={{
                  width: isLastBar ? '130px' : '110px', // Narrower for mobile
                  height: barHeight,
                  background: isLastBar
                    ? `linear-gradient(180deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`
                    : `linear-gradient(180deg, ${colors.text.muted}60 0%, ${colors.text.muted}30 100%)`,
                  border: isLastBar
                    ? `3px solid ${colors.primary.to}80`
                    : `3px solid ${colors.text.muted}50`,
                  borderRadius: '10px 10px 0 0',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '12px',
                  position: 'relative',
                  boxShadow: isLastBar
                    ? `0 0 40px ${colors.primary.glow}40, 0 0 80px ${colors.primary.glow}20`
                    : `0 0 20px ${colors.text.muted}15`,
                }}
              >
                {/* Label inside bar */}
                <div
                  style={{
                    fontSize: isLastBar ? mobileVideoTypography.fontSize.subtitle : mobileVideoTypography.fontSize.bodyLarge,
                    fontWeight: mobileVideoTypography.fontWeight.heading,
                    color: isLastBar ? colors.text.primary : colors.text.muted,
                    opacity: labelOpacity,
                    textShadow: isLastBar ? `0 0 20px ${colors.primary.glow}` : 'none',
                  }}
                >
                  {bar.label}
                </div>
              </div>

              {/* Glow effect for last bar */}
              {isLastBar && barProgress > 0.9 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '30px',
                    width: '160px',
                    height: barHeight,
                    background: `linear-gradient(180deg, ${colors.primary.glow}50 0%, transparent 100%)`,
                    borderRadius: '14px',
                    opacity: interpolate(barProgress, [0.9, 1], [0, 0.6], {
                      extrapolateRight: 'clamp',
                    }),
                    filter: 'blur(25px)',
                    zIndex: -1,
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Independent 5x badge - positioned absolutely above last bar */}
        {lastBarProgress > 0.7 && (
          <div
            style={{
              position: 'absolute',
              right: '18px',
              bottom: `${650 + 50}px`, // Bar height + spacing for name
              fontSize: mobileVideoTypography.fontSize.hero,
              fontWeight: mobileVideoTypography.fontWeight.display,
              color: colors.primary.from,
              textShadow: `0 0 40px ${colors.primary.glow}, 0 0 80px ${colors.primary.glow}`,
              opacity: interpolate(lastBarProgress, [0.7, 0.9], [0, 1], {
                extrapolateRight: 'clamp',
              }),
              transform: `scale(${interpolate(lastBarProgress, [0.7, 0.95], [1.3, 1], {
                extrapolateRight: 'clamp',
              })})`,
              zIndex: 10,
              whiteSpace: 'nowrap',
            }}
          >
            5x 效率
          </div>
        )}
      </div>
    </SceneLayoutMobile>
  );
};

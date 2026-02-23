// MultiThreadEfficientScene - Scene 3: Bar chart efficiency comparison (180 frames / 3 seconds @ 60fps)
// Five consecutive bars rising from left to right
import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { colors, videoTypography } from '../../utils/theme';
import { SceneLayout } from '../../components/intro/SceneLayout';

export interface MultiThreadEfficientSceneProps {
  delay?: number;
}

const BARS = [
  { label: '1x', height: 60, name: 'VibeCoding' },
  { label: '2x', height: 120, name: '' },
  { label: '3x', height: 180, name: '' },
  { label: '4x', height: 240, name: '' },
  { label: '5x', height: 300, name: 'HagiCode' },
];

export const MultiThreadEfficientScene: React.FC<MultiThreadEfficientSceneProps> = ({ delay = 0 }) => {
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
    <SceneLayout
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
          gap: '24px',
          width: '100%',
          maxWidth: '1100px',
          flex: 1,
          paddingBottom: '250px',
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
                gap: '12px',
              }}
            >
              {/* Spacer for 5x badge (independent element) */}
              {isLastBar && (
                <div
                  style={{
                    height: videoTypography.fontSize.hero,
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
                    fontSize: videoTypography.fontSize.bodySmall,
                    fontWeight: videoTypography.fontWeight.subheading,
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
                  width: isLastBar ? '160px' : '140px',
                  height: barHeight,
                  background: isLastBar
                    ? `linear-gradient(180deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`
                    : `linear-gradient(180deg, ${colors.text.muted}60 0%, ${colors.text.muted}30 100%)`,
                  border: isLastBar
                    ? `3px solid ${colors.primary.to}80`
                    : `3px solid ${colors.text.muted}50`,
                  borderRadius: '12px 12px 0 0',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '16px',
                  position: 'relative',
                  boxShadow: isLastBar
                    ? `0 0 40px ${colors.primary.glow}40, 0 0 80px ${colors.primary.glow}20`
                    : `0 0 20px ${colors.text.muted}15`,
                }}
              >
                {/* Label inside bar */}
                <div
                  style={{
                    fontSize: isLastBar ? videoTypography.fontSize.title : videoTypography.fontSize.subtitle,
                    fontWeight: videoTypography.fontWeight.heading,
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
                    bottom: '40px',
                    width: '200px',
                    height: barHeight,
                    background: `linear-gradient(180deg, ${colors.primary.glow}50 0%, transparent 100%)`,
                    borderRadius: '16px',
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
              right: '24px',
              bottom: `${550 + 60}px`, // Bar height + spacing for name
              fontSize: videoTypography.fontSize.hero,
              fontWeight: videoTypography.fontWeight.display,
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
    </SceneLayout>
  );
};

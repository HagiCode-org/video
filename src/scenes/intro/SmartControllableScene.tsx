// SmartControllableScene - Scene 2: Before/After comparison (180 frames / 3 seconds @ 60fps)
// UI/UX Pro optimized for 1920x1080 landscape video
import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { colors, videoTypography } from '../../utils/theme';
import { SceneLayout } from '../../components/intro/SceneLayout';

export interface SmartControllableSceneProps {
  delay?: number;
}

// Problem cards (before) and their solutions (after)
const CARDS = [
  { before: 'AI 经常返工', after: '✅ 一次完成' },
  { before: 'AI 意外修改', after: '🎯 精准控制' },
  { before: 'AI 无法理解结构', after: '📁 智能感知' },
  { before: 'AI 产生幻觉', after: '🧠 规范约束' },
  { before: 'AI 无验收结果', after: '✨ 自动验证' },
  { before: 'AI 听不懂人话', after: '💬 自然交互' },
];

export const SmartControllableScene: React.FC<SmartControllableSceneProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Timeline for 4 seconds (240 frames)
  const TIMELINE = {
    beforeDisplay: 60,
    flipStart: 60,
    afterDisplay: 180,
  } as const;

  // Title animation
  const titleOpacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleScale = interpolate(effectiveFrame, [0, 30], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  // Calculate flip progress for each card (staggered)
  const getCardFlipProgress = (index: number) => {
    const flipStart = TIMELINE.flipStart + index * 12;
    const flipDuration = 18;

    if (effectiveFrame < flipStart) return 0;
    if (effectiveFrame > flipStart + flipDuration) return 1;

    return spring({
      frame: effectiveFrame - flipStart,
      fps: 60,
      config: {
        damping: 12,
        stiffness: 200,
        mass: 0.4,
      },
    });
  };

  const getCardScale = (index: number) => {
    const flipProgress = getCardFlipProgress(index);
    return interpolate(flipProgress, [0, 0.5, 1], [1, 1.08, 1], {
      extrapolateRight: 'clamp',
    });
  };

  return (
    <SceneLayout
      title="HagiCode 引导 AI 更加智能"
      titleOpacity={titleOpacity}
      titleScale={titleScale}
    >
      {/* Card grid - 3x2 layout */}
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
        {CARDS.map((card, index) => {
          const flipProgress = getCardFlipProgress(index);
          const scale = getCardScale(index);

          const rotationY = interpolate(flipProgress, [0, 1], [0, 180], {
            extrapolateRight: 'clamp',
          });

          const beforeOpacity = interpolate(flipProgress, [0, 0.45, 0.5], [1, 1, 0], {
            extrapolateRight: 'clamp',
          });
          const afterOpacity = interpolate(flipProgress, [0.5, 0.55, 1], [0, 1, 1], {
            extrapolateRight: 'clamp',
          });

          const cardEntrance = interpolate(
            effectiveFrame,
            [index * 5, index * 5 + 20, index * 5 + 30],
            [0, 1, 1],
            { extrapolateRight: 'clamp' }
          );
          const cardSlideUp = interpolate(
            effectiveFrame,
            [index * 5, index * 5 + 20],
            [30, 0],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                perspective: '1200px',
                opacity: cardEntrance,
                transform: `translateY(${cardSlideUp}px)`,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${rotationY}deg) scale(${scale})`,
                }}
              >
                {/* Before side */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: `linear-gradient(145deg, ${colors.error.primary}25 0%, ${colors.error.primary}15 100%)`,
                    border: `3px solid ${colors.error.primary}`,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px',
                    opacity: beforeOpacity,
                    transform: 'rotateY(0deg)',
                    boxShadow: `0 8px 32px ${colors.error.primary}30, inset 0 1px 0 ${colors.error.primary}40`,
                  }}
                >
                  <div
                    style={{
                      fontSize: videoTypography.fontSize.bodyLarge,
                      fontWeight: videoTypography.fontWeight.subheading,
                      color: colors.text.primary,
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    {card.before}
                  </div>
                </div>

                {/* After side */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: `linear-gradient(145deg, ${colors.success.primary}25 0%, ${colors.success.primary}15 100%)`,
                    border: `3px solid ${colors.success.primary}`,
                    borderRadius: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '32px',
                    opacity: afterOpacity,
                    transform: 'rotateY(180deg)',
                    boxShadow: `0 8px 32px ${colors.success.primary}40, 0 0 60px ${colors.success.glow}30, inset 0 1px 0 ${colors.success.primary}50`,
                  }}
                >
                  <div
                    style={{
                      fontSize: videoTypography.fontSize.bodyLarge,
                      fontWeight: videoTypography.fontWeight.subheading,
                      color: colors.text.primary,
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    {card.after}
                  </div>
                </div>
              </div>

              {flipProgress >= 1 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-6px',
                    borderRadius: '28px',
                    background: `linear-gradient(145deg, ${colors.success.primary}, ${colors.primary.to})`,
                    opacity: interpolate(
                      effectiveFrame,
                      [TIMELINE.flipStart + index * 12 + 18, TIMELINE.flipStart + index * 12 + 40],
                      [0.8, 0],
                      { extrapolateRight: 'clamp' }
                    ),
                    zIndex: -1,
                    filter: 'blur(8px)',
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

// SmartControllableSceneMobile - Scene 2: Before/After comparison (180 frames / 3 seconds @ 60fps)
// Mobile-optimized for 1080x1920 vertical canvas
import React from 'react';
import { useCurrentFrame, interpolate, spring } from 'remotion';
import { colors, mobileVideoTypography } from '../../utils/theme';
import { SceneLayoutMobile } from '../../components/intro-mobile/SceneLayoutMobile';

export interface SmartControllableSceneMobileProps {
  delay?: number;
}

// Problem cards (before) and their solutions (after)
// 使用文字对比而非 emoji，符合专业 UI 规范
const CARDS = [
  { before: 'AI 经常返工', after: '一次完成', color: '#4CAF50' },
  { before: 'AI 意外修改', after: '精准控制', color: '#2196F3' },
  { before: 'AI 无法理解结构', after: '智能感知', color: '#9C27B0' },
  { before: 'AI 产生幻觉', after: '规范约束', color: '#FF9800' },
  { before: 'AI 无验收结果', after: '自动验证', color: '#00BCD4' },
  { before: 'AI 听不懂人话', after: '自然交互', color: '#E91E63' },
];

/**
 * SmartControllableSceneMobile - Mobile-optimized before/after comparison
 *
 * UI/UX Pro Max 优化:
 * - 单列堆叠布局（更适合垂直视频，避免 2x3 网格拥挤）
 * - 移除 emoji，使用纯文字对比
 * - 每个卡片更大的触摸区域和可读性
 * - 优化的动画时序，单列更流畅
 */
export const SmartControllableSceneMobile: React.FC<SmartControllableSceneMobileProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Timeline for 3 seconds (180 frames)
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
    <SceneLayoutMobile
      title="HagiCode 引导 AI 更加智能"
      titleOpacity={titleOpacity}
      titleScale={titleScale}
    >
      {/* Card stack - Single column layout for better mobile UX */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px', // 进一步减小间距，从 14px → 12px
          width: '100%',
          maxWidth: '760px',
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
                height: '100px', // 进一步减小卡片高度，从 110px → 100px
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
                {/* Before side - Problem */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: `linear-gradient(145deg, ${colors.error.primary}25 0%, ${colors.error.primary}15 100%)`,
                    border: `3px solid ${colors.error.primary}`,
                    borderRadius: '16px', // 更圆润
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '28px',
                    opacity: beforeOpacity,
                    transform: 'rotateY(0deg)',
                    boxShadow: `0 8px 32px ${colors.error.primary}30, inset 0 1px 0 ${colors.error.primary}40`,
                  }}
                >
                  <div
                    style={{
                      fontSize: mobileVideoTypography.fontSize.body, // 更大的字体
                      fontWeight: mobileVideoTypography.fontWeight.subheading,
                      color: colors.text.primary,
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}
                  >
                    {card.before}
                  </div>
                </div>

                {/* After side - Solution with color accent */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: `linear-gradient(145deg, ${(card.color || colors.success.primary)}40 0%, ${(card.color || colors.success.primary)}25 100%)`,
                    border: `3px solid ${card.color || colors.success.primary}`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '28px',
                    opacity: afterOpacity,
                    transform: 'rotateY(180deg)',
                    boxShadow: `0 8px 32px ${(card.color || colors.success.primary)}50, 0 0 60px ${(card.color || colors.success.primary)}40, inset 0 1px 0 ${(card.color || colors.success.primary)}60`,
                  }}
                >
                  <div
                    style={{
                      fontSize: mobileVideoTypography.fontSize.bodyLarge, // 比 before 更大
                      fontWeight: mobileVideoTypography.fontWeight.heading, // 更粗
                      color: colors.text.primary,
                      textAlign: 'center',
                      lineHeight: 1.3,
                      textShadow: `0 2px 8px rgba(0, 0, 0, 0.3)`, // 增加文字阴影
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
                    borderRadius: '20px',
                    background: `linear-gradient(145deg, ${card.color || colors.success.primary}, ${colors.primary.to})`,
                    opacity: interpolate(
                      effectiveFrame,
                      [TIMELINE.flipStart + index * 12 + 18, TIMELINE.flipStart + index * 12 + 40],
                      [0.8, 0],
                      { extrapolateRight: 'clamp' }
                    ),
                    zIndex: -1,
                    filter: 'blur(10px)', // 更明显的发光
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

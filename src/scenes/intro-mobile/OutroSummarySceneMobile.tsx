// OutroSummarySceneMobile - Scene 5: Summary outro (120 frames / 2 seconds @ 60fps)
// Mobile-optimized for 1080x1920 vertical canvas
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { colors, mobileVideoTypography, mobileVideoLayout } from '../../utils/theme';

export interface OutroSummarySceneMobileProps {
  delay?: number;
}

// 功能特性 - 移除 emoji，使用纯色块标识（符合 UI/UX Pro 规范）
const FEATURES = [
  { color: '#FF6B6B', text: '智能可控', sub: '引导 AI 更聪明' },
  { color: '#4ECDC4', text: '发挥最大效率', sub: '多 Agent 并发协作' },
  { color: '#FFE66D', text: '有趣体验', sub: '让编程充满乐趣' },
];

/**
 * OutroSummarySceneMobile - Mobile-optimized outro summary
 *
 * UI/UX Pro Max 优化:
 * - 移除 emoji，使用彩色标识块（专业 UI 设计）
 * - 增强卡片视觉对比度和层次
 * - 优化 CTA 按钮的视觉冲击力
 * - 更清晰的垂直节奏
 *
 * Layout optimizations for mobile vertical video (golden zone):
 * - Content positioned in central 60% of screen (golden zone)
 * - Top margin of 280px shifts content to center
 * - GitHub URL with nowrap to prevent text wrapping
 */
export const OutroSummarySceneMobile: React.FC<OutroSummarySceneMobileProps> = ({ delay = 0 }) => {
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
        justifyContent: 'flex-start', // 改为 flex-start，配合顶部间距控制整体位置
        padding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
      }}
    >
      {/* 顶部间距容器 - 将整体内容下移至屏幕中央黄金区域 */}
      <div style={{ height: '280px' }} /> {/* 约屏幕高度的 15%，将内容下移 */}

      {/* Logo/Brand name */}
      <div
        style={{
          fontSize: mobileVideoTypography.fontSize.hero,
          fontWeight: mobileVideoTypography.fontWeight.display,
          background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: `0 0 80px ${colors.primary.glow}`,
          textAlign: 'center',
          opacity,
          transform: `scale(${scale})`,
          marginBottom: '36px',
          lineHeight: 1.15,
        }}
      >
        HagiCode
      </div>

      {/* Tagline */}
      <div
        style={{
          fontSize: mobileVideoTypography.fontSize.bodyLarge,
          fontWeight: mobileVideoTypography.fontWeight.subheading,
          color: colors.text.secondary,
          textAlign: 'center',
          opacity: interpolate(entranceProgress, [0.3, 0.7], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          marginBottom: '32px', // 从 40px 调整为 32px，与标题间距保持一致
        }}
      >
        让你可以同时处理十个需求
      </div>

      {/* Feature cards - Single column stacked layout for mobile */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px', // 减小间距，从 24px → 18px
          width: '100%',
          maxWidth: '840px',
          marginBottom: '36px', // 减小底部间距，从 48px → 36px
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
                background: `linear-gradient(145deg, ${colors.background.medium} 0%, ${colors.background.light}50 100%)`,
                border: `3px solid ${colors.primary.to}40`, // 更明显的边框
                borderRadius: '20px', // 更圆润
                padding: '24px 32px',
                opacity: cardOpacity,
                transform: `translateY(${cardSlideUp}px) scale(${cardScale})`,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '24px', // 增加间距
                boxShadow: `0 12px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px ${colors.primary.to}20`, // 增强阴影
                width: '100%',
              }}
            >
              {/* Color indicator block - 替代 emoji */}
              <div
                style={{
                  width: '72px', // 固定宽度的色块
                  height: '72px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${feature.color} 0%, ${feature.color}dd 100%)`,
                  flexShrink: 0,
                  boxShadow: `0 6px 20px ${feature.color}60, inset 0 1px 0 ${feature.color}40`,
                  border: `2px solid ${feature.color}`,
                }}
              />

              {/* Text content */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px', // 增加间距
                  flex: 1,
                }}
              >
                {/* Feature text */}
                <div
                  style={{
                    fontSize: mobileVideoTypography.fontSize.bodyLarge, // 更大的字体
                    fontWeight: mobileVideoTypography.fontWeight.heading, // 更粗
                    color: colors.text.primary,
                    textAlign: 'left',
                    textShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
                  }}
                >
                  {feature.text}
                </div>

                {/* Sub text */}
                <div
                  style={{
                    fontSize: mobileVideoTypography.fontSize.bodySmall,
                    color: colors.text.secondary,
                    textAlign: 'left',
                    lineHeight: 1.4,
                  }}
                >
                  {feature.sub}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info - GitHub + QQ - 增强视觉冲击力 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px', // 增加间距
          opacity: interpolate(effectiveFrame, [60, 80], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          transform: `translateY(${interpolate(effectiveFrame, [60, 80], [20, 0], {
            extrapolateRight: 'clamp',
          })}px)`,
        }}
      >
        {/* GitHub CTA button - 更强的视觉冲击 */}
        <div
          style={{
            padding: '20px 56px', // 增加触摸区域
            borderRadius: '16px',
            background: `linear-gradient(135deg, ${colors.accent.primary}30 0%, ${colors.accent.primary}20 100%)`,
            border: `4px solid ${colors.accent.primary}80`, // 更粗、更明显的边框
            fontSize: mobileVideoTypography.fontSize.button,
            fontWeight: 700, // 更粗
            color: colors.accent.primary,
            whiteSpace: 'nowrap', // 防止 URL 文本换行
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 50px ${colors.accent.glow}60, 0 12px 40px ${colors.accent.primary}40`, // 增强阴影
            cursor: 'pointer',
          }}
        >
          github.com/HagiCode-org
        </div>

        {/* QQ Group - 优化视觉层次 */}
        <div
          style={{
            padding: '16px 40px', // 增加触摸区域
            borderRadius: '14px',
            background: `${colors.secondary.to}25`, // 增加不透明度
            border: `3px solid ${colors.secondary.to}60`, // 更明显的边框
            fontSize: mobileVideoTypography.fontSize.body,
            fontWeight: 600,
            color: colors.secondary.to,
            letterSpacing: '1px',
            boxShadow: `0 0 35px ${colors.secondary.glow}40`, // 增强阴影
          }}
        >
          QQ 群: 610394020
        </div>
      </div>
    </AbsoluteFill>
  );
};

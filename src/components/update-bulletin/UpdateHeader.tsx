// UpdateHeader component - 优化后的版本头部组件
// 增强内容传达：更清晰的视觉层次、更流畅的动画
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { colors, typography } from '../../utils/theme';

export interface UpdateHeaderProps {
  version: string;
  releaseDate: string;
  delay?: number;
  isMobile?: boolean;
}

export const UpdateHeader: React.FC<UpdateHeaderProps> = ({
  version,
  releaseDate,
  delay = 0,
  isMobile = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const effectiveFrame = frame - delay;

  // 根据设备类型配置不同的动画参数
  const config = isMobile ? {
    // 移动端配置
    logoScale: [0.7, 1],
    logoY: [-80, 0],
    subtitleY: [80, 0],
    logoSpring: { damping: 200, stiffness: 100 }, // 更平滑无弹跳
    subtitleSpring: { damping: 180, stiffness: 80 },
    subtitleDelay: 20, // 20 frames delay (0.33秒)
    dividerFadeIn: 30, // 分隔线淡入时间
    textGlow: true,
  } : {
    // 桌面端配置（保留原样）
    logoScale: [0.8, 1],
    logoY: [-100, 0],
    subtitleY: [100, 0],
    logoSpring: { damping: 15, stiffness: 100, mass: 0.8 },
    subtitleSpring: { damping: 12, stiffness: 80 },
    subtitleDelay: 15,
    dividerFadeIn: 30,
    textGlow: false,
  };

  // Logo 弹簧动画 - 淡入 + 缩放 + 位移动画
  const logoSpring = spring({
    frame: effectiveFrame,
    fps,
    config: config.logoSpring,
  });

  const logoY = interpolate(logoSpring, [0, 1], config.logoY);
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], config.logoScale);

  // 副标题（版本信息）动画 - 弹簧动画
  const subtitleProgress = spring({
    frame: Math.max(0, effectiveFrame - config.subtitleDelay),
    fps,
    config: config.subtitleSpring,
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], config.subtitleY);
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1]);

  // 装饰线动画
  const dividerOpacity = interpolate(effectiveFrame, [config.dividerFadeIn, config.dividerFadeIn + 30], [0, 0.6], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, ${colors.background.medium} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? '40px' : '60px', // 移动端更小的间距
        overflow: 'hidden',
      }}
    >
      {/* Animated background glow - 增强视觉吸引力 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${colors.primary.glow.replace('0.4', '0.1')} 0%, transparent 60%)`,
          opacity: interpolate(effectiveFrame, [0, 30], [0, 1]),
        }}
      />

      {/* Logo/Title */}
      <div
        style={{
          transform: `translateY(${logoY}px) scale(${logoScale})`,
          opacity: logoOpacity,
          textAlign: 'center',
        }}
      >
        {/* "Hagicode 更新简报" text - 优化视觉层次 */}
        <div
          style={{
            fontSize: isMobile ? '120px' : typography.fontSize.hero,
            fontWeight: typography.fontWeight.bold,
            fontFamily: typography.fontFamily.heading,
            background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            marginBottom: isMobile ? '16px' : '20px',
            textShadow: config.textGlow
              ? `0 0 60px ${colors.primary.glow}`
              : 'none',
            letterSpacing: isMobile ? '-2px' : '0',
          }}
        >
          Hagicode
        </div>
        <div
          style={{
            fontSize: isMobile ? '64px' : typography.fontSize.title,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.body,
            color: colors.text.secondary,
            textAlign: 'center',
          }}
        >
          更新简报
        </div>
      </div>

      {/* Version and Date */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '24px' : '40px',
          transform: `translateY(${subtitleY}px)`,
          opacity: subtitleOpacity,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: isMobile ? '52px' : typography.fontSize.subtitle,
            fontWeight: typography.fontWeight.medium,
            fontFamily: typography.fontFamily.mono,
            background: `linear-gradient(135deg, ${colors.secondary.from} 0%, ${colors.secondary.to} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {version}
        </div>
        <div
          style={{
            width: '2px',
            height: isMobile ? '32px' : '40px',
            background: colors.border.medium,
          }}
        />
        <div
          style={{
            fontSize: isMobile ? '44px' : typography.fontSize.bodyLarge,
            fontWeight: typography.fontWeight.normal,
            fontFamily: typography.fontFamily.mono,
            color: colors.text.secondary,
          }}
        >
          {releaseDate}
        </div>
      </div>

      {/* Decorative line */}
      <div
        style={{
          width: isMobile ? '160px' : '200px',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${colors.primary.from}, transparent)`,
          opacity: dividerOpacity,
        }}
      />
    </AbsoluteFill>
  );
};

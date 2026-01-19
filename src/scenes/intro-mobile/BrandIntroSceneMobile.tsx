// BrandIntroSceneMobile - Scene 1: Mobile video cover/thumbnail (60 frames / 1 second @ 60fps)
// Mobile-optimized for 1080x1920 vertical canvas
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, mobileVideoTypography, mobileVideoLayout } from '../../utils/theme';

export interface BrandIntroSceneMobileProps {
  delay?: number;
}

/**
 * BrandIntroSceneMobile - Mobile-optimized brand intro for vertical video
 *
 * Key adaptations from desktop BrandIntroScene:
 * - Larger proportional fonts (160px hero vs 140px desktop)
 * - Adjusted spacing for vertical canvas (60px/80px safe zones)
 * - Tighter layout for 1080px width
 * - Same glow and animation patterns for visual consistency
 */
export const BrandIntroSceneMobile: React.FC<BrandIntroSceneMobileProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  // Subtle continuous glow pulse (breathing effect)
  const glowPulse = interpolate(
    effectiveFrame % 120,
    [0, 60, 120],
    [0.6, 1, 0.6],
    { extrapolateRight: 'clamp' }
  );

  // Subtle floating animation for main element
  const floatY = interpolate(
    effectiveFrame % 180,
    [0, 90, 180],
    [0, -6, 0],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, #0B1120 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `0 ${mobileVideoLayout.safeZone.horizontal}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background glow - centered behind logo */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.primary.glow}40 0%, transparent 65%)`,
          top: '45%',
          left: '50%',
          transform: `translate(-50%, -50%) scale(${0.7 + glowPulse * 0.3})`,
          opacity: 0.8,
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />

      {/* Secondary glow accent - cyan offset */}
      <div
        style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors.accent.glow}25 0%, transparent 70%)`,
          top: '55%',
          left: '55%',
          transform: `translate(-50%, -50%) scale(${0.8 + glowPulse * 0.2})`,
          opacity: 0.5,
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* Main content - centered hero layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `translateY(${floatY}px)`,
        }}
      >
        {/* Main product name - HagiCode */}
        <div
          style={{
            fontSize: mobileVideoTypography.fontSize.hero,
            fontWeight: mobileVideoTypography.fontWeight.display,
            fontFamily: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
            background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 50%, ${colors.accent.primary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 60px ${colors.primary.glow})`,
            marginBottom: '12px', // 减小间距，更紧凑
            lineHeight: 1.1,
            letterSpacing: '-3px',
            textAlign: 'center',
          }}
        >
          HagiCode
        </div>

        {/* Chinese name - 哈基码 */}
        <div
          style={{
            fontSize: '72px', // 稍微减小，与英文更协调
            fontWeight: 600,
            color: colors.text.secondary,
            marginBottom: '60px', // 增加与分隔线的间距
            letterSpacing: '8px', // 减小字间距，更紧凑
            opacity: 0.9, // 增加不透明度
            textAlign: 'center',
          }}
        >
          哈基码
        </div>

        {/* Divider line */}
        <div
          style={{
            width: '120px', // 稍微加长
            height: '3px',
            background: `linear-gradient(90deg, transparent 0%, ${colors.accent.primary} 50%, transparent 100%)`,
            marginBottom: '60px', // 保持间距
            opacity: 0.8, // 增加不透明度
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: mobileVideoTypography.fontSize.body,
            fontWeight: mobileVideoTypography.fontWeight.body,
            color: colors.text.muted,
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: 1.5,
            letterSpacing: '1px',
          }}
        >
          让你可以同时处理十个需求
        </div>
      </div>

      {/* Bottom info - GitHub + QQ */}
      <div
        style={{
          position: 'absolute',
          bottom: mobileVideoLayout.safeZone.vertical,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px', // 增加间距，更清晰
          zIndex: 2,
        }}
      >
        {/* GitHub link - 增强视觉冲击 */}
        <div
          style={{
            padding: '16px 48px', // 增加触摸区域
            borderRadius: '16px', // 更圆润
            background: `linear-gradient(135deg, ${colors.accent.primary}25 0%, ${colors.accent.primary}15 100%)`,
            border: `3px solid ${colors.accent.primary}70`, // 更明显的边框
            fontSize: mobileVideoTypography.fontSize.button,
            fontWeight: 700, // 更粗的字体
            color: colors.accent.primary,
            letterSpacing: '1px',
            whiteSpace: 'nowrap', // 防止 URL 文本换行
            boxShadow: `0 0 40px ${colors.accent.glow}50, 0 8px 32px ${colors.accent.primary}30`, // 增强阴影
          }}
        >
          github.com/HagiCode-org
        </div>

        {/* QQ Group - 优化视觉层次 */}
        <div
          style={{
            padding: '14px 36px', // 增加触摸区域
            borderRadius: '12px',
            background: `${colors.secondary.to}20`, // 稍微增加不透明度
            border: `2px solid ${colors.secondary.to}50`, // 更明显的边框
            fontSize: mobileVideoTypography.fontSize.bodySmall,
            fontWeight: 600,
            color: colors.secondary.to,
            letterSpacing: '1px',
            boxShadow: `0 0 30px ${colors.secondary.glow}35`, // 增强阴影
          }}
        >
          QQ 群: 610394020
        </div>
      </div>

      {/* Decorative corner elements - subtle tech feel */}
      <div
        style={{
          position: 'absolute',
          top: mobileVideoLayout.safeZone.vertical,
          left: mobileVideoLayout.safeZone.horizontal,
          width: '50px',
          height: '50px',
          borderTop: `2px solid ${colors.primary.to}25`,
          borderLeft: `2px solid ${colors.primary.to}25`,
          borderRadius: '4px 0 0 0',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: mobileVideoLayout.safeZone.vertical,
          right: mobileVideoLayout.safeZone.horizontal,
          width: '50px',
          height: '50px',
          borderTop: `2px solid ${colors.primary.to}25`,
          borderRight: `2px solid ${colors.primary.to}25`,
          borderRadius: '0 4px 0 0',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: mobileVideoLayout.safeZone.vertical,
          left: mobileVideoLayout.safeZone.horizontal,
          width: '50px',
          height: '50px',
          borderBottom: `2px solid ${colors.primary.to}25`,
          borderLeft: `2px solid ${colors.primary.to}25`,
          borderRadius: '0 0 0 4px',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: mobileVideoLayout.safeZone.vertical,
          right: mobileVideoLayout.safeZone.horizontal,
          width: '50px',
          height: '50px',
          borderBottom: `2px solid ${colors.primary.to}25`,
          borderRight: `2px solid ${colors.primary.to}25`,
          borderRadius: '0 0 4px 0',
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};

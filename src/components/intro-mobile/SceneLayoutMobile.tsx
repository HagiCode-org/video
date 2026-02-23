// SceneLayoutMobile - Mobile layout component for intro scenes (1080x1920 vertical)
// Ensures consistent title positioning across all mobile scenes
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors, mobileVideoTypography, mobileVideoLayout } from '../../utils/theme';

export interface SceneLayoutMobileProps {
  title: string;
  titleOpacity?: number;
  titleScale?: number;
  children: React.ReactNode;
}

/**
 * SceneLayoutMobile - Mobile-optimized scene layout for 1080x1920 vertical video
 *
 * Key adaptations from desktop SceneLayout:
 * - Adjusted safe zones (60px horizontal, 80px vertical)
 * - Larger proportional fonts for narrow canvas
 * - Single-column layout optimization
 * - Content centered vertically for better visual balance
 * - Optimized spacing to fit content within viewport
 *
 * Layout optimizations for mobile vertical video (golden zone):
 * - Title positioned at 220px from top (~11.5% of screen height)
 * - Content area with reduced paddingTop for better vertical spacing
 * - Optimized for mobile platforms (Douyin, Bilibili, Xiaohongshu)
 */
export const SceneLayoutMobile: React.FC<SceneLayoutMobileProps> = ({
  title,
  titleOpacity = 1,
  titleScale = 1,
  children,
}) => {
  return (
    <AbsoluteFill
      style={{
        background: colors.background.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center', // 改回居中，让主要元素在中间展示
        padding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '220px', // 从 safeZone.vertical (80px) 改为 220px，约屏幕高度的 11.5%，将标题下移至黄金视野边缘
          left: '50%',
          transform: `translateX(-50%) scale(${titleScale})`,
          fontSize: mobileVideoTypography.fontSize.title,
          fontWeight: mobileVideoTypography.fontWeight.heading,
          fontFamily: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
          background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 50%, ${colors.accent.primary} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: colors.text.primary,
          opacity: titleOpacity,
          textAlign: 'center',
          width: '100%',
          lineHeight: mobileVideoTypography.lineHeight.tight,
        }}
      >
        {"HagiCode"}
      </div>
      {/* Title - Positioned in golden zone (moved down from top) */}
      <div
        style={{
          position: 'absolute',
          top: '380px', // 从 safeZone.vertical (80px) 改为 220px，约屏幕高度的 11.5%，将标题下移至黄金视野边缘
          left: '50%',
          transform: `translateX(-50%) scale(${titleScale})`,
          fontSize: mobileVideoTypography.fontSize.title,
          fontWeight: mobileVideoTypography.fontWeight.heading,
          color: colors.text.primary,
          opacity: titleOpacity,
          textAlign: 'center',
          width: '100%',
          lineHeight: mobileVideoTypography.lineHeight.tight,
        }}
      >
        {title}
      </div>

      {/* Content area - Centered with reduced paddingTop for better spacing */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // 居中对齐，让内容在中间
          width: '100%',
          height: '100%',
          paddingTop: '60px', // 从 160px 减小到 60px，让内容与标题之间的间距更协调
          paddingBottom: '100px', // 底部留白
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

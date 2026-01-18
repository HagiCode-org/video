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
      {/* Title - Fixed position at top center */}
      <div
        style={{
          position: 'absolute',
          top: mobileVideoLayout.safeZone.vertical,
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

      {/* Content area - Centered with proper spacing */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // 居中对齐，让内容在中间
          width: '100%',
          height: '100%',
          paddingTop: '160px', // 为标题留出空间
          paddingBottom: '100px', // 底部留白
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

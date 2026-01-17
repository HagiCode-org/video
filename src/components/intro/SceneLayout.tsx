// SceneLayout - Unified layout component for intro scenes
// Ensures consistent title positioning across all scenes for 1920x1080 video
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors, videoTypography, videoLayout } from '../../utils/theme';

export interface SceneLayoutProps {
  title: string;
  titleOpacity?: number;
  titleScale?: number;
  children: React.ReactNode;
}

export const SceneLayout: React.FC<SceneLayoutProps> = ({
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
        justifyContent: 'center',
        padding: `${videoLayout.safeZone.vertical}px ${videoLayout.safeZone.horizontal}px`,
      }}
    >
      {/* Title - Fixed position at top center */}
      <div
        style={{
          position: 'absolute',
          top: videoLayout.safeZone.vertical,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: videoTypography.fontSize.title,
          fontWeight: videoTypography.fontWeight.heading,
          color: colors.text.primary,
          opacity: titleOpacity,
          transform: `translateX(-50%) scale(${titleScale})`,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {title}
      </div>

      {/* Content area - Below title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          paddingTop: '120px', // Space for title
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

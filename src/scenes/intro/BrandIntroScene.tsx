// BrandIntroScene - Scene 1: Video cover/thumbnail (60 frames / 1 second @ 60fps)
// UI/UX Pro Max optimized design - Hero centered layout with clear hierarchy
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, videoTypography, videoLayout } from '../../utils/theme';

export interface BrandIntroSceneProps {
  delay?: number;
}

export const BrandIntroScene: React.FC<BrandIntroSceneProps> = ({ delay = 0 }) => {
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
        padding: `0 ${videoLayout.safeZone.horizontal}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background glow - centered behind logo */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
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
          width: '500px',
          height: '500px',
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
            fontSize: '160px',
            fontWeight: 800,
            fontFamily: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
            background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 50%, ${colors.accent.primary} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 50px ${colors.primary.glow})`,
            marginBottom: '16px',
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
            fontSize: '72px',
            fontWeight: 600,
            color: colors.text.secondary,
            marginBottom: '60px',
            letterSpacing: '12px',
            opacity: 0.85,
            textAlign: 'center',
          }}
        >
          哈基码
        </div>

        {/* Divider line */}
        <div
          style={{
            width: '120px',
            height: '3px',
            background: `linear-gradient(90deg, transparent 0%, ${colors.accent.primary} 50%, transparent 100%)`,
            marginBottom: '60px',
            opacity: 0.6,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: videoTypography.fontSize.body,
            fontWeight: 500,
            color: colors.text.muted,
            textAlign: 'center',
            maxWidth: '700px',
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
          bottom: videoLayout.safeZone.vertical,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          zIndex: 2,
        }}
      >
        {/* GitHub link */}
        <div
          style={{
            padding: '14px 36px',
            borderRadius: '12px',
            background: `${colors.accent.primary}15`,
            border: `2px solid ${colors.accent.primary}50`,
            fontSize: videoTypography.fontSize.bodySmall,
            fontWeight: 600,
            color: colors.accent.primary,
            letterSpacing: '0.5px',
            boxShadow: `0 0 25px ${colors.accent.glow}40`,
          }}
        >
          github.com/HagiCode-org
        </div>

        {/* QQ Group */}
        <div
          style={{
            padding: '10px 28px',
            borderRadius: '10px',
            background: `${colors.secondary.to}12`,
            border: `2px solid ${colors.secondary.to}35`,
            fontSize: '38px',
            fontWeight: 500,
            color: colors.secondary.to,
            letterSpacing: '0.5px',
            boxShadow: `0 0 20px ${colors.secondary.glow}25`,
          }}
        >
          QQ 群: 610394020
        </div>
      </div>

      {/* Decorative corner elements - subtle tech feel */}
      <div
        style={{
          position: 'absolute',
          top: videoLayout.safeZone.vertical,
          left: videoLayout.safeZone.horizontal,
          width: '60px',
          height: '60px',
          borderTop: `2px solid ${colors.primary.to}25`,
          borderLeft: `2px solid ${colors.primary.to}25`,
          borderRadius: '4px 0 0 0',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: videoLayout.safeZone.vertical,
          right: videoLayout.safeZone.horizontal,
          width: '60px',
          height: '60px',
          borderTop: `2px solid ${colors.primary.to}25`,
          borderRight: `2px solid ${colors.primary.to}25`,
          borderRadius: '0 4px 0 0',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: videoLayout.safeZone.vertical,
          left: videoLayout.safeZone.horizontal,
          width: '60px',
          height: '60px',
          borderBottom: `2px solid ${colors.primary.to}25`,
          borderLeft: `2px solid ${colors.primary.to}25`,
          borderRadius: '0 0 0 4px',
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: videoLayout.safeZone.vertical,
          right: videoLayout.safeZone.horizontal,
          width: '60px',
          height: '60px',
          borderBottom: `2px solid ${colors.primary.to}25`,
          borderRight: `2px solid ${colors.primary.to}25`,
          borderRadius: '0 0 4px 0',
          opacity: 0.4,
        }}
      />
    </AbsoluteFill>
  );
};

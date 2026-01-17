// HighlightItem component - Display a highlighted update item with enhanced animations
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing, Img, staticFile } from 'remotion';
import { colors, typography, glass } from '../../utils/theme';
import type { HighlightItem as HighlightItemType } from '../../compositions/schema';

export interface HighlightItemProps {
  item: HighlightItemType;
  index: number;
  total: number;
  delay?: number;
}

// Tag colors based on category - using theme colors
const getTagColor = (tag: string): string => {
  const colorMap: Record<string, string> = {
    feature: colors.tag.feature.text,
    bugfix: colors.tag.bugfix.text,
    improvement: colors.tag.improvement.text,
    ai: colors.tag.ai.text,
    ui: colors.tag.ui.text,
    performance: colors.tag.performance.text,
    other: colors.tag.other.text,
  };
  return colorMap[tag] || colorMap.other;
};

// Tag label mapping - using theme labels
const getTagLabel = (tag: string): string => {
  const labelMap: Record<string, string> = {
    feature: colors.tag.feature.label,
    bugfix: colors.tag.bugfix.label,
    improvement: colors.tag.improvement.label,
    ai: colors.tag.ai.label,
    ui: colors.tag.ui.label,
    performance: colors.tag.performance.label,
    other: colors.tag.other.label,
  };
  return labelMap[tag] || tag;
};

// Floating particle component
const FloatingParticle: React.FC<{
  delay: number;
  duration: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
}> = ({ delay, duration, size, x, y, opacity }) => {
  const frame = useCurrentFrame();

  const offsetY = interpolate(
    frame,
    [delay, delay + duration],
    [0, -150],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  const particleOpacity = interpolate(
    frame,
    [delay, delay + 20, delay + duration - 20, delay + duration],
    [0, opacity, opacity, 0],
    { extrapolateRight: 'clamp' }
  );

  const scale = interpolate(
    frame,
    [delay, delay + duration / 2],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.primary.glow} 0%, transparent 70%)`,
        opacity: particleOpacity,
        transform: `translateY(${offsetY}px) scale(${scale})`,
        pointerEvents: 'none',
      }}
    />
  );
};

export const HighlightItem: React.FC<HighlightItemProps> = ({
  item,
  index,
  total,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // ========== CARD ENTRANCE ==========
  // Smooth spring animation for card entrance
  const cardSpring = spring({
    frame: effectiveFrame,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 0.6,
    },
  });

  const cardX = interpolate(cardSpring, [0, 1], [500, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const cardOpacity = interpolate(cardSpring, [0, 0.3, 1], [0, 0, 1]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);

  // ========== BACKGROUND GRADIENT ANIMATION ==========
  // Slow shifting gradient background
  const gradientShift = interpolate(
    effectiveFrame,
    [0, 150],
    [0, 360],
    { extrapolateRight: 'clamp' }
  );

  const bgGradient = `linear-gradient(${gradientShift}deg, ${colors.background.dark} 0%, ${colors.background.medium} 50%, ${colors.background.dark} 100%)`;

  // ========== PROGRESS INDICATOR ==========
  // Progress bar at bottom showing current position
  const progressWidth = interpolate(effectiveFrame, [0, 120], [0, 100], {
    extrapolateRight: 'clamp',
  });

  const progressOpacity = interpolate(effectiveFrame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ========== COUNTER DISPLAY ==========
  // Show current highlight number (e.g., "01 / 03")
  const counterOpacity = interpolate(effectiveFrame, [10, 30], [0, 1]);
  const counterScale = interpolate(effectiveFrame, [10, 35], [0.5, 1], {
    extrapolateRight: 'clamp',
  });

  // ========== CONTENT ENTRANCE (ALL TOGETHER) ==========
  // All content elements animate together
  const contentSpring = spring({
    frame: effectiveFrame - 20,
    fps: 30,
    config: { damping: 15, stiffness: 90 },
  });

  const contentOpacity = interpolate(contentSpring, [0, 0.5, 1], [0, 0, 1]);
  const contentY = interpolate(contentSpring, [0, 1], [40, 0]);
  const contentScale = interpolate(contentSpring, [0, 1], [0.9, 1]);

  // ========== TAGS PULSE ==========
  // All tags appear together and pulse simultaneously
  const getPulseScale = (tagIndex: number) => {
    // Subtle pulse animation after entrance
    const pulse = interpolate(
      effectiveFrame,
      [50, 70, 90],
      [1, 1.05, 1],
      { extrapolateRight: 'clamp', easing: Easing.sin }
    );
    return pulse;
  };

  // ========== SCREENSHOT WITH GLOW ==========
  const screenshotOpacity = interpolate(effectiveFrame, [40, 65], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const screenshotScale = interpolate(effectiveFrame, [40, 75], [0.9, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back),
  });

  // Intensifying glow effect
  const glowIntensity = interpolate(
    effectiveFrame,
    [50, 150],
    [0.5, 1],
    { extrapolateRight: 'clamp', easing: Easing.sin }
  );

  // Secondary glow pulse
  const secondaryGlow = interpolate(
    effectiveFrame,
    [50, 90, 130],
    [0, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  const hasScreenshot = !!item.screenshot;
  const tags = item.tags || [];

  // Generate particles for background
  const particles = React.useMemo(() => {
    const particleCount = 8;
    return Array.from({ length: particleCount }, (_, i) => ({
      delay: i * 15,
      duration: 100 + Math.random() * 50,
      size: 4 + Math.random() * 8,
      x: Math.random() * 1920,
      y: 900 + Math.random() * 180,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px',
        overflow: 'hidden',
      }}
    >
      {/* Animated background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${colors.primary.glow.replace('0.4', '0.15')} 0%, transparent 50%)`,
          opacity: interpolate(effectiveFrame, [0, 60], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Progress bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: `${colors.border.accent}20`,
          opacity: progressOpacity,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressWidth}%`,
            background: `linear-gradient(90deg, ${colors.primary.main}, ${colors.primary.accent})`,
            boxShadow: `0 0 20px ${colors.primary.glow}`,
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* Counter display */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '100px',
          fontSize: typography.fontSize.subtitle,
          fontWeight: typography.fontWeight.bold,
          fontFamily: typography.fontFamily.mono,
          color: colors.primary.accent,
          opacity: counterOpacity,
          transform: `scale(${counterScale})`,
          textShadow: `0 0 30px ${colors.primary.glow}`,
        }}
      >
        {String(index + 1).padStart(2, '0')} <span style={{ opacity: 0.5 }}>/ {String(total).padStart(2, '0')}</span>
      </div>

      {/* Main content card */}
      <div
        style={{
          width: hasScreenshot ? '1400px' : '1200px',
          maxWidth: '90%',
          background: glass.card.background,
          backdropFilter: glass.card.backdropFilter,
          border: glass.card.border,
          borderRadius: '32px',
          padding: hasScreenshot ? '60px' : '80px',
          boxShadow: `0 8px 32px ${colors.background.medium}40, 0 0 60px ${colors.primary.glow.replace('0.4', String(glowIntensity * 0.3))}`,
          opacity: cardOpacity,
          transform: `translateX(${cardX}px) scale(${cardScale})`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated border glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '32px',
            padding: '2px',
            background: `linear-gradient(${gradientShift * 0.5}deg, ${colors.primary.main}40, ${colors.primary.accent}40, ${colors.primary.main}40)`,
            opacity: glowIntensity * 0.5,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Title - full title display with entrance animation */}
        <div
          style={{
            fontSize: typography.fontSize.subtitle,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.heading,
            color: colors.text.primary,
            marginBottom: '28px',
            minHeight: '1.2em',
            position: 'relative',
            opacity: contentOpacity,
            transform: `translateY(${contentY}px) scale(${contentScale})`,
            textShadow: `0 0 40px ${colors.primary.glow.replace('0.4', '0.6')}, 0 0 80px ${colors.primary.accent}40`,
          }}
        >
          {item.title}
        </div>

        {/* Tags - all appear together with entrance */}
        {tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '28px',
              flexWrap: 'wrap',
              opacity: contentOpacity,
              transform: `translateY(${contentY}px) scale(${contentScale})`,
            }}
          >
            {tags.map((tag, i) => {
              const pulse = getPulseScale(i);
              return (
                <div
                  key={tag}
                  style={{
                    padding: '10px 24px',
                    background: `linear-gradient(135deg, ${getTagColor(tag)}20 0%, ${getTagColor(tag)}30 100%)`,
                    border: `1px solid ${getTagColor(tag)}50`,
                    borderRadius: '24px',
                    fontSize: typography.fontSize.bodySmall,
                    color: getTagColor(tag),
                    fontWeight: typography.fontWeight.medium,
                    transform: `scale(${pulse})`,
                    boxShadow: `0 0 ${20 * pulse}px ${getTagColor(tag)}30`,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {getTagLabel(tag)}
                </div>
              );
            })}
          </div>
        )}

        {/* Description - with entrance animation */}
        <div
          style={{
            fontSize: typography.fontSize.bodyLarge,
            color: colors.text.primary,
            lineHeight: typography.lineHeight.relaxed,
            marginBottom: hasScreenshot ? '40px' : '0',
            opacity: contentOpacity,
            transform: `translateY(${contentY}px) scale(${contentScale})`,
            textShadow: `0 2px 20px ${colors.background.dark}80`,
          }}
        >
          {item.description}
        </div>

        {/* Screenshot with enhanced glow */}
        {hasScreenshot && item.screenshot && (
          <div
            style={{
              position: 'relative',
              opacity: screenshotOpacity,
              transform: `scale(${screenshotScale})`,
            }}
          >
            {/* Primary glow effect */}
            <div
              style={{
                position: 'absolute',
                inset: -30,
                background: `radial-gradient(circle at center, ${colors.primary.glow.replace('0.4', String(glowIntensity * 0.8))} 0%, transparent 60%)`,
                filter: 'blur(50px)',
                borderRadius: '20px',
                zIndex: -1,
              }}
            />

            {/* Secondary pulsing glow */}
            <div
              style={{
                position: 'absolute',
                inset: -40,
                background: `radial-gradient(circle at center, ${colors.primary.accent}40 0%, transparent 70%)`,
                filter: 'blur(60px)',
                borderRadius: '24px',
                zIndex: -2,
                opacity: secondaryGlow * 0.5,
              }}
            />

            {/* Image container with animated border */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: `2px solid ${colors.primary.accent}${Math.floor(glowIntensity * 100).toString(16).padStart(2, '0')}`,
                boxShadow: `0 0 ${40 * glowIntensity}px ${colors.primary.glow}, inset 0 0 60px ${colors.primary.glow.replace('0.4', '0.1')}`,
                background: colors.background.dark,
                position: 'relative',
              }}
            >
              {/* Scanline effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 0%, ${colors.primary.main}10 50%, transparent 100%)`,
                  transform: `translateY(${interpolate(effectiveFrame, [70, 150], [-100, 600], { extrapolateRight: 'clamp' })}px)`,
                  opacity: 0.5,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />

              <Img
                src={item.screenshot.startsWith('http') ? item.screenshot : staticFile(item.screenshot)}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

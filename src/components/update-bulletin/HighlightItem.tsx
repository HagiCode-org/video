// HighlightItem component - Display a highlighted update item with enhanced animations
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Easing, Img, staticFile } from 'remotion';
import { colors, typography, glass, mobileVideoTypography, mobileVideoLayout } from '../../utils/theme';
import type { HighlightItem as HighlightItemType } from '../../compositions/schema';

export interface HighlightItemProps {
  item: HighlightItemType;
  index: number;
  total: number;
  delay?: number;
  isMobile?: boolean;
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
  isMobile = false,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;
  const hasScreenshot = !!item.screenshot;

  // ========== CONFIGURATION SELECTION ==========
  // Select appropriate typography and layout based on mobile/desktop mode
  const config = isMobile ? {
    typography: mobileVideoTypography,
    layout: mobileVideoLayout,
    fps: 60 as const,
    canvasWidth: 1080,
    canvasHeight: 1920,
    cardWidth: hasScreenshot ? 860 : 800,
    cardPadding: hasScreenshot ? '40px' : '48px',
    containerPadding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
    counterPosition: { top: '80px', right: '60px' },
    screenshotMaxHeight: '600px',
    scanlineRange: [-100, 1000] as [number, number],
    springMultiplier: 2 as const,
  } : {
    typography: typography,
    layout: null,
    fps: 30 as const,
    canvasWidth: 1920,
    canvasHeight: 1080,
    cardWidth: hasScreenshot ? 1400 : 1200,
    cardPadding: hasScreenshot ? '60px' : '80px',
    containerPadding: '100px',
    counterPosition: { top: '80px', right: '100px' },
    screenshotMaxHeight: '500px',
    scanlineRange: [-100, 600] as [number, number],
    springMultiplier: 1 as const,
  };

  // ========== CARD ENTRANCE ==========
  // Skip entrance animation - display immediately
  const cardSpring = 1;

  const cardX = interpolate(cardSpring, [0, 1], [500, 0], {
    easing: Easing.out(Easing.cubic),
  });
  const cardOpacity = interpolate(cardSpring, [0, 0.3, 1], [0, 0, 1]);
  const cardScale = interpolate(cardSpring, [0, 1], [0.8, 1]);

  // ========== BACKGROUND GRADIENT ANIMATION ==========
  // Slow shifting gradient background
  const gradientShift = interpolate(
    effectiveFrame,
    [0, 150 * config.springMultiplier],
    [0, 360],
    { extrapolateRight: 'clamp' }
  );

  const bgGradient = `linear-gradient(${gradientShift}deg, ${colors.background.dark} 0%, ${colors.background.medium} 50%, ${colors.background.dark} 100%)`;

  // ========== PROGRESS INDICATOR ==========
  // Progress bar at bottom showing current position
  const progressWidth = interpolate(effectiveFrame, [0, 120 * config.springMultiplier], [0, 100], {
    extrapolateRight: 'clamp',
  });

  const progressOpacity = interpolate(effectiveFrame, [0, 15 * config.springMultiplier], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // ========== COUNTER DISPLAY ==========
  // Show current highlight number (e.g., "01 / 03")
  const counterOpacity = interpolate(effectiveFrame, [10 * config.springMultiplier, 30 * config.springMultiplier], [0, 1]);
  const counterScale = interpolate(effectiveFrame, [10 * config.springMultiplier, 35 * config.springMultiplier], [0.5, 1], {
    extrapolateRight: 'clamp',
  });

  // ========== CONTENT ENTRANCE (ALL TOGETHER) ==========
  // Skip entrance animation - display immediately
  const contentSpring = 1;

  const contentOpacity = interpolate(contentSpring, [0, 0.5, 1], [0, 0, 1]);
  const contentY = interpolate(contentSpring, [0, 1], [40, 0]);
  const contentScale = interpolate(contentSpring, [0, 1], [0.9, 1]);

  // ========== TAGS PULSE ==========
  // All tags appear together and pulse simultaneously
  const getPulseScale = (tagIndex: number) => {
    // Subtle pulse animation after entrance
    const pulse = interpolate(
      effectiveFrame,
      [50 * config.springMultiplier, 70 * config.springMultiplier, 90 * config.springMultiplier],
      [1, 1.05, 1],
      { extrapolateRight: 'clamp', easing: Easing.sin }
    );
    return pulse;
  };

  // ========== SCREENSHOT WITH GLOW ==========
  // Skip entrance animation - display immediately
  const screenshotOpacity = 1;
  const screenshotScale = 1;

  // Intensifying glow effect
  const glowIntensity = interpolate(
    effectiveFrame,
    [50 * config.springMultiplier, 150 * config.springMultiplier],
    [0.5, 1],
    { extrapolateRight: 'clamp', easing: Easing.sin }
  );

  // Secondary glow pulse
  const secondaryGlow = interpolate(
    effectiveFrame,
    [50 * config.springMultiplier, 90 * config.springMultiplier, 130 * config.springMultiplier],
    [0, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  const tags = item.tags || [];

  // ========== SCREENSHOT SHOWCASE MODE ==========
  // For items with screenshots: in last 2 seconds, screenshot floats out and expands to fullscreen
  // Timeline:
  //   0-180 frames (0-3 sec): Normal content display with screenshot in card
  //   180-210 frames (3-3.5 sec): Screenshot floats out from card
  //   210-300 frames (3.5-5 sec): Screenshot displayed fullscreen, card fades out

  // IMPORTANT: Don't multiply by springMultiplier here, because effectiveFrame
  // is already the actual frame number (not scaled)
  const showcaseStartFrame = 180; // Fixed at 180 frames (3 seconds)
  const showcaseTransitionDuration = 30; // Fixed at 30 frames (0.5 seconds)
  const isShowcaseMode = hasScreenshot && effectiveFrame >= showcaseStartFrame;

  // Transition progress (0 = normal mode, 1 = full showcase mode)
  const showcaseProgress = interpolate(
    effectiveFrame,
    [showcaseStartFrame, showcaseStartFrame + showcaseTransitionDuration],
    [0, 1],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Card and content fade out
  const cardOpacityInShowcase = interpolate(showcaseProgress, [0, 0.2, 1], [1, 1, 0]);
  const detailsOpacityInShowcase = interpolate(showcaseProgress, [0, 0.2, 1], [1, 1, 0]);
  const uiOpacityInShowcase = interpolate(showcaseProgress, [0, 0.2, 1], [1, 1, 0]);

  // Screenshot: float to center and expand to fullscreen
  // Position: from relative in card to absolute center of screen
  const screenshotZIndex = interpolate(showcaseProgress, [0, 1], [1, 100]);

  // Fullscreen screenshot width - use canvas width as the base
  const fullscreenWidth = config.canvasWidth; // 1080px for mobile, 1920px for desktop
  const cardWidth = config.cardWidth; // 860px for mobile with screenshot

  // Width interpolation: from card width to fullscreen width
  const currentWidth = interpolate(showcaseProgress, [0, 1], [cardWidth, fullscreenWidth]);

  // Fullscreen max height - use most of screen height (leave some margin)
  const fullscreenMaxHeight = isMobile ? 1700 : 900; // Leave margin for title etc
  const currentMaxHeight = interpolate(showcaseProgress, [0, 1], [parseInt(config.screenshotMaxHeight), fullscreenMaxHeight]);

  // Generate particles for background
  const particles = React.useMemo(() => {
    const particleCount = 8;
    return Array.from({ length: particleCount }, (_, i) => ({
      delay: i * 15 * config.springMultiplier,
      duration: (100 + Math.random() * 50) * config.springMultiplier,
      size: 4 + Math.random() * 8,
      x: Math.random() * config.canvasWidth,
      y: (config.canvasHeight * 0.8) + Math.random() * (config.canvasHeight * 0.1),
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, [config.canvasWidth, config.canvasHeight, config.springMultiplier]);

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: config.containerPadding,
        overflow: isShowcaseMode ? 'visible' : 'hidden',
      }}
    >
      {/* Animated background gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${colors.primary.glow.replace('0.4', '0.15')} 0%, transparent 50%)`,
          opacity: interpolate(effectiveFrame, [0, 60 * config.springMultiplier], [0, 1], { extrapolateRight: 'clamp' }),
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
          opacity: progressOpacity * uiOpacityInShowcase,
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
          top: config.counterPosition.top,
          right: config.counterPosition.right,
          fontSize: config.typography.fontSize.subtitle,
          fontWeight: config.typography.fontWeight.bold,
          fontFamily: config.typography.fontFamily.mono,
          color: colors.text.secondary,
          opacity: counterOpacity * uiOpacityInShowcase,
          transform: `scale(${counterScale})`,
          textShadow: `0 0 20px ${colors.primary.glow}, 0 0 40px ${colors.background.medium}80`,
        }}
      >
        {String(index + 1).padStart(2, '0')} <span style={{ opacity: 0.5, color: colors.text.muted }}>/ {String(total).padStart(2, '0')}</span>
      </div>

      {/* Main content card */}
      <div
        style={{
          width: `${config.cardWidth}px`,
          maxWidth: '90%',
          background: glass.card.background,
          backdropFilter: glass.card.backdropFilter,
          border: glass.card.border,
          borderRadius: '32px',
          padding: config.cardPadding,
          boxShadow: `0 8px 32px ${colors.background.medium}40, 0 0 60px ${colors.primary.glow.replace('0.4', String(glowIntensity * 0.3))}`,
          opacity: isShowcaseMode ? cardOpacity * cardOpacityInShowcase : cardOpacity,
          transform: `translateX(${cardX}px) scale(${cardScale})`,
          position: 'relative',
          overflow: 'visible',
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
            fontSize: config.typography.fontSize.subtitle,
            fontWeight: config.typography.fontWeight.semibold,
            fontFamily: config.typography.fontFamily.heading,
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
              opacity: isShowcaseMode ? contentOpacity * detailsOpacityInShowcase : contentOpacity,
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
                    fontSize: config.typography.fontSize.bodySmall,
                    color: getTagColor(tag),
                    fontWeight: config.typography.fontWeight.medium,
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
            fontSize: config.typography.fontSize.bodyLarge,
            color: colors.text.primary,
            lineHeight: config.typography.lineHeight.relaxed,
            marginBottom: hasScreenshot ? '40px' : '0',
            opacity: isShowcaseMode ? contentOpacity * detailsOpacityInShowcase : contentOpacity,
            transform: `translateY(${contentY}px) scale(${contentScale})`,
            textShadow: `0 2px 20px ${colors.background.dark}80`,
          }}
        >
          {item.description}
        </div>

        {/* Screenshot with enhanced glow - In card (fades out) */}
        {hasScreenshot && item.screenshot && (
          <div
            style={{
              position: 'relative',
              opacity: isShowcaseMode ? screenshotOpacity * (1 - showcaseProgress) : screenshotOpacity,
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
                  transform: `translateY(${interpolate(effectiveFrame, [70, 150], config.scanlineRange, { extrapolateRight: 'clamp' })}px)`,
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
                  maxHeight: config.screenshotMaxHeight,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN SCREENSHOT SHOWCASE - Second screenshot element that fades in at center */}
      {hasScreenshot && item.screenshot && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${currentWidth}px`,
            transform: 'translate(-50%, -50%)',
            opacity: showcaseProgress,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
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
            <Img
              src={item.screenshot.startsWith('http') ? item.screenshot : staticFile(item.screenshot)}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: `${currentMaxHeight}px`,
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

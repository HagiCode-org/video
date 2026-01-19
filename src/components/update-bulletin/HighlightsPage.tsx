// HighlightsPage - Display 4 highlights in a 2x2 grid layout
import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import type { HighlightItem as HighlightItemType } from '../../compositions/schema';

interface HighlightsPageProps {
  items: HighlightItemType[];
  pageIndex: number;
  totalPages: number;
  delay: number;
}

// Tag color and label mapping
const getTagStyle = (tag: string) => {
  const styles: Record<string, { bg: string; text: string; border: string; label: string }> = {
    feature: {
      bg: 'rgba(59, 130, 246, 0.15)',
      text: '#60a5fa',
      border: 'rgba(59, 130, 246, 0.3)',
      label: '功能',
    },
    bugfix: {
      bg: 'rgba(239, 68, 68, 0.15)',
      text: '#f87171',
      border: 'rgba(239, 68, 68, 0.3)',
      label: '修复',
    },
    improvement: {
      bg: 'rgba(34, 197, 94, 0.15)',
      text: '#4ade80',
      border: 'rgba(34, 197, 94, 0.3)',
      label: '改进',
    },
    ai: {
      bg: 'rgba(139, 92, 246, 0.15)',
      text: '#a78bfa',
      border: 'rgba(139, 92, 246, 0.3)',
      label: 'AI',
    },
    ui: {
      bg: 'rgba(236, 72, 153, 0.15)',
      text: '#f472b6',
      border: 'rgba(236, 72, 153, 0.3)',
      label: 'UI',
    },
    performance: {
      bg: 'rgba(245, 158, 11, 0.15)',
      text: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.3)',
      label: '性能',
    },
    other: {
      bg: 'rgba(148, 163, 184, 0.15)',
      text: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.3)',
      label: '其他',
    },
  };
  return styles[tag] || styles.other;
};

export const HighlightsPage: React.FC<HighlightsPageProps> = ({ items, pageIndex, totalPages }) => {
  const frame = useCurrentFrame();

  // Animation timing
  const fadeInStart = 0;
  const fadeInEnd = 30; // 1 second
  const fadeOutStart = 420; // 14 seconds
  const fadeOutEnd = 450; // 15 seconds

  // Page opacity
  const opacity = interpolate(frame, [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  // Page indicator animation
  const pageIndicatorOpacity = interpolate(frame, [fadeInStart + 20, fadeInEnd + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0f172a',
        opacity,
      }}
    >
      {/* Main content */}
      <AbsoluteFill style={{ padding: '80px 100px' }}>
        {/* Page title */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '100px',
            right: '100px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '700',
              color: '#f8fafc',
              margin: 0,
            }}
          >
            重要更新
          </h2>

          {/* Page indicator */}
          <div
            style={{
              opacity: pageIndicatorOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === pageIndex ? '32px' : '12px',
                  height: '12px',
                  borderRadius: '6px',
                  background: i === pageIndex
                    ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                    : 'rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Grid layout for 4 items */}
        <div
          style={{
            position: 'absolute',
            top: '180px',
            left: '100px',
            right: '100px',
            bottom: '100px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '40px',
          }}
        >
          {items.map((item, index) => (
            <HighlightCard key={item.id || index} item={item} index={index} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Highlight card component
interface HighlightCardProps {
  item: HighlightItemType;
  index: number;
}

const HighlightCard: React.FC<HighlightCardProps> = ({ item, index }) => {
  const frame = useCurrentFrame();

  // Staggered animation delay
  const cardDelay = index * 10;
  const cardStart = 20 + cardDelay;
  const cardEnd = 60 + cardDelay;

  const cardOpacity = interpolate(frame, [cardStart, cardEnd], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const cardY = interpolate(frame, [cardStart, cardEnd], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(frame, [cardStart, cardEnd], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px) scale(${scale})`,
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header with tags */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <h3
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#f1f5f9',
            margin: 0,
            flex: 1,
            lineHeight: '1.3',
          }}
        >
          {item.title}
        </h3>

        {item.tags && item.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {item.tags.map((tag) => {
              const tagStyle = getTagStyle(tag);
              return (
                <span
                  key={tag}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    background: tagStyle.bg,
                    color: tagStyle.text,
                    border: `1px solid ${tagStyle.border}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tagStyle.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '16px',
          color: '#cbd5e1',
          margin: 0,
          lineHeight: '1.6',
          flex: 1,
        }}
      >
        {item.description}
      </p>

      {/* Screenshot */}
      {item.screenshot && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '180px',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            background: 'rgba(15, 23, 42, 0.8)',
          }}
        >
          <img
            src={item.screenshot}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}
    </div>
  );
};

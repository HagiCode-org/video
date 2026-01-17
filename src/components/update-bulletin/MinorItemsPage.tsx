// MinorItemsPage - Display 4 minor items per page in a paginated list
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, glass } from '../../utils/theme';
import type { MinorItem } from '../../compositions/schema';

export interface MinorItemsPageProps {
  items: MinorItem[];
  pageIndex: number;
  totalPages: number;
  delay?: number;
}

// Category icon and color mapping - using theme colors
const getCategoryInfo = (category: string) => {
  const info: Record<string, { icon: string; color: string; label: string }> = {
    feature: { icon: '✨', color: colors.tag.feature.text, label: colors.tag.feature.label },
    bugfix: { icon: '🐛', color: colors.tag.bugfix.text, label: colors.tag.bugfix.label },
    improvement: { icon: '🚀', color: colors.tag.improvement.text, label: colors.tag.improvement.label },
    ai: { icon: '🤖', color: colors.tag.ai.text, label: colors.tag.ai.label },
    ui: { icon: '🎨', color: colors.tag.ui.text, label: colors.tag.ui.label },
    performance: { icon: '⚡', color: colors.tag.performance.text, label: colors.tag.performance.label },
    other: { icon: '📝', color: colors.tag.other.text, label: colors.tag.other.label },
  };
  return info[category] || info.other;
};

// Individual list item
interface ListItemProps {
  item: MinorItem;
  delay: number;
}

const ListItem: React.FC<ListItemProps> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  const categoryInfo = getCategoryInfo(item.category);

  // All items animate together - faster animation (500ms = 15 frames)
  const itemOpacity = interpolate(effectiveFrame, [0, 12], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Slide up and fade in
  const y = interpolate(effectiveFrame, [0, 15], [40, 0], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(effectiveFrame, [0, 15], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px 28px',
        background: glass.panel.background,
        backdropFilter: glass.panel.backdropFilter,
        border: glass.panel.border,
        borderRadius: '14px',
        opacity: itemOpacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      {/* Category indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          minWidth: '140px',
        }}
      >
        <span style={{ fontSize: '24px' }}>{categoryInfo.icon}</span>
        <div
          style={{
            fontSize: typography.fontSize.bodySmall,
            color: categoryInfo.color,
            fontWeight: typography.fontWeight.medium,
            padding: '4px 10px',
            background: `${categoryInfo.color}20`,
            borderRadius: '8px',
          }}
        >
          {categoryInfo.label}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div
          style={{
            fontSize: typography.fontSize.bodyLarge,
            color: colors.text.primary,
            fontWeight: typography.fontWeight.medium,
          }}
        >
          {item.title}
        </div>
        {item.description && (
          <div
            style={{
              fontSize: typography.fontSize.body,
              color: colors.text.primary,
            }}
          >
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
};

export const MinorItemsPage: React.FC<MinorItemsPageProps> = ({
  items,
  pageIndex,
  totalPages,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Title animation (no fade out) - faster (500ms)
  const titleOpacity = interpolate(effectiveFrame, [10, 22], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(effectiveFrame, [10, 25], [20, 0], {
    extrapolateRight: 'clamp',
  });

  // Page indicator animation (no fade out) - faster (500ms)
  const pageIndicatorOpacity = interpolate(effectiveFrame, [20, 32], [0, 1], {
    extrapolateRight: 'clamp',
  });

  if (items.length === 0) {
    return (
      <AbsoluteFill
        style={{
          background: colors.background.medium,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: typography.fontSize.bodyLarge,
            color: colors.text.muted,
          }}
        >
          本版本暂无详细变更记录
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${colors.background.dark} 0%, ${colors.background.medium} 100%)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '90px 150px',
          height: '100%',
        }}
      >
        {/* Header with title and page indicator - stays visible */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1400px',
            marginBottom: '50px',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '40px' }}>📝</span>
            <span
              style={{
                fontSize: typography.fontSize.sectionTitle,
                fontWeight: typography.fontWeight.semibold,
                fontFamily: typography.fontFamily.heading,
                color: colors.text.primary,
              }}
            >
              详细变更
            </span>
          </div>

          {/* Page indicator dots - stays visible */}
          <div
            style={{
              opacity: pageIndicatorOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === pageIndex ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  background: i === pageIndex
                    ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                    : 'rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* List container - only items fade in/out */}
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            flex: 1,
          }}
        >
          {items.map((item, index) => (
            <ListItem key={index} item={item} delay={delay + 40} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

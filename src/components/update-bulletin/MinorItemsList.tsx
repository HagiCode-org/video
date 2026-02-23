// MinorItemsList component - Display list of minor updates, bug fixes, and improvements
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, glass } from '../../utils/theme';
import type { MinorItem } from '../../compositions/schema';

export interface MinorItemsListProps {
  items: MinorItem[];
  maxDisplay?: number;
  delay?: number;
}

// Category icon and color mapping
const getCategoryInfo = (category: string) => {
  const info: Record<string, { icon: string; color: string; label: string }> = {
    feature: { icon: '✨', color: colors.primary.from, label: '功能' },
    bugfix: { icon: '🐛', color: '#ef4444', label: '修复' },
    improvement: { icon: '🚀', color: colors.success.primary, label: '改进' },
    ai: { icon: '🤖', color: '#8b5cf6', label: 'AI' },
    ui: { icon: '🎨', color: '#ec4899', label: 'UI' },
    performance: { icon: '⚡', color: '#f59e0b', label: '性能' },
    other: { icon: '📝', color: colors.text.muted, label: '其他' },
  };
  return info[category] || info.other;
};

// Individual list item
interface ListItemProps {
  item: MinorItem;
  index: number;
  delay: number;
}

const ListItem: React.FC<ListItemProps> = ({ item, index, delay }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay - index * 15);

  const categoryInfo = getCategoryInfo(item.category);

  // Slide up and fade in
  const y = interpolate(effectiveFrame, [0, 25], [40, 0], {
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        padding: '24px 32px',
        background: glass.panel.background,
        backdropFilter: glass.panel.backdropFilter,
        border: glass.panel.border,
        borderRadius: '16px',
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* Category indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          minWidth: '180px',
        }}
      >
        <span style={{ fontSize: '28px' }}>{categoryInfo.icon}</span>
        <div
          style={{
            fontSize: typography.fontSize.bodySmall,
            color: categoryInfo.color,
            fontWeight: typography.fontWeight.medium,
            padding: '4px 12px',
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
          gap: '8px',
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
              color: colors.text.secondary,
            }}
          >
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
};

export const MinorItemsList: React.FC<MinorItemsListProps> = ({
  items,
  maxDisplay = 10,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // Limit items to maxDisplay
  const displayItems = items.slice(0, maxDisplay);
  const hasMore = items.length > maxDisplay;

  // Title animation
  const titleOpacity = interpolate(effectiveFrame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(effectiveFrame, [0, 30], [50, 0], {
    extrapolateRight: 'clamp',
  });

  // Container fade in
  const containerOpacity = interpolate(effectiveFrame, [15, 40], [0, 1], {
    extrapolateRight: 'clamp',
  });

  if (displayItems.length === 0) {
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 150px',
      }}
    >
      {/* Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '60px',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span style={{ fontSize: '48px' }}>📝</span>
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
        <span
          style={{
            fontSize: typography.fontSize.body,
            color: colors.text.muted,
          }}
        >
          共 {items.length} 项
        </span>
      </div>

      {/* List container */}
      <div
        style={{
          width: '100%',
          maxWidth: '1600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          opacity: containerOpacity,
        }}
      >
        {displayItems.map((item, index) => (
          <ListItem key={index} item={item} index={index} delay={delay + 30} />
        ))}

        {/* "And more" indicator */}
        {hasMore && (
          <div
            style={{
              textAlign: 'center',
              fontSize: typography.fontSize.body,
              color: colors.text.muted,
              marginTop: '20px',
              opacity: interpolate(
                effectiveFrame,
                [30 + displayItems.length * 15, 50 + displayItems.length * 15],
                [0, 1],
                { extrapolateRight: 'clamp' }
              ),
            }}
          >
            ... 以及其他 {items.length - maxDisplay} 项更新
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

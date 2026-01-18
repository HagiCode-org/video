// MinorItemsPageMobile - Mobile-optimized display for 5 minor items per page (1080x1920)
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, mobileVideoTypography, mobileVideoLayout } from '../../utils/theme';
import type { MinorItem } from '../../compositions/schema';

export interface MinorItemsPageMobileProps {
  items: MinorItem[];
  pageIndex: number;
  totalPages: number;
  delay?: number;
}

// Category color mapping - using theme colors (移除 emoji，使用纯色标识)
const getCategoryInfo = (category: string) => {
  const info: Record<string, { color: string; label: string }> = {
    feature: { color: '#FFD700', label: '功能' },
    bugfix: { color: '#FF6B6B', label: '修复' },
    improvement: { color: '#4ECDC4', label: '改进' },
    ai: { color: '#A78BFA', label: 'AI' },
    ui: { color: '#F472B6', label: '界面' },
    performance: { color: '#FB923C', label: '性能' },
    other: { color: '#94A3B8', label: '其他' },
  };
  return info[category] || info.other;
};

// Individual list item - Mobile optimized compact layout
interface ListItemMobileProps {
  item: MinorItem;
  delay: number;
}

const ListItemMobile: React.FC<ListItemMobileProps> = ({ item, delay }) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  const categoryInfo = getCategoryInfo(item.category);

  // Staggered animation for each item (faster for mobile)
  const itemOpacity = interpolate(effectiveFrame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Slide up and fade in
  const y = interpolate(effectiveFrame, [0, 12], [30, 0], {
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(effectiveFrame, [0, 12], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px', // 增加内部间距
        padding: '24px 32px', // 大幅增加内边距，充分利用垂直空间
        background: `rgba(30, 41, 59, 0.95)`,
        backdropFilter: 'blur(12px)',
        border: `2px solid ${colors.primary.to}40`,
        borderRadius: '16px', // 稍微增大圆角
        opacity: itemOpacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    >
      {/* Category indicator - 色块标识，适应更大的卡片 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '64px', // 增加宽度
          height: '42px', // 增加高度
          background: `${categoryInfo.color}35`,
          border: `2px solid ${categoryInfo.color}80`,
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            fontSize: '42px', // 增加字体大小以适应更大的卡片
            color: categoryInfo.color,
            fontWeight: 600,
            textAlign: 'center',
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
          gap: '8px', // 增加标题与描述的间距
        }}
      >
        <div
          style={{
            fontSize: mobileVideoTypography.fontSize.bodyLarge, // 使用更大的字体
            color: colors.text.primary,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </div>
        {item.description && (
          <div
            style={{
              fontSize: mobileVideoTypography.fontSize.body, // 使用更大的描述字体
              color: colors.text.secondary,
              lineHeight: 1.3,
            }}
          >
            {item.description}
          </div>
        )}
      </div>
    </div>
  );
};

export const MinorItemsPageMobile: React.FC<MinorItemsPageMobileProps> = ({
  items,
  pageIndex,
  totalPages,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = frame - delay;

  // ========== BACKGROUND GRADIENT ANIMATION ==========
  // 持续旋转的渐变背景，与 HighlightItem 保持一致
  const gradientShift = interpolate(effectiveFrame, [0, 150], [0, 360], {
    extrapolateRight: 'clamp',
  });

  const bgGradient = `linear-gradient(${gradientShift}deg, ${colors.background.dark} 0%, ${colors.background.medium} 50%, ${colors.background.dark} 100%)`;

  // Title animation (faster for mobile)
  const titleOpacity = interpolate(effectiveFrame, [5, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(effectiveFrame, [5, 18], [15, 0], {
    extrapolateRight: 'clamp',
  });

  // Page indicator animation
  const pageIndicatorOpacity = interpolate(effectiveFrame, [10, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  if (items.length === 0) {
    return (
      <AbsoluteFill
        style={{
          background: colors.background.dark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: mobileVideoTypography.fontSize.body,
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
        background: bgGradient, // 使用动态渐变背景，持续旋转
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', // 改为居中对齐
          padding: `${mobileVideoLayout.safeZone.vertical}px ${mobileVideoLayout.safeZone.horizontal}px`,
          height: '100%',
        }}
      >
        {/* Header with title and page indicator - 充分利用 1920px 高度 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '960px',
            marginBottom: '80px', // 大幅增加间距，适应 1920px 高度
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* 色块图标，替代 emoji */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${colors.primary.glow}40`,
              }}
            >
              <span
                style={{
                  fontSize: '18px',
                  color: colors.text.primary,
                  fontWeight: 700,
                }}
              >
                清单
              </span>
            </div>
            <span
              style={{
                fontSize: mobileVideoTypography.fontSize.subtitle, // 移动端字体
                fontWeight: mobileVideoTypography.fontWeight.heading,
                color: colors.text.primary,
              }}
            >
              详细变更
            </span>
          </div>

          {/* Page indicator dots - 更紧凑 */}
          <div
            style={{
              opacity: pageIndicatorOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: '6px', // 减小间距
            }}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === pageIndex ? '24px' : '8px', // 减小尺寸
                  height: '8px',
                  borderRadius: '4px',
                  background: i === pageIndex
                    ? `linear-gradient(135deg, ${colors.primary.from} 0%, ${colors.primary.to} 100%)`
                    : 'rgba(148, 163, 184, 0.3)',
                }}
              />
            ))}
          </div>
        </div>

        {/* List container - 优化间距，充分利用垂直空间 */}
        <div
          style={{
            width: '100%',
            maxWidth: '960px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px', // 大幅增加间距，适应 1920px 高度
          }}
        >
          {items.map((item, index) => (
            <ListItemMobile key={index} item={item} delay={delay + 20 + index * 3} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// MinorItemsPageMobile - 移动端优化的详细变更页面组件
// 优化：增强可读性、改善动画时序、优化色彩对比度
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
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

// Individual list item - 移动端优化的紧凑布局
interface ListItemMobileProps {
  item: MinorItem;
  delay: number;
  index: number;
  total: number;
}

const ListItemMobile: React.FC<ListItemMobileProps> = ({ item, delay, index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const effectiveFrame = Math.max(0, frame - delay);

  const categoryInfo = getCategoryInfo(item.category);

  // 使用 spring 动画实现更自然的入场效果
  const itemSpring = spring({
    frame: effectiveFrame,
    fps,
    config: { damping: 180, stiffness: 80 }, // 平滑无弹跳
  });

  const itemOpacity = interpolate(itemSpring, [0, 0.3, 1], [0, 0, 1]);
  const y = interpolate(itemSpring, [0, 1], [30, 0]);
  const scale = interpolate(itemSpring, [0, 1], [0.95, 1]);

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        padding: '28px 36px', // 增加内边距，提升可读性
        background: `rgba(30, 41, 59, 0.98)`, // 提高不透明度
        backdropFilter: 'blur(12px)',
        border: `2px solid ${categoryInfo.color}40`, // 使用类别颜色的边框
        borderRadius: '20px',
        opacity: itemOpacity,
        transform: `translateY(${y}px) scale(${scale})`,
        boxShadow: `0 4px 20px ${categoryInfo.color}20`, // 添加类别颜色的阴影
      }}
    >
      {/* Category indicator - 增强的色块标识 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '72px',
          height: '48px',
          background: `linear-gradient(135deg, ${categoryInfo.color}40 0%, ${categoryInfo.color}60 100%)`,
          border: `2px solid ${categoryInfo.color}`,
          borderRadius: '12px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '44px',
            color: categoryInfo.color,
            fontWeight: 700,
            textAlign: 'center',
            textShadow: `0 0 20px ${categoryInfo.color}80`,
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
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: mobileVideoTypography.fontSize.bodyLarge,
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
              fontSize: mobileVideoTypography.fontSize.body,
              color: colors.text.secondary,
              lineHeight: 1.4,
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
  const { fps } = useVideoConfig();
  const effectiveFrame = frame - delay;

  // ========== BACKGROUND GRADIENT ANIMATION ==========
  // 持续旋转的渐变背景，与 HighlightItem 保持一致
  const gradientShift = interpolate(effectiveFrame, [0, 150], [0, 360], {
    extrapolateRight: 'clamp',
  });

  const bgGradient = `linear-gradient(${gradientShift}deg, ${colors.background.dark} 0%, ${colors.background.medium} 50%, ${colors.background.dark} 100%)`;

  // Title animation using spring
  const titleSpring = spring({
    frame: Math.max(0, effectiveFrame),
    fps,
    config: { damping: 180, stiffness: 100 },
  });

  const titleOpacity = interpolate(titleSpring, [0, 0.3, 1], [0, 0, 1]);
  const titleY = interpolate(titleSpring, [0, 1], [20, 0]);

  // Page indicator animation
  const pageIndicatorSpring = spring({
    frame: Math.max(0, effectiveFrame - 10),
    fps,
    config: { damping: 150, stiffness: 80 },
  });

  const pageIndicatorOpacity = interpolate(pageIndicatorSpring, [0, 0.5, 1], [0, 0, 1]);

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
            gap: '28px', // 增加间距，提升可读性
          }}
        >
          {items.map((item, index) => (
            <ListItemMobile
              key={index}
              item={item}
              delay={delay + 30 + index * 15} // 更长的延迟，更好的层次
              index={index}
              total={items.length}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

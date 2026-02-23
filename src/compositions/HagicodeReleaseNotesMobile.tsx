// HagicodeReleaseNotesMobile - Mobile release notes video composition (1080x1920)
// Data-driven duration based on content
// 优化：使用 Remotion 最佳实践，增强内容传达效果
import React from 'react';
import { Sequence, Series } from 'remotion';
import type { UpdateBulletinData } from './schema';
import { UpdateBulletinDataSchema } from './schema';
import { UpdateHeader } from '../components/update-bulletin/UpdateHeader';
import { HighlightItem } from '../components/update-bulletin/HighlightItem';
import { MinorItemsPageMobile } from '../components/update-bulletin/MinorItemsPageMobile';

// Duration constants (in frames at 60fps) - 优化后的时序设计
// 基于认知负荷理论：给用户足够时间处理信息
const DURATIONS = {
  header: 180,         // 3 seconds @ 60fps - 版本头部（精简）
  highlight: 360,      // 6 seconds per highlight @ 60fps - 重点项（增加阅读时间）
  minorItemsPage: 300, // 5 seconds per minor items page @ 60fps - 次要页面
} as const;

// Items per page for minor items - 4 per page for mobile
// 移动端每页显示 4 个详细变更项
const MINOR_ITEMS_PER_PAGE = 4;

// Calculate total video duration based on content
export const calculateDuration = (data: UpdateBulletinData): number => {
  const numMinorPages = Math.ceil(data.minorItems.length / MINOR_ITEMS_PER_PAGE);
  return (
    DURATIONS.header +
    data.highlights.length * DURATIONS.highlight +
    numMinorPages * DURATIONS.minorItemsPage
  );
};

// Helper to chunk minor items into pages
const chunkMinorItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

/**
 * HagicodeReleaseNotesMobile - 优化的移动端发布说明视频组合
 *
 * 数据驱动的发布说明视频，采用移动端竖屏格式 (1080x1920 @ 60fps)：
 * - 版本头部，带动画背景和清晰的版本信息展示
 * - 重点更新项（每页一项，6秒/项），增强阅读理解时间
 * - 次要更新项（每页4项，5秒/页），紧凑展示
 *
 * 内容传达优化：
 * - 基于认知负荷理论设计的时序
 * - 清晰的视觉层次和信息分组
 * - 流畅的场景过渡和动画效果
 * - 优化文字对比度和可读性
 *
 * 关键适配（相比桌面版）：
 * - 60fps 更流畅的动画
 * - 调整后的帧数（针对 60fps）
 * - 每页 4 个次要项
 * - 使用移动端优化的 MinorItemsPageMobile 组件
 * - 移动安全区域和紧凑布局
 */
export const HagicodeReleaseNotesMobile: React.FC<UpdateBulletinData> = (data) => {
  const minorItemsPages = chunkMinorItems(data.minorItems, MINOR_ITEMS_PER_PAGE);
  const numMinorPages = minorItemsPages.length;

  // 计算时间线位置 - 优化场景过渡，消除不必要的延迟
  const timeline = {
    headerStart: 0,
    highlightsStart: DURATIONS.header,
    minorItemsStart: DURATIONS.header + data.highlights.length * DURATIONS.highlight,
  };

  return (
    <>
      {/* Header Section */}
      <Sequence from={timeline.headerStart} durationInFrames={DURATIONS.header}>
        <UpdateHeader
          version={data.version}
          releaseDate={data.releaseDate}
          delay={0}
          isMobile={true}
        />
      </Sequence>

      {/* Highlights Section - 每页一项，顺序展示，带过渡效果 */}
      {data.highlights.length > 0 && (
        <Sequence from={timeline.highlightsStart} durationInFrames={data.highlights.length * DURATIONS.highlight}>
          <Series>
            {data.highlights.map((item, index) => (
              <Series.Sequence
                key={item.id || index}
                durationInFrames={DURATIONS.highlight}
              >
                <HighlightItem
                  item={item}
                  index={index}
                  total={data.highlights.length}
                  delay={0}
                  isMobile={true}
                />
              </Series.Sequence>
            ))}
          </Series>
        </Sequence>
      )}

      {/* Minor Items Section - 分页展示，每页4项 */}
      {numMinorPages > 0 && (
        <Sequence from={timeline.minorItemsStart} durationInFrames={numMinorPages * DURATIONS.minorItemsPage}>
          <Series>
            {minorItemsPages.map((pageItems, pageIndex) => (
              <Series.Sequence
                key={`minor-page-${pageIndex}`}
                durationInFrames={DURATIONS.minorItemsPage}
              >
                <MinorItemsPageMobile
                  items={pageItems}
                  pageIndex={pageIndex}
                  totalPages={numMinorPages}
                  delay={0}
                />
              </Series.Sequence>
            ))}
          </Series>
        </Sequence>
      )}
    </>
  );
};

// Default component export for Composition
export default HagicodeReleaseNotesMobile;

// Re-export schema for use in Root.tsx
export { UpdateBulletinDataSchema };

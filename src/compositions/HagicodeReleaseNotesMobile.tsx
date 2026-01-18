// HagicodeReleaseNotesMobile - Mobile release notes video composition (1080x1920)
// Data-driven duration based on content
import React from 'react';
import { Sequence, Series } from 'remotion';
import type { UpdateBulletinData } from './schema';
import { UpdateBulletinDataSchema } from './schema';
import { UpdateHeader } from '../components/update-bulletin/UpdateHeader';
import { HighlightItem } from '../components/update-bulletin/HighlightItem';
import { MinorItemsPageMobile } from '../components/update-bulletin/MinorItemsPageMobile';

// Duration constants (in frames at 60fps) - Same as desktop for consistency
const DURATIONS = {
  header: 240,         // 4 seconds @ 60fps - Version header (doubled from desktop)
  highlight: 300,      // 5 seconds per highlight @ 60fps (one per page, doubled from desktop)
  minorItemsPage: 300, // 5 seconds per minor items page @ 60fps (doubled from desktop)
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
 * HagicodeReleaseNotesMobile - Mobile-optimized release notes composition
 *
 * Data-driven release notes video for mobile vertical format (1080x1920 @ 60fps):
 * - Version header with animated background
 * - Highlight items (one per page, 5 seconds each)
 * - Minor items (4 per page for mobile, 5 seconds each)
 *
 * Key adaptations from desktop version:
 * - 60fps instead of 30fps for smoother animations
 * - Adjusted frame counts (doubled for 60fps)
 * - 4 items per page for minor items
 * - Uses mobile-optimized MinorItemsPageMobile component
 * - Mobile-safe zones and compact layout
 */
export const HagicodeReleaseNotesMobile: React.FC<UpdateBulletinData> = (data) => {
  const minorItemsPages = chunkMinorItems(data.minorItems, MINOR_ITEMS_PER_PAGE);
  const numMinorPages = minorItemsPages.length;

  // Calculate timeline positions
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
        />
      </Sequence>

      {/* Highlights Section - one per page, sequential */}
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
                />
              </Series.Sequence>
            ))}
          </Series>
        </Sequence>
      )}

      {/* Minor Items Section - paginated, 5 items per page for mobile */}
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

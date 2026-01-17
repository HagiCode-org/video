// HagicodeUpdateBulletin - Main composition for update bulletin video
import React from 'react';
import { Sequence, Series } from 'remotion';
import type { UpdateBulletinData } from './schema';
import { UpdateBulletinDataSchema } from './schema';
import { UpdateHeader } from '../components/update-bulletin/UpdateHeader';
import { HighlightItem } from '../components/update-bulletin/HighlightItem';
import { MinorItemsPage } from '../components/update-bulletin/MinorItemsPage';

// Duration constants (in frames at 30fps)
const DURATIONS = {
  header: 120,         // 4 seconds - Version header
  highlight: 150,      // 5 seconds per highlight (one per page)
  minorItemsPage: 150, // 5 seconds per minor items page (4 items each)
} as const;

// Items per page for minor items
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

export const HagicodeUpdateBulletin: React.FC<UpdateBulletinData> = (data) => {
  const totalDuration = calculateDuration(data);
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

      {/* Minor Items Section - paginated, 4 items per page */}
      {numMinorPages > 0 && (
        <Sequence from={timeline.minorItemsStart} durationInFrames={numMinorPages * DURATIONS.minorItemsPage}>
          <Series>
            {minorItemsPages.map((pageItems, pageIndex) => (
              <Series.Sequence
                key={`minor-page-${pageIndex}`}
                durationInFrames={DURATIONS.minorItemsPage}
              >
                <MinorItemsPage
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
export default HagicodeUpdateBulletin;

// Re-export schema for use in Root.tsx
export { UpdateBulletinDataSchema };

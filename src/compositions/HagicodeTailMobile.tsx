// HagicodeTailMobile - Standalone tail composition for mobile (1080x1920)
// Duration: 300 frames (5 seconds @ 60fps)
import React from 'react';
import { OutroSummarySceneMobile } from '../scenes/intro-mobile/OutroSummarySceneMobile';

/**
 * HagicodeTailMobile - Mobile-optimized standalone tail composition
 *
 * A reusable 5-second tail video for mobile vertical format (1080x1920):
 * - HagiCode branding and tagline
 * - Three key feature highlights (stacked single-column)
 * - GitHub CTA and QQ group information
 *
 * Use this composition to add a consistent tail to any Hagicode video
 * intended for mobile platforms (Douyin, Bilibili mobile, Xiaohongshu, etc.)
 */
export const HagicodeTailMobile: React.FC = () => {
  return <OutroSummarySceneMobile delay={0} />;
};

export default HagicodeTailMobile;

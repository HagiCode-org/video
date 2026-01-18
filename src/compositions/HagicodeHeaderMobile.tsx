// HagicodeHeaderMobile - Mobile header video composition for Hagicode
// Total duration: 720 frames (12 seconds @ 60fps)
// Mobile-optimized for 1080x1920 vertical canvas
import React from 'react';
import { Series } from 'remotion';
import { BrandIntroSceneMobile } from '../scenes/intro-mobile/BrandIntroSceneMobile';
import { SmartControllableSceneMobile } from '../scenes/intro-mobile/SmartControllableSceneMobile';
import { MultiThreadEfficientSceneMobile } from '../scenes/intro-mobile/MultiThreadEfficientSceneMobile';
import { FunExperienceSceneMobile } from '../scenes/intro-mobile/FunExperienceSceneMobile';
import { OutroSummarySceneMobile } from '../scenes/intro-mobile/OutroSummarySceneMobile';

// Duration constants (in frames at 60fps) - All highlight scenes same duration
const DURATIONS = {
  scene1: 60,   // 1 second - Brand display
  scene2: 180,  // 3 seconds - Problem cards flip
  scene3: 180,  // 3 seconds - Multi-thread efficiency
  scene4: 180,  // 3 seconds - Fun experience features
  scene5: 120,  // 2 seconds - Outro summary
} as const;

// Total duration
export const DURATION_IN_FRAMES = Object.values(DURATIONS).reduce((a, b) => a + b, 0); // 720 frames = 12 seconds

/**
 * HagicodeHeaderMobile - Mobile-optimized header video composition
 *
 * A 12-second header video showcasing Hagicode's core value proposition, optimized for 1080x1920 vertical format:
 * - Scene 1: Brand introduction (1s) - Full-screen logo
 * - Scene 2: Hagicode guides AI better (3s) - Problem cards flip
 * - Scene 3: Multi-agent efficiency (3s) - Bar chart comparison
 * - Scene 4: Fun experience features (3s) - Feature cards display
 * - Scene 5: Summary with key features (2s) - Feature highlights
 *
 * Key adaptations from desktop version:
 * - Uses all mobile scene components (*Mobile.tsx)
 * - Same duration structure for consistency
 * - Mobile-optimized layouts (single-column, larger fonts)
 * - Vertical safe zones (60px/80px)
 */
export const HagicodeHeaderMobile: React.FC = () => {
  return (
    <Series>
      {/* Scene 1: Brand Introduction */}
      <Series.Sequence durationInFrames={DURATIONS.scene1}>
        <BrandIntroSceneMobile delay={0} />
      </Series.Sequence>

      {/* Scene 2: Smart & Controllable - Problem Smash */}
      <Series.Sequence durationInFrames={DURATIONS.scene2}>
        <SmartControllableSceneMobile delay={0} />
      </Series.Sequence>

      {/* Scene 3: Multi-thread Efficiency */}
      <Series.Sequence durationInFrames={DURATIONS.scene3}>
        <MultiThreadEfficientSceneMobile delay={0} />
      </Series.Sequence>

      {/* Scene 4: Fun Experience */}
      <Series.Sequence durationInFrames={DURATIONS.scene4}>
        <FunExperienceSceneMobile delay={0} />
      </Series.Sequence>

      {/* Scene 5: Outro Summary */}
      <Series.Sequence durationInFrames={DURATIONS.scene5}>
        <OutroSummarySceneMobile delay={0} />
      </Series.Sequence>
    </Series>
  );
};

export default HagicodeHeaderMobile;

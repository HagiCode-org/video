// HagicodeUniversalIntro - Universal intro video composition for Hagicode
// Total duration: 600 frames (10 seconds @ 60fps)
import React from 'react';
import { Series } from 'remotion';
import { BrandIntroScene } from '../scenes/intro/BrandIntroScene';
import { SmartControllableScene } from '../scenes/intro/SmartControllableScene';
import { MultiThreadEfficientScene } from '../scenes/intro/MultiThreadEfficientScene';
import { FunExperienceScene } from '../scenes/intro/FunExperienceScene';
import { OutroSummaryScene } from '../scenes/intro/OutroSummaryScene';

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
 * HagicodeUniversalIntro - Universal intro video composition
 *
 * A 12-second intro video showcasing Hagicode's core value proposition:
 * - Scene 1: Brand introduction (1s) - Full-screen logo
 * - Scene 2: Hagicode guides AI better (3s) - Problem cards flip
 * - Scene 3: Multi-agent efficiency (3s) - Bar chart comparison
 * - Scene 4: Fun experience features (3s) - Feature cards display
 * - Scene 5: Summary with key features (2s) - Feature highlights
 */
export const HagicodeUniversalIntro: React.FC = () => {
  return (
    <Series>
      {/* Scene 1: Brand Introduction */}
      <Series.Sequence durationInFrames={DURATIONS.scene1}>
        <BrandIntroScene delay={0} />
      </Series.Sequence>

      {/* Scene 2: Smart & Controllable - Problem Smash */}
      <Series.Sequence durationInFrames={DURATIONS.scene2}>
        <SmartControllableScene delay={0} />
      </Series.Sequence>

      {/* Scene 3: Multi-thread Efficiency */}
      <Series.Sequence durationInFrames={DURATIONS.scene3}>
        <MultiThreadEfficientScene delay={0} />
      </Series.Sequence>

      {/* Scene 4: Fun Experience */}
      <Series.Sequence durationInFrames={DURATIONS.scene4}>
        <FunExperienceScene delay={0} />
      </Series.Sequence>

      {/* Scene 5: Outro Summary */}
      <Series.Sequence durationInFrames={DURATIONS.scene5}>
        <OutroSummaryScene delay={0} />
      </Series.Sequence>
    </Series>
  );
};

export default HagicodeUniversalIntro;

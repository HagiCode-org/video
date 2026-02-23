// HagicodeIntroVideo - 35秒短视频，突出"智能·便捷·有趣"
// 快节奏，适合抖音、B站、小红书等短视频平台
import React from 'react';
import { AbsoluteFill, Series } from 'remotion';
import { HookScene } from './scenes/HookScene';
import { IntroScene } from './scenes/IntroScene';
import { SmartScene } from './scenes/SmartScene';
import { ConvenientScene } from './scenes/ConvenientScene';
import { FunSceneNew } from './scenes/FunSceneNew';
import { CTAScene } from './scenes/CTAScene';

// 40秒短视频结构 (1200帧 @ 30fps)
// 每个特性展示后有2秒自然停顿（继续播放最后一帧）
const SCENE_DURATIONS = {
  hook: 150,          // 0-5s: 痛点累积切入
  intro: 210,         // 5-12s: 品牌展示 + 截图涌现（5秒展示 + 2秒停顿）
  smart: 150,         // 12-17s: 智能特性展示（4秒展示）
  convenient: 150,    // 17-22s: 便捷特性展示（4秒展示）
  fun: 150,           // 22-27s: 有趣特性展示（4秒展示）
  cta: 330,           // 27-40s: CTA行动号召 + 网址展示 + 截图叠加
};

export const HagicodeIntroVideo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Series>
        {/* Scene 1: 痛点累积展示 (0-5s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.hook}>
          <HookScene />
        </Series.Sequence>

        {/* Scene 2: 品牌登场 + 截图涌现 (5-12s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <IntroScene />
        </Series.Sequence>

        {/* Scene 3: 智能特性展示 (12-17s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.smart}>
          <SmartScene />
        </Series.Sequence>

        {/* Scene 4: 便捷特性展示 (17-22s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.convenient}>
          <ConvenientScene />
        </Series.Sequence>

        {/* Scene 5: 有趣特性展示 (22-27s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.fun}>
          <FunSceneNew />
        </Series.Sequence>

        {/* Scene 6: CTA行动号召 + 网址展示 + 截图叠加 (27-40s) */}
        <Series.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTAScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

// Schema for props (if needed in future)
import { z } from 'zod';

export const hagicodeIntroSchema = z.object({
  // Add any configurable props here
});

export type HagicodeIntroProps = z.infer<typeof hagicodeIntroSchema>;

import "./index.css";
import "./assets/fonts/fonts.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { HagicodeIntroVideo } from "./HagicodeIntroVideo";
import { HookScene } from "./scenes/HookScene";
import { IntroScene } from "./scenes/IntroScene";
import { FeaturesAccumulationScene } from "./scenes/FeaturesAccumulationScene";
import { SmartScene } from "./scenes/SmartScene";
import { ConvenientScene } from "./scenes/ConvenientScene";
import { FunSceneNew } from "./scenes/FunSceneNew";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { SmartSDDScene } from "./scenes/SmartSDDScene";
import { EfficientScene } from "./scenes/EfficientScene";
import { FunScene } from "./scenes/FunScene";
import { CTAScene } from "./scenes/CTAScene";
import HagicodeUpdateBulletin, { calculateDuration, UpdateBulletinDataSchema } from "./compositions/HagicodeUpdateBulletin";
import { defaultData } from "./compositions/example-data";
import HagicodeUniversalIntro, { DURATION_IN_FRAMES as HAGICODE_UNIVERSAL_INTRO_DURATION } from "./compositions/HagicodeUniversalIntro";
import { OutroSummaryScene } from "./scenes/intro/OutroSummaryScene";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Hagicode 35秒短视频 */}
      <Composition
        id="HagicodeIntro"
        component={HagicodeIntroVideo}
        durationInFrames={1050} // 35 seconds @ 30fps - 短视频优化
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Individual scene compositions for development/testing */}
      <Composition
        id="HookScene"
        component={HookScene}
        durationInFrames={150} // 5 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="IntroScene"
        component={IntroScene}
        durationInFrames={90} // 3 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="FeaturesAccumulationScene"
        component={FeaturesAccumulationScene}
        durationInFrames={360} // 12 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="SmartScene"
        component={SmartScene}
        durationInFrames={180} // 6 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="ConvenientScene"
        component={ConvenientScene}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="FunSceneNew"
        component={FunSceneNew}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="FeaturesScene"
        component={FeaturesScene}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="SmartSDDScene"
        component={SmartSDDScene}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="EfficientScene"
        component={EfficientScene}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="FunScene"
        component={FunScene}
        durationInFrames={210} // 7 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      <Composition
        id="CTAScene"
        component={CTAScene}
        durationInFrames={120} // 4 seconds
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Original Hello World examples - kept for reference */}
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />

      {/* Hagicode Update Bulletin - Data-driven update video template */}
      <Composition
        id="HagicodeUpdateBulletin"
        component={HagicodeUpdateBulletin}
        durationInFrames={calculateDuration(defaultData)}
        fps={30}
        width={1920}
        height={1080}
        schema={UpdateBulletinDataSchema}
        defaultProps={defaultData}
      />

      {/* Hagicode Universal Intro - Standardized intro video template */}
      <Composition
        id="HagicodeUniversalIntro"
        component={HagicodeUniversalIntro}
        durationInFrames={HAGICODE_UNIVERSAL_INTRO_DURATION}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />

      {/* Hagicode Outro Summary - Reusable outro for other videos */}
      <Composition
        id="HagicodeOutroSummary"
        component={OutroSummaryScene}
        durationInFrames={120} // 2 seconds @ 60fps
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

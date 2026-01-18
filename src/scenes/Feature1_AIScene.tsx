// Feature1_AIScene - AI Assistant feature showcase (20-30s, 300 frames)
// Enhanced with glassmorphism cards, real screenshots, and animated icons
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Cpu, Sparkles, Code, MessageSquare, CheckCircle } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';
import { ScreenshotShowcase } from '../components/ScreenshotShowcase';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FEATURES: Feature[] = [
  {
    icon: <Code size={32} />,
    title: '智能代码生成',
    description: 'AI 驱动的代码补全与生成',
    color: colors.aurora.purple,
  },
  {
    icon: <MessageSquare size={32} />,
    title: '实时上下文补全',
    description: '理解项目上下文的智能建议',
    color: colors.aurora.blue,
  },
  {
    icon: <CheckCircle size={32} />,
    title: '智能代码审查',
    description: '自动检测潜在问题与优化',
    color: colors.aurora.cyan,
  },
];

export const Feature1_AIScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-60f (0-2s): Title and icon slide in
  // 60-150f (2-5s): Feature cards appear in sequence
  // 150-300f (5-10s): Screenshot showcase and hold

  // Title animations
  const titleProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });
  const titleY = interpolate(titleProgress, [0, 1], [-40, 0]);
  const titleOpacity = titleProgress;

  // CPU icon pulse
  const iconScale = interpolate(
    frame,
    [0, 60, 120],
    [0, 1.2, 1],
    { extrapolateRight: 'clamp', easing: Easing.bezier(...easing.bounce) }
  );

  const iconRotation = interpolate(frame, [0, 60], [180, 0], {
    extrapolateRight: 'clamp',
  });

  // Sparkles rotation
  const sparkleRotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: 'clamp',
  });

  // Feature cards stagger animation
  const getCardAnimation = (index: number) => {
    const startFrame = 60 + index * 30;
    const progress = interpolate(frame, [startFrame, startFrame + 35], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.enter),
    });

    return {
      x: interpolate(progress, [0, 1], [-60, 0]),
      opacity: progress,
      scale: interpolate(progress, [0, 1], [0.9, 1]),
    };
  };

  // Screenshot showcase
  const screenshotOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 100px',
      }}
    >
      {/* Ambient glow background */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${colors.primary.glow}20 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, ${colors.secondary.glow}15 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Left side - Title and features */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          maxWidth: '600px',
          zIndex: 10,
        }}
      >
        {/* Title section */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              color: colors.primary.from,
              transform: `scale(${iconScale}) rotate(${iconRotation}deg)`,
              filter: `drop-shadow(0 0 20px ${colors.primary.glow})`,
            }}
          >
            <Cpu size={72} />
          </div>
          <h2
            style={{
              fontSize: '56px',
              fontWeight: 700,
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
            }}
          >
            AI 辅助开发
          </h2>
          <div
            style={{
              color: colors.accent.primary,
              transform: `rotate(${sparkleRotation}deg)`,
              filter: `drop-shadow(0 0 15px ${colors.accent.glow})`,
            }}
          >
            <Sparkles size={56} />
          </div>
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {FEATURES.map((feature, index) => {
            const anim = getCardAnimation(index);
            return (
              <GlassCard
                key={feature.title}
                variant="panel"
                accent={index === 0}
                style={{
                  opacity: anim.opacity,
                  transform: `translateX(${anim.x}px) scale(${anim.scale})`,
                  padding: '24px 32px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                  }}
                >
                  <div
                    style={{
                      color: feature.color,
                      filter: `drop-shadow(0 0 10px ${feature.color}40)`,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '28px',
                        fontWeight: 600,
                        color: colors.text.primary,
                        marginBottom: '4px',
                      }}
                    >
                      {feature.title}
                    </div>
                    <div
                      style={{
                        fontSize: '18px',
                        color: colors.text.secondary,
                      }}
                    >
                      {feature.description}
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Right side - Screenshot showcase */}
      <div
        style={{
          position: 'absolute',
          right: '80px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: screenshotOpacity,
        }}
      >
        <ScreenshotShowcase
          imageSrc="/home/newbe36524/repos/newbe36524/pcode-docs/static/img/create-normal-session/03-ai-response.png"
          caption="AI 智能响应"
          delay={150}
          accent={true}
        />
      </div>
    </AbsoluteFill>
  );
};

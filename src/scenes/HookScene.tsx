// HookScene - 痛点场景 (0-5秒，150帧) - 累积展示
// 核心：AI返工、Token浪费、代码枯燥逐个累积出现
// 首屏立即显示所有内容，然后逐个高亮
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { RefreshCw, Clock, Frown, HelpCircle } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { AnimatedParticleBackground } from '../components/AnimatedParticleBackground';
import { GlassCard } from '../components/GlassCard';

interface PainPoint {
  text: string;
  subtext: string;
  icon: React.ReactNode;
  color: string;
  position: { x: number; y: number };
}

// 3个核心痛点 - 不同位置累积显示
const PAIN_POINTS: PainPoint[] = [
  {
    text: 'AI 生成总返工',
    subtext: '不理解项目，改来改去',
    icon: <RefreshCw size={56} />,
    color: colors.aurora.pink,
    position: { x: -400, y: -100 },
  },
  {
    text: 'Token 浪费严重',
    subtext: '等待时只能干看着',
    icon: <Clock size={56} />,
    color: colors.aurora.purple,
    position: { x: 400, y: -100 },
  },
  {
    text: '代码工作太枯燥',
    subtext: '日复一日没有成就感',
    icon: <Frown size={56} />,
    color: colors.aurora.blue,
    position: { x: 0, y: 150 },
  },
];

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-150f (0-5s): 所有内容立即显示，逐个高亮痛点

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleScale = interpolate(frame, [0, 20], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 高亮时间点
  const highlightTimings = [
    { start: 20, end: 60 },   // 第1个痛点高亮
    { start: 60, end: 100 },  // 第2个痛点高亮
    { start: 100, end: 140 }, // 第3个痛点高亮
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background.dark,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 粒子背景 */}
      <AnimatedParticleBackground particleCount={20} />

      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: titleOpacity,
          zIndex: 10,
        }}
      >
        <GlassCard
          glow={true}
          style={{
            transform: `scale(${titleScale})`,
            padding: '24px 40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <HelpCircle size={48} color={colors.primary.to} />
            <div
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: colors.text.primary,
                textAlign: 'center',
                lineHeight: 1.3,
              }}
            >
              为什么使用 AI 辅助编码
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 600,
                color: colors.primary.to,
                textAlign: 'center',
              }}
            >
              仍然存在问题？
            </div>
          </div>
        </GlassCard>
      </div>

      {/* 痛点卡片 - 立即显示所有，逐个高亮 */}
      <>
        {PAIN_POINTS.map((point, index) => {
          const highlight = highlightTimings[index];
          const isHighlighted = frame >= highlight.start && frame < highlight.end;

          // 高亮动画
          const highlightScale = interpolate(
            frame,
            [highlight.start, highlight.start + 15],
            [1, 1.15],
            { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
          );

          const highlightScaleOut = interpolate(
            frame,
            [highlight.end - 10, highlight.end],
            [1.15, 1],
            { extrapolateLeft: 'clamp', easing: Easing.in(Easing.cubic) }
          );

          const currentScale = isHighlighted
            ? (frame < highlight.end - 10 ? highlightScale : highlightScaleOut)
            : 1;

          const glowOpacity = interpolate(
            frame,
            [highlight.start, highlight.start + 10],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          const glowFadeOut = interpolate(
            frame,
            [highlight.end - 15, highlight.end],
            [1, 0],
            { extrapolateLeft: 'clamp' }
          );

          const currentGlow = isHighlighted ? Math.min(glowOpacity, glowFadeOut) : 0;

          return (
            <React.Fragment key={index}>
              {/* 背景光晕 - 高亮时增强 */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: '600px',
                  height: '400px',
                  transform: `translate(calc(-50% + ${point.position.x}px), calc(-50% + ${point.position.y}px)) scale(${currentScale})`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${point.color}${20 + currentGlow * 30} 0%, transparent 70%)`,
                  filter: 'blur(80px)',
                  opacity: 0.5 + currentGlow * 0.5,
                  transition: 'all 0.3s ease',
                }}
              />

              {/* 痛点卡片 */}
              <GlassCard
                glow={isHighlighted}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${point.position.x}px), calc(-50% + ${point.position.y}px)) scale(${currentScale})`,
                  padding: '32px 44px',
                  minWidth: '320px',
                  background: isHighlighted ? `${point.color}25` : `${point.color}15`,
                  border: isHighlighted ? `3px solid ${point.color}` : `2px solid ${point.color}50`,
                  boxShadow: isHighlighted
                    ? `0 0 ${40 + currentGlow * 30}px ${point.color}${40 + currentGlow * 40}`
                    : undefined,
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  {/* 图标 */}
                  <div
                    style={{
                      color: point.color,
                      filter: `drop-shadow(0 0 ${isHighlighted ? 30 : 20}px ${point.color})`,
                      transform: `scale(${isHighlighted ? 1.1 : 1})`,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {point.icon}
                  </div>

                  {/* 主标题 */}
                  <div
                    style={{
                      fontSize: '36px',
                      fontWeight: 700,
                      color: isHighlighted ? point.color : colors.text.primary,
                      textAlign: 'center',
                      lineHeight: 1.2,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {point.text}
                  </div>

                  {/* 副标题 */}
                  <div
                    style={{
                      fontSize: '18px',
                      color: isHighlighted ? colors.text.primary : colors.text.secondary,
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {point.subtext}
                  </div>
                </div>
              </GlassCard>
            </React.Fragment>
          );
        })}
      </>
    </AbsoluteFill>
  );
};

// SmartSDDScene - SDD规范化流程 (8-15秒，210帧)
// 核心：SDD规范让AI精准理解项目，减少返工，效率提升3倍
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, Sequence } from 'remotion';
import { FileCode, CheckCircle2, TrendingUp, Zap, ChevronRight, Sparkles } from 'lucide-react';
import { colors, easing, duration } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';
import { DataMetric } from '../components/DataMetric';
import { ScreenshotCarousel } from '../components/ScreenshotCarousel';

// SDD流程步骤
const SDD_STEPS = [
  { title: '1. 创建SDD提案', icon: FileCode, desc: '定义开发需求' },
  { title: '2. AI执行任务', icon: Sparkles, desc: '精准生成代码' },
  { title: '3. 验收合并', icon: CheckCircle2, desc: '减少返工' },
];

// SDD相关截图
const SCREENSHOTS = [
  'create-proposal-1.png',
  'proposal-review.png',
  'execution-result.png',
];

export const SmartSDDScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-50f (0-1.67s): 标题弹出
  // 50-140f (1.67-4.67s): SDD流程动画展示
  // 140-210f (4.67-7s): 效率提升数据展示

  // 标题动画
  const titleProgress = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 流程步骤动画
  const getStepAnimation = (index: number) => {
    const startFrame = 50 + index * 25;
    const progress = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.enter),
    });

    return {
      opacity: progress,
      x: interpolate(progress, [0, 1], [-60, 0]),
      scale: interpolate(progress, [0, 1], [0.85, 1]),
    };
  };

  // 连接线动画
  const lineProgress = interpolate(frame, [50, 125], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 效率提升动画
  const metricOpacity = interpolate(frame, [140, 170], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const metricScale = interpolate(frame, [140, 180], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  // 强调效果
  const emphasisScale = interpolate(frame, [175, 195, 210], [1, 1.15, 1.08], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  const emphasisGlow = interpolate(frame, [175, 210], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 流程卡片浮动动画
  const floatY = Math.sin(frame * 0.05) * 8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.background.dark,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      {/* 背景光晕 */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '600px',
          background: `radial-gradient(ellipse, ${colors.primary.glow}15 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* SDD流程截图展示 */}
      <div
        style={{
          position: 'absolute',
          right: '80px',
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: 0.15,
        }}
      >
        <ScreenshotCarousel
          screenshots={SCREENSHOTS}
          interval={60}
          scale={0.6}
          opacity={1}
          borderRadius="16px"
        />
      </div>

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleProgress})`,
          textAlign: 'center',
          marginBottom: '70px',
        }}
      >
        <div
          style={{
            fontSize: '52px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, Inter, sans-serif',
            background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}
        >
          智能 SDD 规范化流程
        </div>
        <div
          style={{
            fontSize: '26px',
            color: colors.text.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Zap size={20} color={colors.accent.primary} />
          让 AI 精准理解项目，大幅减少返工
        </div>
      </div>

      {/* SDD流程步骤 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '60px',
          transform: `translateY(${floatY}px)`,
        }}
      >
        {SDD_STEPS.map((step, index) => {
          const Icon = step.icon;
          const anim = getStepAnimation(index);

          return (
            <React.Fragment key={step.title}>
              {/* 步骤卡片 */}
              <GlassCard
                variant="panel"
                style={{
                  opacity: anim.opacity,
                  transform: `translateX(${anim.x}px) scale(${anim.scale})`,
                  padding: '28px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  minWidth: '200px',
                  position: 'relative',
                }}
              >
                {/* 步骤序号 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '-12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: 'white',
                    boxShadow: `0 0 20px ${colors.primary.glow}`,
                  }}
                >
                  {index + 1}
                </div>

                <div
                  style={{
                    color: colors.primary.to,
                    filter: `drop-shadow(0 0 12px ${colors.primary.glow})`,
                    marginTop: '8px',
                  }}
                >
                  <Icon size={36} />
                </div>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: colors.text.primary,
                    textAlign: 'center',
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: '16px',
                    color: colors.text.secondary,
                  }}
                >
                  {step.desc}
                </div>
              </GlassCard>

              {/* 连接箭头 */}
              {index < SDD_STEPS.length - 1 && (
                <div
                  style={{
                    opacity: lineProgress,
                    display: 'flex',
                    alignItems: 'center',
                    color: colors.primary.to,
                  }}
                >
                  <ChevronRight size={32} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 效率提升数据 */}
      <div
        style={{
          opacity: metricOpacity,
          transform: `scale(${emphasisScale})`,
          position: 'relative',
        }}
      >
        {/* 强调光晕 */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            background: `radial-gradient(circle, ${colors.success.glow}40 0%, transparent 70%)`,
            filter: `blur(30px)`,
            opacity: emphasisGlow,
            zIndex: -1,
          }}
        />

        <GlassCard
          variant="card"
          accent={true}
          glow={true}
          style={{
            padding: '32px 80px',
            textAlign: 'center',
            background: `radial-gradient(circle at center, ${colors.primary.glow}20, transparent 60%)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            <TrendingUp
              size={56}
              color={colors.success.primary}
              style={{ filter: `drop-shadow(0 0 24px ${colors.success.glow})` }}
            />
            <div>
              <div
                style={{
                  fontSize: '28px',
                  color: colors.text.secondary,
                  marginBottom: '4px',
                  fontWeight: 500,
                }}
              >
                效率提升高达
              </div>
              {/* 直接显示，不使用 DataMetric 组件避免 % 后缀问题 */}
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, Inter, sans-serif',
                  background: `linear-gradient(135deg, ${colors.success.primary}, ${colors.accent.primary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                3倍
              </div>
            </div>
            <CheckCircle2
              size={48}
              color={colors.success.primary}
              style={{ filter: `drop-shadow(0 0 20px ${colors.success.glow})` }}
            />
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

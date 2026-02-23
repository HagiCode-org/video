// Feature2_OpenSpecScene - OpenSpec workflow showcase (30-40s, 300 frames)
// Enhanced with animated flow visualization and glassmorphism
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { FileText, GitBranch, CheckCircle, Eye, ChevronRight } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

const WORKFLOW_STEPS = [
  { icon: FileText, label: '提案', description: '创建变更提案', color: colors.aurora.purple },
  { icon: Eye, label: '评审', description: '团队评审讨论', color: colors.aurora.blue },
  { icon: GitBranch, label: '开发', description: '结构化执行', color: colors.aurora.cyan },
  { icon: CheckCircle, label: '验证', description: '追溯与确认', color: colors.success.primary },
];

export const Feature2_OpenSpecScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-60f (0-2s): Title slide in
  // 60-180f (2-6s): Workflow steps appear with animated connections
  // 180-300f (6-10s): Hold with pulse effect

  // Title animation
  const titleProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = titleProgress;

  // Workflow steps stagger animation
  const getStepAnimation = (index: number) => {
    const startFrame = 60 + index * 30;
    const progress = interpolate(frame, [startFrame, startFrame + 35], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.bounce),
    });

    return {
      opacity: progress,
      scale: interpolate(progress, [0, 1], [0.8, 1]),
      y: interpolate(progress, [0, 1], [30, 0]),
    };
  };

  // Connection line animation
  const lineProgress = interpolate(frame, [90, 180], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Pulse effect for active steps
  const getPulseScale = (index: number) => {
    const pulseFrame = (frame - 60 - index * 30) % 120;
    return interpolate(
      pulseFrame,
      [0, 30, 60],
      [1, 1.05, 1],
      { extrapolateRight: 'clamp', easing: Easing.sin }
    );
  };

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [180, 210], [0, 1], {
    extrapolateRight: 'clamp',
  });

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
      {/* Animated background gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 30% 40%, ${colors.aurora.purple}15 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, ${colors.aurora.blue}10 0%, transparent 50%)
          `,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize: '56px',
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.secondary.to})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '100px',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        OpenSpec 工作流
      </div>

      {/* Workflow steps with connections */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
        }}
      >
        {WORKFLOW_STEPS.map((step, index) => {
          const Icon = step.icon;
          const anim = getStepAnimation(index);
          const pulseScale = frame > 60 + index * 30 ? getPulseScale(index) : 1;

          return (
            <React.Fragment key={index}>
              {/* Step card */}
              <div
                style={{
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px) scale(${anim.scale * pulseScale})`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <GlassCard
                  variant="card"
                  accent={index === 0}
                  glow={true}
                  style={{
                    padding: '32px',
                    width: '180px',
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, ${step.color}30, ${step.color}15)`,
                      border: `2px solid ${step.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                      filter: `drop-shadow(0 0 15px ${step.color}40)`,
                    }}
                  >
                    <Icon size={40} color={step.color} />
                  </div>

                  {/* Label */}
                  <div
                    style={{
                      fontSize: '28px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      textAlign: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    {step.label}
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      fontSize: '16px',
                      color: colors.text.secondary,
                      textAlign: 'center',
                    }}
                  >
                    {step.description}
                  </div>
                </GlassCard>
              </div>

              {/* Animated arrow */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    opacity: lineProgress,
                    transform: `translateX(${interpolate(lineProgress, [0, 1], [-20, 0])}px)`,
                  }}
                >
                  <ChevronRight
                    size={40}
                    color={colors.text.secondary}
                    style={{
                      filter: `drop-shadow(0 0 10px ${colors.primary.glow})`,
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Animated connection line */}
      <svg
        style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          right: '10%',
          height: '4px',
          transform: 'translateY(-50%)',
          zIndex: -1,
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.aurora.purple} stopOpacity="0.3" />
            <stop offset="50%" stopColor={colors.aurora.blue} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.aurora.cyan} stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="50%"
          x2={`${interpolate(lineProgress, [0, 1], [0, 100])}%`}
          y2="50%"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          fontSize: '28px',
          fontWeight: 500,
          color: colors.text.secondary,
          opacity: subtitleOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span style={{ color: colors.primary.to }}>●</span>
        结构化开发 · 全流程追溯
        <span style={{ color: colors.secondary.to }}>●</span>
      </div>
    </AbsoluteFill>
  );
};

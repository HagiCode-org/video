// SmartScene - 智能特性场景 (8-12秒，120帧)
// 展示 OpenSpec 工作流和 300% 效率提升
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Lightbulb, TrendingUp, CheckCircle2, Circle } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

// OpenSpec 9阶段工作流
const WORKFLOW_STAGES = [
  { id: 1, name: 'Idea', label: '想法', icon: '💡' },
  { id: 2, name: 'Proposal', label: '提案', icon: '📄' },
  { id: 3, name: 'Review', label: '评审', icon: '🔍' },
  { id: 4, name: 'Tasks', label: '任务', icon: '⚙️' },
  { id: 5, name: 'Code', label: '编码', icon: '💻' },
  { id: 6, name: 'Test', label: '测试', icon: '🧪' },
  { id: 7, name: 'Refactor', label: '重构', icon: '🔧' },
  { id: 8, name: 'Docs', label: '文档', icon: '📚' },
  { id: 9, name: 'Archive', label: '归档', icon: '✅' },
];

const THEME = {
  primary: '#FF6B6B',
  secondary: '#6C5CE7',
  accent: '#FFEAA7',
  gradient: 'linear-gradient(135deg, #FF6B6B, #6C5CE7)',
};

export const SmartScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-40f: 标题和副标题进入
  // 40-100f: 工作流展示
  // 100-120f: 效率数据展示

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 35], [-40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  // 徽章动画
  const badgeScale = interpolate(frame, [10, 40], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  // 工作流节点动画 - 循环高亮
  const cycleDuration = 12; // 每个阶段高亮约0.4秒
  const activeStage = Math.floor((frame - 40) / cycleDuration) % WORKFLOW_STAGES.length;
  const workflowOpacity = interpolate(frame, [35, 55], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 获取每个节点的动画状态
  const getStageAnimation = (index: number) => {
    const baseDelay = 40 + index * 8;
    const opacity = interpolate(frame, [baseDelay, baseDelay + 20], [0, 1], {
      extrapolateRight: 'clamp',
    });

    const y = interpolate(frame, [baseDelay, baseDelay + 25], [30, 0], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });

    const scale = interpolate(frame, [baseDelay, baseDelay + 20], [0.8, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });

    // 高亮效果
    const isActive = index === activeStage && frame >= 40 && frame < 100;
    const highlightScale = isActive
      ? interpolate((frame - 40 - index * cycleDuration) % cycleDuration, [0, 6], [1, 1.15], {
          extrapolateRight: 'clamp',
          easing: Easing.bezier(...easing.bounce),
        })
      : 1;

    return { opacity, y, scale, highlightScale, isActive };
  };

  // 连接线动画
  const lineProgress = interpolate(frame, [50, 90], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 效率数据动画
  const metricOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const metricScale = interpolate(frame, [100, 120], [0.5, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  // 进度条动画
  const progressBarWidth = interpolate(frame, [100, 115], [0, 100], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
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
      {/* 背景光晕 */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '900px',
          height: '600px',
          background: `radial-gradient(ellipse, ${THEME.primary}20 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* 标题区域 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        {/* 徽章 */}
        <div
          style={{
            display: 'inline-block',
            marginBottom: '16px',
            transform: `scale(${badgeScale})`,
          }}
        >
          <div
            style={{
              padding: '8px 24px',
              background: THEME.gradient,
              borderRadius: '24px',
              fontSize: '14px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '3px',
              boxShadow: `0 0 30px ${THEME.primary}60`,
            }}
          >
            SMART
          </div>
        </div>

        {/* 主标题 */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, Inter, sans-serif',
            background: THEME.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}
        >
          智能
        </div>

        {/* 副标题 */}
        <div
          style={{
            fontSize: '24px',
            color: colors.text.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Lightbulb size={22} color={THEME.primary} />
          OpenSpec 工作流，AI 全流程辅助
        </div>
      </div>

      {/* 工作流阶段展示 */}
      <div
        style={{
          opacity: workflowOpacity,
          marginBottom: '40px',
          width: '100%',
          maxWidth: '1400px',
        }}
      >
        {/* 工作流节点 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            position: 'relative',
          }}
        >
          {WORKFLOW_STAGES.map((stage, index) => {
            const anim = getStageAnimation(index);

            return (
              <React.Fragment key={stage.id}>
                {/* 节点 */}
                <GlassCard
                  variant="panel"
                  style={{
                    opacity: anim.opacity,
                    transform: `translateY(${anim.y}px) scale(${anim.scale * anim.highlightScale})`,
                    padding: '16px 20px',
                    minWidth: '100px',
                    textAlign: 'center',
                    background: anim.isActive ? `${THEME.primary}25` : undefined,
                    border: anim.isActive ? `2px solid ${THEME.primary}` : undefined,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      fontSize: '28px',
                      marginBottom: '6px',
                      filter: anim.isActive
                        ? `drop-shadow(0 0 15px ${THEME.primary})`
                        : undefined,
                    }}
                  >
                    {stage.icon}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: anim.isActive ? THEME.primary : colors.text.primary,
                    }}
                  >
                    {stage.label}
                  </div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: colors.text.muted,
                      marginTop: '2px',
                    }}
                  >
                    {stage.name}
                  </div>
                </GlassCard>

                {/* 连接箭头 */}
                {index < WORKFLOW_STAGES.length - 1 && (
                  <div
                    style={{
                      opacity: lineProgress,
                      color: THEME.primary,
                      fontSize: '20px',
                      flexShrink: 0,
                    }}
                  >
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 进度条 */}
        <div
          style={{
            marginTop: '30px',
            width: '100%',
            height: '6px',
            background: `${colors.background.glass}`,
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progressBarWidth}%`,
              height: '100%',
              background: THEME.gradient,
              borderRadius: '3px',
              boxShadow: `0 0 20px ${THEME.primary}`,
            }}
          />
        </div>
      </div>

      {/* 效率提升数据 */}
      <div
        style={{
          opacity: metricOpacity,
          transform: `scale(${metricScale})`,
        }}
      >
        <GlassCard
          variant="card"
          accent={true}
          glow={true}
          style={{
            padding: '28px 60px',
            background: `radial-gradient(circle at center, ${THEME.primary}25, transparent 60%)`,
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
            <TrendingUp size={48} color={THEME.primary} />
            <div>
              <div
                style={{
                  fontSize: '20px',
                  color: colors.text.secondary,
                  marginBottom: '4px',
                }}
              >
                编码效率提升
              </div>
              <div
                style={{
                  fontSize: '64px',
                  fontWeight: 700,
                  background: THEME.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                300%
              </div>
            </div>
            <CheckCircle2 size={42} color={THEME.primary} />
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

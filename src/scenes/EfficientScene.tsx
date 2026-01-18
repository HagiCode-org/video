// EfficientScene - 多会话并行执行 (12-19秒，210帧)
// 核心：多会话并行，Token利用率从20%→100%，效率提升1.5-5倍
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { TrendingUp } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

// 模拟会话数据
const SESSIONS = [
  { id: 1, name: '生成 API', progress: 45, color: colors.aurora.purple },
  { id: 2, name: '写测试', progress: 72, color: colors.aurora.blue },
  { id: 3, name: '优化代码', progress: 30, color: colors.aurora.cyan },
];

export const EfficientScene: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题动画
  const titleProgress = interpolate(frame, [0, 35], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });
  const titleY = interpolate(titleProgress, [0, 1], [30, 0]);
  const titleOpacity = titleProgress;

  // 会话卡片动画
  const getSessionAnimation = (index: number) => {
    const startFrame = 45 + index * 25;
    const progress = interpolate(frame, [startFrame, startFrame + 35], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.bounce),
    });

    return {
      opacity: progress,
      x: interpolate(progress, [0, 1], [-50, 0]),
      scale: interpolate(progress, [0, 1], [0.9, 1]),
    };
  };

  // 进度条动画
  const getProgressWidth = (index: number) => {
    const startFrame = 90 + index * 15;
    return interpolate(frame, [startFrame, startFrame + 45], [0, SESSIONS[index].progress], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.enter),
    });
  };

  // Token利用率对比
  const tokenProgress = interpolate(frame, [135, 165], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const currentBefore = interpolate(tokenProgress, [0, 1], [20, 0], {
    extrapolateRight: 'clamp',
  });
  const currentAfter = interpolate(tokenProgress, [0, 1], [0, 100], {
    extrapolateRight: 'clamp',
  });

  // 效率提升数据
  const efficiencyOpacity = interpolate(frame, [165, 195], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const efficiencyScale = interpolate(frame, [165, 195], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
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
          transform: 'translateX(-50%)',
          width: '900px',
          height: '400px',
          background: `radial-gradient(ellipse, ${colors.secondary.glow}15 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, Inter, sans-serif',
            background: `linear-gradient(135deg, ${colors.secondary.from}, ${colors.secondary.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}
        >
          多会话并行执行
        </div>
        <div
          style={{
            fontSize: '28px',
            color: colors.text.secondary,
          }}
        >
          AI 同时做多件事
        </div>
      </div>

      {/* 会话卡片 */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '50px',
        }}
      >
        {SESSIONS.map((session, index) => {
          const anim = getSessionAnimation(index);
          const progressWidth = getProgressWidth(index);

          return (
            <GlassCard
              key={session.id}
              variant="panel"
              style={{
                opacity: anim.opacity,
                transform: `translateX(${anim.x}px) scale(${anim.scale})`,
                padding: '24px',
                width: '220px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: session.color,
                    boxShadow: `0 0 10px ${session.color}`,
                  }}
                />
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 600,
                    color: colors.text.primary,
                  }}
                >
                  会话 {session.id}
                </div>
              </div>

              <div
                style={{
                  fontSize: '18px',
                  color: colors.text.secondary,
                  marginBottom: '12px',
                }}
              >
                {session.name}
              </div>

              {/* 进度条 */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  background: colors.background.light,
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progressWidth}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${session.color}, ${colors.secondary.to})`,
                    borderRadius: '3px',
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: '16px',
                  color: colors.text.secondary,
                  textAlign: 'right',
                }}
              >
                {Math.round(progressWidth)}%
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Token利用率对比 + 效率提升 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        {/* Token利用率 */}
        <div
          style={{
            opacity: tokenProgress,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              color: colors.text.secondary,
            }}
          >
            Token 利用率
          </div>

          <GlassCard
            variant="card"
            style={{
              padding: '24px 40px',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {/* 之前 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: colors.text.secondary,
                }}
              >
                之前
              </div>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: colors.text.muted,
                }}
              >
                {Math.round(currentBefore)}%
              </div>
            </div>

            {/* 箭头 */}
            <div
              style={{
                fontSize: '32px',
                color: colors.secondary.from,
              }}
            >
              →
            </div>

            {/* 之后 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  fontSize: '16px',
                  color: colors.text.secondary,
                }}
              >
                现在
              </div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${colors.secondary.from}, ${colors.secondary.to})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {Math.round(currentAfter)}%
              </div>
            </div>
          </GlassCard>
        </div>

        {/* 效率提升 */}
        <div
          style={{
            opacity: efficiencyOpacity,
            transform: `scale(${efficiencyScale})`,
          }}
        >
          <GlassCard
            variant="card"
            accent={true}
            glow={true}
            style={{
              padding: '20px 40px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <TrendingUp
              size={32}
              color={colors.success.primary}
              style={{ filter: `drop-shadow(0 0 15px ${colors.success.glow})` }}
            />
            <div>
              <div
                style={{
                  fontSize: '18px',
                  color: colors.text.secondary,
                }}
              >
                效率提升
              </div>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: colors.text.primary,
                }}
              >
                1.5x - 5x
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ConvenientScene - 便捷特性场景 (12-17秒，150帧)
// 展示多线程并发和额度利用率 20% → 100%
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Zap, TrendingUp, Activity } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

// 并发任务示例
const CONCURRENT_TASKS = [
  { id: 1, name: '生成 API', progress: [45, 75, 95], color: '#4ECDC4' },
  { id: 2, name: '写测试', progress: [30, 60, 85], color: '#45B7D1' },
  { id: 3, name: '优化代码', progress: [20, 50, 80], color: '#96CEB4' },
  { id: 4, name: '写文档', progress: [40, 70, 90], color: '#4ECDC4' },
  { id: 5, name: 'Code Review', progress: [25, 55, 88], color: '#45B7D1' },
];

const THEME = {
  primary: '#4ECDC4',
  secondary: '#45B7D1',
  accent: '#96CEB4',
  gradient: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
};

export const ConvenientScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-35f: 标题进入
  // 35-90f: 多线程并发展示
  // 90-150f: 额度利用对比 + 效率数据

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 30], [-40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  // 徽章动画
  const badgeScale = interpolate(frame, [8, 35], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  // 并发任务动画
  const getTaskAnimation = (index: number) => {
    const startFrame = 35 + index * 8;
    const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
      extrapolateRight: 'clamp',
    });

    const x = interpolate(frame, [startFrame, startFrame + 25], [50, 0], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });

    // 进度条动画 - 三次增长
    const progress1 = interpolate(frame, [startFrame + 20, startFrame + 40], [0, 100], {
      extrapolateRight: 'clamp',
    });
    const progress2 = interpolate(frame, [startFrame + 45, startFrame + 65], [0, 100], {
      extrapolateRight: 'clamp',
    });
    const progress3 = interpolate(frame, [startFrame + 70, startFrame + 90], [0, 100], {
      extrapolateRight: 'clamp',
    });

    const currentProgress = frame < startFrame + 45 ? progress1 : frame < startFrame + 70 ? progress2 : progress3;

    return { opacity, x, progress: currentProgress };
  };

  // 额度对比动画
  const comparisonOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 传统方式额度条 (20%)
  const traditionalWidth = interpolate(frame, [95, 120], [0, 20], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Hagicode额度条 (100%)
  const hagicodeWidth = interpolate(frame, [110, 135], [0, 100], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // 效率提升数据动画
  const metricOpacity = interpolate(frame, [125, 145], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const metricScale = interpolate(frame, [130, 150], [0.6, 1], {
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
          marginBottom: '45px',
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
            CONVENIENT
          </div>
        </div>

        {/* 主标题 */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            background: THEME.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}
        >
          便捷
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
          <Zap size={22} color={THEME.primary} />
          多线程并发，充分利用 AI 额度
        </div>
      </div>

      {/* 并发任务展示 */}
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '12px',
          }}
        >
          <Activity size={20} color={THEME.primary} />
          <div
            style={{
              fontSize: '18px',
              color: colors.text.secondary,
              fontWeight: 500,
            }}
          >
            同时执行 5 个任务
          </div>
        </div>

        {/* 任务进度条 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {CONCURRENT_TASKS.map((task) => {
            const anim = getTaskAnimation(task.id - 1);

            return (
              <GlassCard
                key={task.id}
                variant="panel"
                style={{
                  opacity: anim.opacity,
                  transform: `translateX(${anim.x}px)`,
                  padding: '14px 20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '20px',
                      minWidth: '100px',
                      fontWeight: 500,
                      color: colors.text.primary,
                    }}
                  >
                    {task.name}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: '10px',
                      background: `${colors.background.glass}`,
                      borderRadius: '5px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${anim.progress}%`,
                        height: '100%',
                        background: task.color,
                        borderRadius: '5px',
                        boxShadow: `0 0 15px ${task.color}`,
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: task.color,
                      minWidth: '45px',
                      textAlign: 'right',
                    }}
                  >
                    {Math.round(anim.progress)}%
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* 额度对比和效率提升 */}
      <div
        style={{
          opacity: comparisonOpacity,
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
        }}
      >
        {/* 额度对比 */}
        <GlassCard
          variant="card"
          style={{
            padding: '24px 32px',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              color: colors.text.secondary,
              marginBottom: '16px',
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            额度利用率对比
          </div>

          {/* 传统方式 */}
          <div
            style={{
              marginBottom: '14px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px',
                fontSize: '14px',
                color: colors.text.muted,
              }}
            >
              <span>传统单线程</span>
              <span>{Math.round(traditionalWidth)}%</span>
            </div>
            <div
              style={{
                height: '12px',
                background: `${colors.background.glass}`,
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${traditionalWidth}%`,
                  height: '100%',
                  background: '#6b7280',
                  borderRadius: '6px',
                }}
              />
            </div>
          </div>

          {/* Hagicode */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '6px',
                fontSize: '14px',
                color: colors.text.primary,
                fontWeight: 500,
              }}
            >
              <span>Hagicode 多线程</span>
              <span style={{ color: THEME.primary }}>{Math.round(hagicodeWidth)}%</span>
            </div>
            <div
              style={{
                height: '12px',
                background: `${colors.background.glass}`,
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${hagicodeWidth}%`,
                  height: '100%',
                  background: THEME.gradient,
                  borderRadius: '6px',
                  boxShadow: `0 0 20px ${THEME.primary}`,
                }}
              />
            </div>
          </div>
        </GlassCard>

        {/* 效率提升 */}
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
              padding: '24px 40px',
              background: `radial-gradient(circle at center, ${THEME.primary}25, transparent 60%)`,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              <TrendingUp size={40} color={THEME.primary} />
              <div>
                <div
                  style={{
                    fontSize: '18px',
                    color: colors.text.secondary,
                    marginBottom: '4px',
                  }}
                >
                  体验提升
                </div>
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 700,
                    background: THEME.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                  }}
                >
                  1.5x - 5x
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AbsoluteFill>
  );
};

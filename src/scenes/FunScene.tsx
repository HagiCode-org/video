// FunScene - 游戏化有趣 (19-26秒，210帧)
// 核心：成就系统、每日报告，让枯燥代码工作变有趣
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Trophy, Star, Flame, Award, Calendar, BarChart3 } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';
import { DataMetric } from '../components/DataMetric';

interface Achievement {
  icon: React.ReactNode;
  name: string;
  color: string;
  delay: number;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    icon: <Trophy size={32} />,
    name: '首次提交',
    color: '#FFD700',
    delay: 0,
  },
  {
    icon: <Star size={32} />,
    name: '代码达人',
    color: '#FFA500',
    delay: 15,
  },
  {
    icon: <Flame size={32} />,
    name: '连续7天',
    color: '#FF6347',
    delay: 30,
  },
  {
    icon: <Award size={32} />,
    name: '完美一天',
    color: '#4169E1',
    delay: 45,
  },
];

export const FunScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-45f (0-1.5s): 标题弹出
  // 45-150f (1.5-5s): 成就徽章弹出动画
  // 150-210f (5-7s): 每日报告数据展示

  // 标题动画
  const titleProgress = interpolate(frame, [0, 35], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });
  const titleScale = titleProgress;
  const titleOpacity = titleProgress;

  // 成就徽章动画
  const getAchievementAnimation = (delay: number) => {
    const startFrame = 45 + delay;
    const progress = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.bounce),
    });

    return {
      opacity: progress,
      scale: interpolate(progress, [0, 1], [0, 1.1]),
      rotation: interpolate(progress, [0, 1], [-180, 0]),
    };
  };

  // 每日报告动画
  const reportOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const reportY = interpolate(frame, [150, 180], [30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  // 数据计数动画
  const tasksValue = interpolate(frame, [160, 200], [0, 12], {
    extrapolateRight: 'clamp',
  });
  const achievementsValue = interpolate(frame, [165, 205], [0, 3], {
    extrapolateRight: 'clamp',
  });
  const linesValue = interpolate(frame, [170, 210], [0, 2847], {
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
      {/* 背景光晕 - 金色主题 */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: `radial-gradient(ellipse, ${colors.accent.glow}20 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* 标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textAlign: 'center',
          marginBottom: '60px',
        }}
      >
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, Inter, sans-serif',
            background: `linear-gradient(135deg, ${colors.accent.primary}, ${colors.primary.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}
        >
          工作变有趣
        </div>
        <div
          style={{
            fontSize: '28px',
            color: colors.text.secondary,
          }}
        >
          游戏化反馈系统
        </div>
      </div>

      {/* 成就徽章 */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '60px',
        }}
      >
        {ACHIEVEMENTS.map((achievement) => {
          const anim = getAchievementAnimation(achievement.delay);

          return (
            <GlassCard
              key={achievement.name}
              variant="card"
              style={{
                opacity: anim.opacity,
                transform: `scale(${anim.scale}) rotate(${anim.rotation}deg)`,
                padding: '24px',
                minWidth: '140px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`,
                border: `2px solid ${achievement.color}`,
              }}
            >
              <div
                style={{
                  color: achievement.color,
                  filter: `drop-shadow(0 0 15px ${achievement.color}60)`,
                }}
              >
                {achievement.icon}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: colors.text.primary,
                }}
              >
                {achievement.name}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* 每日报告 */}
      <div
        style={{
          opacity: reportOpacity,
          transform: `translateY(${reportY}px)`,
        }}
      >
        <GlassCard
          variant="card"
          glow={true}
          style={{
            padding: '32px 48px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <Calendar size={28} color={colors.secondary.from} />
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: colors.text.primary,
              }}
            >
              今日报告
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '40px',
            }}
          >
            {/* 完成任务 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <BarChart3 size={24} color={colors.aurora.purple} />
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    color: colors.text.secondary,
                    marginBottom: '4px',
                  }}
                >
                  完成任务
                </div>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: colors.text.primary,
                  }}
                >
                  {Math.round(tasksValue)} 个
                </div>
              </div>
            </div>

            {/* 获得成就 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Award size={24} color={colors.accent.primary} />
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    color: colors.text.secondary,
                    marginBottom: '4px',
                  }}
                >
                  获得成就
                </div>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: colors.text.primary,
                  }}
                >
                  {Math.round(achievementsValue)} 个
                </div>
              </div>
            </div>

            {/* 代码行数 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <Star size={24} color={colors.secondary.from} />
              <div>
                <div
                  style={{
                    fontSize: '16px',
                    color: colors.text.secondary,
                    marginBottom: '4px',
                  }}
                >
                  代码行数
                </div>
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    color: colors.text.primary,
                  }}
                >
                  {Math.round(linesValue).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

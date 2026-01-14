// FunScene - 有趣特性场景 (17-22秒，150帧)
// 展示成就系统、每日评级和游戏化体验
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Trophy, Star, Flame, Award, Target, Sparkles } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

// 成就徽章配置
const ACHIEVEMENTS = [
  {
    id: 1,
    name: '初次起飞',
    rarity: 'common',
    rarityLabel: '普通',
    icon: '🚀',
    color: '#b0b0b0',
    bgColor: 'rgba(176, 176, 176, 0.1)',
  },
  {
    id: 2,
    name: '代码大师',
    rarity: 'rare',
    rarityLabel: '稀有',
    icon: '💎',
    color: '#4ECDC4',
    bgColor: 'rgba(78, 205, 196, 0.15)',
  },
  {
    id: 3,
    name: '连续编码',
    rarity: 'epic',
    rarityLabel: '史诗',
    icon: '🔥',
    color: '#A29BFE',
    bgColor: 'rgba(162, 155, 254, 0.15)',
  },
  {
    id: 4,
    name: '传奇开发者',
    rarity: 'legendary',
    rarityLabel: '传说',
    icon: '👑',
    color: '#FFD700',
    bgColor: 'rgba(255, 215, 0, 0.2)',
  },
  {
    id: 5,
    name: '闪电快手',
    rarity: 'rare',
    rarityLabel: '稀有',
    icon: '⚡',
    color: '#4ECDC4',
    bgColor: 'rgba(78, 205, 196, 0.15)',
  },
  {
    id: 6,
    name: '精准打击',
    rarity: 'epic',
    rarityLabel: '史诗',
    icon: '🎯',
    color: '#A29BFE',
    bgColor: 'rgba(162, 155, 254, 0.15)',
  },
];

// 每日评级数据
const DAILY_STATS = {
  rank: 'S',
  tokens: '28,432',
  achievements: 5,
  efficiency: '98%',
};

const THEME = {
  primary: '#A29BFE',
  secondary: '#FD79A8',
  accent: '#FDCB6E',
  gradient: 'linear-gradient(135deg, #A29BFE, #FD79A8)',
  legendary: '#FFD700',
};

export const FunSceneNew: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-35f: 标题进入
  // 35-95f: 成就系统展示
  // 95-150f: 每日评级展示

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

  // 成就卡片动画
  const getAchievementAnimation = (index: number) => {
    const startFrame = 35 + index * 10;
    const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
      extrapolateRight: 'clamp',
    });

    const y = interpolate(frame, [startFrame, startFrame + 25], [40, 0], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });

    const scale = interpolate(frame, [startFrame, startFrame + 20], [0.85, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });

    // 传说级别的发光动画 - 使用正弦波实现脉冲效果
    const glowPulse = ACHIEVEMENTS[index].rarity === 'legendary' && frame >= startFrame + 25
      ? 0.5 + Math.sin((frame - startFrame - 25) * 0.1) * 0.5
      : 0;

    return { opacity, y, scale, glowPulse };
  };

  // 每日评级动画
  const dailyStatsOpacity = interpolate(frame, [95, 115], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const dailyStatsScale = interpolate(frame, [100, 125], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  // S 级评级发光动画
  const sRankGlow = interpolate(frame, [115, 150], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 数据计数动画
  const tokensCount = interpolate(frame, [110, 140], [0, 28432], {
    extrapolateRight: 'clamp',
  });

  const achievementsCount = interpolate(frame, [115, 140], [0, 5], {
    extrapolateRight: 'clamp',
  });

  const efficiencyCount = interpolate(frame, [120, 145], [0, 98], {
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
          marginBottom: '40px',
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
            FUN
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
          有趣
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
          <Sparkles size={22} color={THEME.secondary} />
          游戏化机制，让编码充满乐趣
        </div>
      </div>

      {/* 成就系统展示 */}
      <div
        style={{
          width: '100%',
          maxWidth: '1100px',
          marginBottom: '35px',
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
          <Trophy size={20} color={THEME.legendary} />
          <div
            style={{
              fontSize: '18px',
              color: colors.text.secondary,
              fontWeight: 500,
            }}
          >
            成就系统
          </div>
          <div
            style={{
              fontSize: '14px',
              color: colors.text.muted,
            }}
          >
            (解锁 50+ 成就徽章)
          </div>
        </div>

        {/* 成就卡片网格 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {ACHIEVEMENTS.map((achievement, index) => {
            const anim = getAchievementAnimation(index);
            const isLegendary = achievement.rarity === 'legendary';

            return (
              <GlassCard
                key={achievement.id}
                variant="panel"
                style={{
                  opacity: anim.opacity,
                  transform: `translateY(${anim.y}px) scale(${anim.scale})`,
                  padding: '18px',
                  background: achievement.bgColor,
                  border: isLegendary ? `2px solid ${THEME.legendary}` : undefined,
                  boxShadow: isLegendary
                    ? `0 0 ${30 + anim.glowPulse * 20}px ${THEME.legendary}${40 + anim.glowPulse * 20}`
                    : undefined,
                  transition: 'all 0.3s ease',
                }}
              >
                {/* 稀有度标签 */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: achievement.color,
                    opacity: 0.8,
                  }}
                >
                  {achievement.rarityLabel}
                </div>

                {/* 图标 */}
                <div
                  style={{
                    fontSize: '36px',
                    marginBottom: '10px',
                    filter: isLegendary
                      ? `drop-shadow(0 0 ${15 + anim.glowPulse * 10}px ${THEME.legendary})`
                      : undefined,
                  }}
                >
                  {achievement.icon}
                </div>

                {/* 名称 */}
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: achievement.color,
                  }}
                >
                  {achievement.name}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* 每日评级展示 */}
      <div
        style={{
          opacity: dailyStatsOpacity,
          transform: `scale(${dailyStatsScale})`,
        }}
      >
        <GlassCard
          variant="card"
          accent={true}
          glow={true}
          style={{
            padding: '28px 50px',
            background: `radial-gradient(circle at center, ${THEME.legendary}15, transparent 60%)`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            {/* S 级评级 */}
            <div
              style={{
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  background: THEME.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 ${40 + sRankGlow * 30}px ${THEME.legendary}`,
                  border: `4px solid ${THEME.legendary}`,
                }}
              >
                <div
                  style={{
                    fontSize: '56px',
                    fontWeight: 800,
                    color: 'white',
                    textShadow: `0 0 30px ${THEME.legendary}`,
                  }}
                >
                  S
                </div>
              </div>
            </div>

            {/* 数据统计 */}
            <div>
              <div
                style={{
                  fontSize: '18px',
                  color: colors.text.secondary,
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                今日评级
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '24px',
                }}
              >
                {/* Tokens */}
                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: colors.text.muted,
                      marginBottom: '4px',
                    }}
                  >
                    Tokens
                  </div>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: THEME.primary,
                    }}
                  >
                    {Math.round(tokensCount).toLocaleString()}
                  </div>
                </div>

                {/* 成就数 */}
                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: colors.text.muted,
                      marginBottom: '4px',
                    }}
                  >
                    成就
                  </div>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: THEME.secondary,
                    }}
                  >
                    {Math.round(achievementsCount)}
                  </div>
                </div>

                {/* 效率 */}
                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: colors.text.muted,
                      marginBottom: '4px',
                    }}
                  >
                    效率
                  </div>
                  <div
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: THEME.accent,
                    }}
                  >
                    {Math.round(efficiencyCount)}%
                  </div>
                </div>
              </div>
            </div>

            {/* 装饰图标 */}
            <Award size={50} color={THEME.legendary} />
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

// FeaturesAccumulationScene - 三大特性累积展示场景
// 智能、便捷、有趣逐个累积出现，不是替换
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Lightbulb, Zap, Trophy, TrendingUp, Activity, Star } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

// 三大特性配置
const FEATURES = [
  {
    id: 'smart',
    name: '智能',
    subtitle: 'OpenSpec 工作流',
    description: 'AI 精准理解项目，减少返工',
    metric: '300%',
    metricLabel: '效率提升',
    icon: Lightbulb,
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #6C5CE7)',
    startFrame: 0,
  },
  {
    id: 'convenient',
    name: '便捷',
    subtitle: '多线程并发',
    description: 'Token 利用率 20% → 100%',
    metric: '1.5-5x',
    metricLabel: '体验提升',
    icon: Zap,
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
    startFrame: 60, // 2秒后出现
  },
  {
    id: 'fun',
    name: '有趣',
    subtitle: '游戏化机制',
    description: '成就系统、每日评级',
    metric: 'S',
    metricLabel: '每日评级',
    icon: Trophy,
    color: '#A29BFE',
    gradient: 'linear-gradient(135deg, #A29BFE, #FD79A8)',
    startFrame: 120, // 4秒后出现
  },
];

export const FeaturesAccumulationScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-60f: 智能特性出现
  // 60-120f: 便捷特性出现（智能保留）
  // 120-180f: 有趣特性出现（前两个保留）

  // 计算当前应该显示哪些特性
  const visibleFeatures = FEATURES.filter(f => frame >= f.startFrame);

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 40], [-30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
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
      {/* 背景光晕 - 混合所有可见特性的颜色 */}
      {visibleFeatures.map((feature) => {
        const animOpacity = interpolate(
          frame,
          [feature.startFrame, feature.startFrame + 30],
          [0, 1],
          { extrapolateRight: 'clamp' }
        );

        return (
          <div
            key={feature.id}
            style={{
              position: 'absolute',
              width: '700px',
              height: '500px',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse, ${feature.color}20 0%, transparent 70%)`,
              filter: 'blur(100px)',
              opacity: animOpacity * 0.4,
            }}
          />
        );
      })}

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
            fontSize: '48px',
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '12px',
          }}
        >
          三大核心特性
        </div>
        <div
          style={{
            fontSize: '20px',
            color: colors.text.secondary,
          }}
        >
          让 AI 开发更智能、更便捷、更有趣
        </div>
      </div>

      {/* 特性卡片 - 水平排列累积显示 */}
      <div
        style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'stretch',
        }}
      >
        {visibleFeatures.map((feature) => {
          const Icon = feature.icon;
          const effectiveFrame = frame - feature.startFrame;

          // 出现动画
          const opacity = interpolate(effectiveFrame, [0, 25], [0, 1], {
            extrapolateRight: 'clamp',
          });

          const x = interpolate(effectiveFrame, [0, 30], [50, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });

          const scale = interpolate(effectiveFrame, [0, 25], [0.85, 1], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.bounce),
          });

          // 指标动画
          const metricScale = interpolate(effectiveFrame, [30, 55], [0, 1], {
            extrapolateRight: 'clamp',
            easing: Easing.bezier(...easing.bounce),
          });

          return (
            <GlassCard
              key={feature.id}
              variant="card"
              accent={true}
              glow={true}
              style={{
                opacity,
                transform: `translateX(${x}px) scale(${scale})`,
                padding: '28px 24px',
                minWidth: '220px',
                background: `${feature.color}15`,
                border: `2px solid ${feature.color}60`,
              }}
            >
              {/* 徽章 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '4px 16px',
                  background: feature.gradient,
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '2px',
                  boxShadow: `0 0 20px ${feature.color}60`,
                }}
              >
                {feature.id.toUpperCase()}
              </div>

              {/* 图标 */}
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '16px',
                  marginTop: '8px',
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: `drop-shadow(0 0 15px ${feature.color}60)`,
                  }}
                >
                  <Icon size={30} color="white" />
                </div>
              </div>

              {/* 名称 */}
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '6px',
                  background: feature.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {feature.name}
              </div>

              {/* 副标题 */}
              <div
                style={{
                  fontSize: '14px',
                  color: colors.text.secondary,
                  textAlign: 'center',
                  marginBottom: '12px',
                }}
              >
                {feature.subtitle}
              </div>

              {/* 描述 */}
              <div
                style={{
                  fontSize: '13px',
                  color: colors.text.muted,
                  textAlign: 'center',
                  marginBottom: '16px',
                  lineHeight: 1.4,
                }}
              >
                {feature.description}
              </div>

              {/* 指标 */}
              <div
                style={{
                  textAlign: 'center',
                  opacity: metricScale,
                  transform: `scale(${metricScale})`,
                }}
              >
                <div
                  style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    background: feature.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '2px',
                  }}
                >
                  {feature.metric}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: colors.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {feature.metricLabel}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

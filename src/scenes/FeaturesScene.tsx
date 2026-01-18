// FeaturesScene - 三大核心特性展示场景 (8-15秒，210帧)
// 参考 pcode-docs 文库首页设计，突出智能、便捷、有趣
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Lightbulb, Zap, Trophy, TrendingUp, Sparkles, Award } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

// 三大特性配置
const FEATURES = [
  {
    id: 'smart',
    badge: 'SMART',
    title: '智能',
    subtitle: 'OpenSpec 工作流',
    description: '9阶段完整提案流程，AI 全流程辅助',
    highlight: '效率提升 3 倍',
    icon: Lightbulb,
    color: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FF6B6B, #6C5CE7)',
    stats: { value: '300%', label: '效率提升' },
  },
  {
    id: 'convenient',
    badge: 'CONVENIENT',
    title: '便捷',
    subtitle: '多线程并发操作',
    description: '充分利用 GLM Pro 额度',
    highlight: '体验提升 1.5-5 倍',
    icon: Zap,
    color: '#4ECDC4',
    gradient: 'linear-gradient(135deg, #4ECDC4, #45B7D1)',
    stats: { value: '100%', label: '额度利用' },
  },
  {
    id: 'fun',
    badge: 'FUN',
    title: '有趣',
    subtitle: '游戏化机制',
    description: '成就系统、每日评级',
    highlight: '让编码充满乐趣',
    icon: Trophy,
    color: '#A29BFE',
    gradient: 'linear-gradient(135deg, #A29BFE, #FD79A8)',
    stats: { value: 'S', label: '每日评级' },
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-30f: 标题进入
  // 30-70f: 智能特性展示
  // 70-110f: 便捷特性展示
  // 110-150f: 有趣特性展示
  // 150-210f: 总结

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 30], [-30, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  // 特性卡片动画
  const getFeatureAnimation = (index: number) => {
    const startFrame = 30 + index * 40;
    const endFrame = startFrame + 35;

    const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
      extrapolateRight: 'clamp',
    });

    const x = interpolate(frame, [startFrame, endFrame], [100, 0], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.enter),
    });

    const scale = interpolate(frame, [startFrame, endFrame], [0.9, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });

    // 突出显示效果
    const highlightScale = interpolate(
      frame,
      [endFrame, endFrame + 20, endFrame + 40],
      [1, 1.1, 1],
      {
        extrapolateRight: 'clamp',
        easing: Easing.bezier(...easing.bounce),
      }
    );

    return { opacity, x, scale, highlightScale };
  };

  // 统计数据动画
  const getStatsAnimation = (index: number) => {
    const startFrame = 50 + index * 40;

    const opacity = interpolate(frame, [startFrame, startFrame + 25], [0, 1], {
      extrapolateRight: 'clamp',
    });

    const scale = interpolate(frame, [startFrame, startFrame + 30], [0.5, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.bounce),
    });

    return { opacity, scale };
  };

  // 当前高亮的特性索引
  const activeIndex = Math.floor((frame - 30) / 40);

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
      {FEATURES.map((feature, index) => {
        const anim = getFeatureAnimation(index);
        const isActive = activeIndex === index;

        return (
          <div
            key={feature.id}
            style={{
              position: 'absolute',
              width: '600px',
              height: '600px',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(ellipse, ${feature.color}15 0%, transparent 70%)`,
              filter: 'blur(100px)',
              opacity: anim.opacity * (isActive ? 1 : 0.3),
              transition: 'opacity 0.5s ease',
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
          marginBottom: '60px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: '56px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, Inter, sans-serif',
            background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '16px',
          }}
        >
          三大核心特性
        </div>
        <div
          style={{
            fontSize: '24px',
            color: colors.text.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <Sparkles size={20} color={colors.accent.primary} />
          让 AI 开发更智能、更便捷、更有趣
        </div>
      </div>

      {/* 特性卡片 */}
      <div
        style={{
          display: 'flex',
          gap: '30px',
          marginBottom: '50px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          const anim = getFeatureAnimation(index);
          const isActive = activeIndex === index;
          const statsAnim = getStatsAnimation(index);

          return (
            <GlassCard
              key={feature.id}
              variant="card"
              accent={isActive}
              glow={isActive}
              style={{
                opacity: anim.opacity,
                transform: `translateX(${anim.x}px) scale(${anim.scale * anim.highlightScale})`,
                padding: '32px 28px',
                minWidth: '280px',
                position: 'relative',
                background: isActive
                  ? `linear-gradient(135deg, ${feature.color}20, transparent)`
                  : undefined,
                border: isActive ? `2px solid ${feature.color}60` : undefined,
                transition: 'all 0.3s ease',
              }}
            >
              {/* 徽章 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '6px 16px',
                  background: feature.gradient,
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'white',
                  letterSpacing: '2px',
                  boxShadow: `0 0 20px ${feature.color}60`,
                }}
              >
                {feature.badge}
              </div>

              {/* 图标 */}
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  marginTop: '12px',
                }}
              >
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    margin: '0 auto',
                    borderRadius: '50%',
                    background: feature.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: `drop-shadow(0 0 20px ${feature.color}60)`,
                  }}
                >
                  <Icon size={36} color="white" />
                </div>
              </div>

              {/* 标题 */}
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '8px',
                  background: feature.gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {feature.title}
              </div>

              {/* 副标题 */}
              <div
                style={{
                  fontSize: '16px',
                  color: colors.text.secondary,
                  textAlign: 'center',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                {feature.subtitle}
              </div>

              {/* 描述 */}
              <div
                style={{
                  fontSize: '14px',
                  color: colors.text.muted,
                  textAlign: 'center',
                  marginBottom: '20px',
                  lineHeight: 1.6,
                }}
              >
                {feature.description}
              </div>

              {/* 统计数据 */}
              <div
                style={{
                  textAlign: 'center',
                  opacity: statsAnim.opacity,
                  transform: `scale(${statsAnim.scale})`,
                }}
              >
                <div
                  style={{
                    fontSize: '42px',
                    fontWeight: 700,
                    background: feature.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {feature.stats.value}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: colors.text.secondary,
                    fontWeight: 500,
                  }}
                >
                  {feature.stats.label}
                </div>
              </div>

              {/* 高亮文字 */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '10px',
                  background: `${feature.color}15`,
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: feature.color,
                  fontWeight: 600,
                }}
              >
                {feature.highlight}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* 底部总结 */}
      <div
        style={{
          opacity: interpolate(frame, [150, 180], [0, 1], {
            extrapolateRight: 'clamp',
          }),
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <GlassCard
          variant="panel"
          style={{
            padding: '16px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Award size={24} color={colors.accent.primary} />
          <div
            style={{
              fontSize: '18px',
              color: colors.text.secondary,
              fontWeight: 500,
            }}
          >
            重新定义 AI 辅助开发体验
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

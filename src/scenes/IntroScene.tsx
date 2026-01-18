// IntroScene - Product introduction scene (5-12s, 210 frames)
// Enhanced with aurora background, typing effect, and animated logo
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Sparkles, Zap } from 'lucide-react';
import { colors, easing, glow } from '../utils/theme';
import { Logo } from '../components/Logo';
import { AnimatedText } from '../components/AnimatedText';
import { ScreenshotCarousel } from '../components/ScreenshotCarousel';

// 所有截图用于轮播
const SCREENSHOTS = [
  'ai-response.png',
  'sdd-tab.png',
  'proposal-review.png',
  'execution-result.png',
  'create-proposal-1.png',
  '01-create-normal-session.png',
  '02-chat-input.png',
  '05-mode-switch.png',
  '10.tab上会显示规划相关的文件.png',
  '17.批注提交之后，可以在对话tab看到ai修改的过程.png',
  '18.规划人工确认无误之后，可以在信息tab点击立即执行.png',
  '19.规划正在执行的阶段展示.png',
  '20.规划执行完成之后的阶段展示.png',
];

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-30f (0-1s): Logo scale in with aurora
  // 30-60f (1-2s): Title typing effect
  // 60-90f (2-3s): Slogan fade in
  // 90-210f (3-7s): Full display with screenshots (4 seconds pause)

  // Aurora gradient animation
  const auroraOffset = interpolate(frame, [0, 210], [0, 100], {
    extrapolateRight: 'continue',
  });

  // Logo animation
  const logoScale = interpolate(frame, [0, 25], [0.3, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Title background glow pulse
  const titleGlow = interpolate(
    frame,
    [30, 60, 90],
    [0.3, 0.8, 0.4],
    { extrapolateRight: 'clamp' }
  );

  // Slogan slide up
  const sloganY = interpolate(frame, [60, 80], [40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  const sloganOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Feature icons fade in
  const featureOpacity = interpolate(frame, [75, 95], [0, 1], {
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
        overflow: 'hidden',
      }}
    >
      {/* Animated aurora background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% ${50 + Math.sin(auroraOffset * 0.02) * 10}%, ${colors.aurora.purple}30 0%, transparent 50%),
            radial-gradient(ellipse at 80% ${50 + Math.cos(auroraOffset * 0.02) * 10}%, ${colors.aurora.blue}25 0%, transparent 50%),
            radial-gradient(ellipse at 50% ${80 + Math.sin(auroraOffset * 0.03) * 15}%, ${colors.aurora.cyan}20 0%, transparent 60%)
          `,
          filter: 'blur(80px)',
        }}
      />

      {/* Screenshot carousel in background */}
      <ScreenshotCarousel
        screenshots={SCREENSHOTS}
        interval={8}
        scale={0.7}
        opacity={0.6}
        borderRadius="12px"
        maxWidth="550px"
        safeZone={true}
      />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const y = interpolate(
          frame,
          [0, 210],
          [(i * 54) % 1080, ((i * 54) - 210) % 1080],
          { extrapolateRight: 'continue' }
        );

        const opacity = interpolate(
          (frame + i * 5) % 210,
          [0, 15, 195, 210],
          [0, 0.6, 0.6, 0]
        );

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${(i * 97) % 1920}px`,
              top: `${y}px`,
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              background: colors.aurora.purple,
              opacity,
              filter: 'blur(1px)',
            }}
          />
        );
      })}

      {/* Hagicode Logo with enhanced animation */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          marginBottom: '40px',
        }}
      >
        <Logo
          variant="full"
          animation="scale"
          useGradient={true}
          delay={0}
        />
      </div>

      {/* Animated title with glow */}
      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          marginTop: '60px',
        }}
      >
        {/* Glow effect behind title */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '120px',
            fontWeight: 700,
            fontFamily: 'Space Grotesk, Inter, sans-serif',
            background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: titleGlow * 0.3,
            filter: `blur(30px)`,
            zIndex: -1,
            whiteSpace: 'nowrap',
          }}
        >
          AI 驱动的智能开发平台
        </div>

        {/* Main title with typing effect */}
        <div style={{ fontSize: '48px', fontWeight: 600, minHeight: '60px' }}>
          <AnimatedText
            text="AI 驱动的智能开发平台"
            delay={30}
            effect="type"
            speed={3}
            style={{
              fontSize: '48px',
              fontWeight: 600,
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          />
        </div>
      </div>

      {/* Slogan with slide animation */}
      <div
        style={{
          transform: `translateY(${sloganY}px)`,
          opacity: sloganOpacity,
          textAlign: 'center',
          marginTop: '32px',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            fontWeight: 400,
            color: colors.text.secondary,
            fontFamily: 'DM Sans, Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Sparkles size={24} color={colors.accent.primary} style={{ animation: 'pulse 2s infinite' }} />
          让 AI 成为你的开发伙伴
          <Zap size={24} color={colors.secondary.from} style={{ animation: 'pulse 2s infinite 0.5s' }} />
        </div>
      </div>

      {/* Feature badges */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginTop: '40px',
          opacity: featureOpacity,
        }}
      >
        {['智能对话', 'OpenSpec', '团队协作'].map((feature, i) => (
          <div
            key={feature}
            style={{
              padding: '8px 20px',
              background: colors.background.glass,
              border: `1px solid ${colors.border.accent}`,
              borderRadius: '20px',
              fontSize: '16px',
              color: colors.text.secondary,
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: colors.primary.to }}>●</span>
            {feature}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

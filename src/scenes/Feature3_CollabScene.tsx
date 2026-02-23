// Feature3_CollabScene - Real-time collaboration showcase (40-50s, 300 frames)
// Enhanced with animated collaboration visualization and glassmorphism
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Users, ArrowRight, Code2, MessageCircle, GitPullRequest } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

const USERS = [
  { id: 1, name: '开发者 A', color: colors.aurora.purple, icon: <Code2 size={24} /> },
  { id: 2, name: '开发者 B', color: colors.aurora.blue, icon: <MessageCircle size={24} /> },
  { id: 3, name: '开发者 C', color: colors.aurora.cyan, icon: <GitPullRequest size={24} /> },
];

export const Feature3_CollabScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-60f (0-2s): Title slide in
  // 60-200f (2-6.7s): Users appear with animated connections
  // 200-300f (6.7-10s): Hold with pulse effects

  // Title animation
  const titleProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);
  const titleOpacity = titleProgress;

  // Users stagger animation
  const getUserAnimation = (index: number) => {
    const startFrame = 60 + index * 30;
    const progress = interpolate(frame, [startFrame, startFrame + 35], [0, 1], {
      extrapolateRight: 'clamp',
      easing: Easing.bezier(...easing.bounce),
    });

    return {
      opacity: progress,
      scale: interpolate(progress, [0, 1], [0.8, 1]),
      x: interpolate(progress, [0, 1], [index % 2 === 0 ? -60 : 60, 0]),
    };
  };

  // Central hub animation
  const hubProgress = interpolate(frame, [120, 160], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });
  const hubScale = interpolate(hubProgress, [0, 1], [0.5, 1]);
  const hubOpacity = hubProgress;

  // Connection lines animation
  const getConnectionProgress = (userIndex: number) => {
    const startFrame = 90 + userIndex * 25;
    return interpolate(frame, [startFrame, startFrame + 40], [0, 1], {
      extrapolateRight: 'clamp',
    });
  };

  // Data flow animation
  const flowOffset = interpolate(frame, [0, 300], [0, -100], {
    extrapolateRight: 'continue',
  });

  // Pulse effect for active users
  const getPulseScale = (index: number) => {
    const pulseFrame = (frame - 60 - index * 30) % 100;
    return interpolate(
      pulseFrame,
      [0, 30, 60],
      [1, 1.08, 1],
      { extrapolateRight: 'clamp', easing: Easing.sin }
    );
  };

  // Subtitle fade in
  const subtitleOpacity = interpolate(frame, [200, 230], [0, 1], {
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
      {/* Animated background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 40% 50%, ${colors.aurora.purple}10 0%, transparent 50%),
            radial-gradient(circle at 60% 50%, ${colors.aurora.blue}10 0%, transparent 50%)
          `,
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize: '56px',
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.secondary.from}, ${colors.secondary.to})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '60px',
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
        }}
      >
        实时团队协作
      </div>

      {/* Collaboration visualization */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Connection lines */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          {USERS.map((user, index) => {
            const progress = getConnectionProgress(index);
            const userY = 150 + index * 100;
            const dashLength = 150 * progress;

            return (
              <g key={index}>
                <line
                  x1="300"
                  y1={userY}
                  x2="500"
                  y2="250"
                  stroke={user.color}
                  strokeWidth="3"
                  strokeOpacity={0.3 + progress * 0.4}
                  strokeDasharray={`${dashLength} 150`}
                  strokeLinecap="round"
                />
                {/* Animated data flow dots */}
                {progress > 0.8 && (
                  <circle
                    r="6"
                    fill={user.color}
                    opacity={0.8}
                    cx={interpolate(
                      ((frame - 150 - index * 20) % 60) / 60,
                      [0, 1],
                      [300, 500]
                    )}
                    cy={interpolate(
                      ((frame - 150 - index * 20) % 60) / 60,
                      [0, 1],
                      [userY, 250]
                    )}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Users column */}
        <div
          style={{
            position: 'absolute',
            left: '200px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '60px',
            zIndex: 1,
          }}
        >
          {USERS.map((user, index) => {
            const anim = getUserAnimation(index);
            const pulseScale = frame > 60 + index * 30 ? getPulseScale(index) : 1;

            return (
              <GlassCard
                key={user.id}
                variant="panel"
                style={{
                  opacity: anim.opacity,
                  transform: `translateX(${anim.x}px) scale(${anim.scale * pulseScale})`,
                  padding: '20px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  width: '280px',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${user.color}, ${user.color}80)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: `drop-shadow(0 0 15px ${user.color}50)`,
                  }}
                >
                  {user.icon}
                </div>

                {/* User info */}
                <div>
                  <div
                    style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      marginBottom: '4px',
                    }}
                  >
                    {user.name}
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: colors.text.secondary,
                    }}
                  >
                    正在协作中
                  </div>
                </div>

                {/* Status indicator */}
                <div
                  style={{
                    marginLeft: 'auto',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: colors.success.primary,
                    boxShadow: `0 0 10px ${colors.success.glow}`,
                    animation: `pulse 2s infinite`,
                  }}
                />
              </GlassCard>
            );
          })}
        </div>

        {/* Central hub */}
        <div
          style={{
            position: 'absolute',
            left: '650px',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: hubOpacity,
            zIndex: 1,
          }}
        >
          <GlassCard
            variant="card"
            glow={true}
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              transform: `scale(${hubScale})`,
            }}
          >
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '24px',
                background: `linear-gradient(135deg, ${colors.primary.from}30, ${colors.secondary.to}30)`,
                border: `2px solid ${colors.primary.from}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: `drop-shadow(0 0 20px ${colors.primary.glow})`,
              }}
            >
              <Code2 size={50} color={colors.primary.from} />
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: colors.text.primary,
                textAlign: 'center',
              }}
            >
              共享代码库
            </div>
            <div
              style={{
                fontSize: '16px',
                color: colors.text.secondary,
                textAlign: 'center',
              }}
            >
              实时同步
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          fontSize: '28px',
          fontWeight: 500,
          color: colors.text.secondary,
          opacity: subtitleOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <span style={{ color: colors.secondary.to }}>●</span>
        实时同步 · 无缝协作
        <span style={{ color: colors.primary.to }}>●</span>
      </div>
    </AbsoluteFill>
  );
};

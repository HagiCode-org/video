// CTAScene - Call to action scene (28-35s，210帧)
// 展示网址 + 截图从左侧飘入并叠在一起
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, staticFile } from 'remotion';
import { Rocket, Sparkles, Globe } from 'lucide-react';
import { colors, easing } from '../utils/theme';
import { GlassCard } from '../components/GlassCard';

// 所有截图用于从左侧飘入叠加展示
const SCREENSHOTS = [
  '01-create-normal-session.png',
  '02-chat-input.png',
  '05-mode-switch.png',
  '10.tab上会显示规划相关的文件.png',
  '11.点击一个具体的文件，可以进行行内评注.png',
  '12.也可以在文件的底部添加文件级别的评注.png',
  '17.批注提交之后，可以在对话tab看到ai修改的过程.png',
  '18.规划人工确认无误之后，可以在信息tab点击立即执行.png',
  '19.规划正在执行的阶段展示.png',
  '20.规划执行完成之后的阶段展示.png',
  'ai-response.png',
  'sdd-tab.png',
  'proposal-review.png',
  'execution-result.png',
  'create-proposal-1.png',
];

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline:
  // 0-60f: 主标题和网址进入
  // 60-210f: 截图从左侧飘入并叠加

  // 主标题动画
  const titleProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 50], [-40, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.enter),
  });

  // 网址卡片动画
  const urlOpacity = interpolate(frame, [30, 70], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const urlScale = interpolate(frame, [40, 80], [0.8, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...easing.bounce),
  });

  // 截图飘入动画 - 每10帧添加一张新截图
  const screenshotsToShow = Math.min(Math.floor((frame - 60) / 10), SCREENSHOTS.length);

  // 浮动动画
  const floatY = Math.sin(frame * 0.05) * 6;

  // Sparkle旋转
  const sparkleRotation = interpolate(frame, [0, 210], [0, 360], {
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
        padding: '40px',
      }}
    >
      {/* 背景光晕 */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '700px',
          background: `radial-gradient(ellipse, ${colors.primary.glow}15 0%, transparent 70%)`,
          filter: 'blur(100px)',
        }}
      />

      {/* 主标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px) scale(${titleProgress})`,
          textAlign: 'center',
          marginBottom: '30px',
          zIndex: 10,
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
            marginBottom: '10px',
          }}
        >
          立即体验 Hagicode
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <Sparkles
            size={20}
            color={colors.accent.primary}
            style={{ transform: `rotate(${sparkleRotation}deg)` }}
          />
          <span
            style={{
              fontSize: '20px',
              color: colors.text.secondary,
              fontWeight: 500,
            }}
          >
            开启智能开发之旅
          </span>
          <Sparkles
            size={20}
            color={colors.secondary.from}
            style={{ transform: `rotate(${sparkleRotation}deg)` }}
          />
        </div>
      </div>

      {/* 网址卡片 */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `scale(${urlScale}) translateY(${floatY}px)`,
          marginBottom: '30px',
          zIndex: 10,
        }}
      >
        <GlassCard
          variant="card"
          accent={true}
          glow={true}
          style={{
            padding: '20px 50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <Globe size={32} color={colors.primary.to} />
            <div>
              <div
                style={{
                  fontSize: '14px',
                  color: colors.text.muted,
                  marginBottom: '4px',
                }}
              >
                详细介绍站点地址
              </div>
              <div
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: colors.text.primary,
                  letterSpacing: '0.5px',
                }}
              >
                hagicode-org.github.io/site/
              </div>
            </div>
            <Rocket size={28} color={colors.accent.primary} />
          </div>
        </GlassCard>
      </div>

      {/* 截图从左侧飘入并叠加展示 */}
      <div
        style={{
          position: 'relative',
          width: '1600px',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {SCREENSHOTS.slice(0, screenshotsToShow).map((screenshot, index) => {
          const startFrame = 60 + index * 10;
          const slideFrame = frame - startFrame;

          // 从左侧飘入动画 - 更远的起始位置，从屏幕外飘入
          const slideX = interpolate(slideFrame, [0, 50], [-800, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });

          // 淡入动画
          const fadeIn = interpolate(slideFrame, [0, 35], [0, 1], {
            extrapolateRight: 'clamp',
          });

          // 缩放动画（从大到正常）
          const scale = interpolate(slideFrame, [0, 40], [1.15, 1], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });

          // 轻微旋转效果
          const rotation = interpolate(slideFrame, [0, 40], [4, 0], {
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.cubic),
          });

          // 从右向左排列，每张覆盖前一张的80%
          // 400px宽度，20%重叠 = 每张向右偏移 320px
          const cardWidth = 400;
          const overlapOffset = index * (cardWidth * 0.8);

          // 第一张截图部分超出左侧屏幕
          // left: -200px 会让第一张截图的左半部分在屏幕外
          const baseLeft = -200;

          return (
            <div
              key={screenshot}
              style={{
                position: 'absolute',
                left: `${baseLeft}px`,
                top: '50%',
                transform: `translate(${slideX + overlapOffset}px, -50%) scale(${scale}) rotate(${rotation}deg)`,
                opacity: fadeIn * 0.95,
                filter: `
                  drop-shadow(0 12px 35px rgba(0, 0, 0, 0.5))
                  drop-shadow(0 0 20px ${colors.primary.glow})
                `,
                zIndex: index,
              }}
            >
              <img
                src={staticFile(`/screenshots/${screenshot}`)}
                alt={screenshot}
                style={{
                  width: '400px',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '16px',
                  border: `2px solid ${colors.primary.from}80`,
                  boxShadow: `0 0 35px ${colors.primary.glow}50`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 底部 Logo */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          opacity: urlOpacity,
          zIndex: 10,
        }}
      >
        <GlassCard
          variant="panel"
          style={{
            padding: '16px 40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Rocket size={24} color={colors.accent.primary} />
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${colors.primary.from}, ${colors.primary.to})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Hagicode
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: colors.text.muted,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                AI-Powered Development Platform
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </AbsoluteFill>
  );
};

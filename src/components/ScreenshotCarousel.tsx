// ScreenshotCarousel - 截图随机分布累积显示组件
import React from 'react';
import { useCurrentFrame, interpolate, Easing, staticFile } from 'remotion';
import { colors } from '../utils/theme';

export interface ScreenshotCarouselProps {
  screenshots: string[];
  interval?: number; // 每多少帧出现一张新截图
  scale?: number;
  opacity?: number;
  borderRadius?: string;
  maxWidth?: string;
  safeZone?: boolean; // 是否保留中间安全区域
}

// 预设的随机位置（避免运行时随机导致闪烁）
const RANDOM_POSITIONS = [
  { x: 5, y: 10, rotation: -8 },
  { x: 75, y: 15, rotation: 6 },
  { x: 15, y: 60, rotation: -5 },
  { x: 70, y: 65, rotation: 4 },
  { x: 40, y: 80, rotation: -3 },
  { x: 8, y: 35, rotation: 7 },
  { x: 78, y: 40, rotation: -6 },
  { x: 25, y: 5, rotation: 5 },
  { x: 60, y: 85, rotation: -4 },
  { x: 85, y: 25, rotation: 3 },
  { x: 12, y: 75, rotation: -7 },
  { x: 65, y: 8, rotation: 6 },
  { x: 50, y: 15, rotation: -5 },
  { x: 30, y: 70, rotation: 4 },
  { x: 80, y: 55, rotation: -3 },
];

export const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  screenshots,
  interval = 12, // 默认0.4秒出现一张
  scale = 0.5,
  opacity = 0.35,
  borderRadius = '12px',
  maxWidth = '350px',
  safeZone = true,
}) => {
  const frame = useCurrentFrame();

  // 计算当前应该显示多少张截图
  const visibleCount = Math.min(Math.floor(frame / interval), screenshots.length);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {screenshots.slice(0, visibleCount).map((screenshot, index) => {
        // 使用预设位置，超出则循环
        const pos = RANDOM_POSITIONS[index % RANDOM_POSITIONS.length];

        // 每张截图的动画延迟
        const startFrame = index * interval;
        const effectiveFrame = frame - startFrame;

        // 淡入效果
        const fadeIn = interpolate(effectiveFrame, [0, 15], [0, 1], {
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });

        // 缩放效果（从大变小到正常）
        const scaleEffect = interpolate(effectiveFrame, [0, 20], [1.2, 1], {
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.bounce),
        });

        // 旋转效果（轻微摆动）
        const sway = Math.sin(effectiveFrame * 0.05) * 2;

        const currentOpacity = opacity * fadeIn;
        const currentScale = scale * scaleEffect;
        const currentRotation = pos.rotation + sway;

        // 检查是否在中间安全区域
        const isInSafeZone = safeZone && pos.x > 30 && pos.x < 70 && pos.y > 30 && pos.y < 70;

        // 如果在安全区域，调整位置
        const finalX = isInSafeZone ? (pos.x < 50 ? 25 : 75) : pos.x;
        const finalY = isInSafeZone ? (pos.y < 50 ? 20 : 80) : pos.y;

        return (
          <div
            key={`${screenshot}-${index}`}
            style={{
              position: 'absolute',
              left: `${finalX}%`,
              top: `${finalY}%`,
              transform: `translate(-50%, -50%) scale(${currentScale}) rotate(${currentRotation}deg)`,
              opacity: currentOpacity,
              filter: `
                drop-shadow(0 15px 35px rgba(0, 0, 0, 0.4))
                drop-shadow(0 0 20px ${colors.primary.glow})
              `,
              zIndex: index,
            }}
          >
            <img
              src={staticFile(`/screenshots/${screenshot}`)}
              alt={screenshot}
              style={{
                maxWidth,
                height: 'auto',
                display: 'block',
                borderRadius,
                border: `1.5px solid ${colors.primary.from}40`,
                boxShadow: `0 0 30px ${colors.primary.glow}30`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

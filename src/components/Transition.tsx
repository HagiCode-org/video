// Transition component - Scene transition effects
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export interface TransitionProps {
  type: 'fade' | 'wipe' | 'zoom' | 'slide';
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  progress?: number; // 0-1, for manual control
  color?: string;
}

export const Transition: React.FC<TransitionProps> = ({
  type,
  direction = 'left',
  duration = 30,
  progress,
  color = '#000000',
}) => {
  const frame = useCurrentFrame();

  // Calculate progress (0 to 1)
  const t = progress !== undefined
    ? progress
    : interpolate(frame, [0, duration], [0, 1], { extrapolateRight: 'clamp' });

  let content: React.ReactNode = null;

  if (type === 'fade') {
    content = (
      <AbsoluteFill
        style={{
          backgroundColor: color,
          opacity: t,
        }}
      />
    );
  } else if (type === 'wipe') {
    let wipeStyle: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: color,
    };

    if (direction === 'left') {
      wipeStyle = {
        ...wipeStyle,
        left: 0,
        top: 0,
        bottom: 0,
        width: `${t * 100}%`,
      };
    } else if (direction === 'right') {
      wipeStyle = {
        ...wipeStyle,
        right: 0,
        top: 0,
        bottom: 0,
        width: `${t * 100}%`,
      };
    } else if (direction === 'up') {
      wipeStyle = {
        ...wipeStyle,
        top: 0,
        left: 0,
        right: 0,
        height: `${t * 100}%`,
      };
    } else if (direction === 'down') {
      wipeStyle = {
        ...wipeStyle,
        bottom: 0,
        left: 0,
        right: 0,
        height: `${t * 100}%`,
      };
    }

    content = <div style={wipeStyle} />;
  } else if (type === 'zoom') {
    content = (
      <AbsoluteFill
        style={{
          backgroundColor: color,
          transform: `scale(${t})`,
          transformOrigin: 'center',
        }}
      />
    );
  } else if (type === 'slide') {
    const translateValue = interpolate(t, [0, 1], [-100, 0]);
    const transform =
      direction === 'left' || direction === 'right'
        ? `translateX(${direction === 'left' ? translateValue : -translateValue}%)`
        : `translateY(${direction === 'up' ? translateValue : -translateValue}%)`;

    content = (
      <AbsoluteFill
        style={{
          backgroundColor: color,
          transform,
        }}
      />
    );
  }

  return <>{content}</>;
};

// TextOverlay component - Generic text overlay with animations
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export interface TextOverlayProps {
  text: string | string[];
  enterAnimation?: 'fade' | 'slideUp' | 'scale' | 'typewriter';
  exitAnimation?: 'fade' | 'scale';
  position?: 'center' | 'top' | 'bottom';
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  exitDelay?: number;
  exitDuration?: number;
  className?: string;
}

export const TextOverlay: React.FC<TextOverlayProps> = ({
  text,
  enterAnimation = 'fade',
  exitAnimation,
  position = 'center',
  style,
  delay = 0,
  duration = 30,
  exitDelay,
  exitDuration = 30,
  className = '',
}) => {
  const frame = useCurrentFrame();

  // Calculate all animations in same order (no conditional hooks)
  const fadeInValue = interpolate(frame, [delay, delay + duration], [0, 1], { extrapolateRight: 'clamp' });
  const scaleValue = interpolate(frame, [delay, delay + duration], [0, 1], { extrapolateRight: 'clamp' });
  const slideUpValue = interpolate(frame, [delay, delay + duration], [0, 1], { extrapolateRight: 'clamp' });

  let opacity = 1;
  let transform = '';

  if (enterAnimation === 'fade') {
    opacity = fadeInValue;
  } else if (enterAnimation === 'scale') {
    transform = `scale(${scaleValue})`;
  } else if (enterAnimation === 'slideUp') {
    const translateY = interpolate(slideUpValue, [0, 1], [100, 0]);
    transform = `translateY(${translateY}px)`;
    opacity = slideUpValue;
  }

  // Calculate exit animation if specified
  if (exitAnimation && exitDelay !== undefined) {
    const exitValue = interpolate(frame, [exitDelay, exitDelay + exitDuration], [1, 0], { extrapolateRight: 'clamp' });
    opacity *= exitValue;
  }

  // Position styles
  const positionStyles: Record<string, React.CSSProperties> = {
    center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    top: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '150px',
    },
    bottom: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: '150px',
    },
  };

  // Render text (single string or array)
  const textContent = Array.isArray(text) ? text.join('') : text;

  return (
    <AbsoluteFill style={{ ...positionStyles[position] }}>
      <div
        className={className}
        style={{
          opacity,
          transform,
          textAlign: 'center',
          ...style,
        }}
      >
        {textContent}
      </div>
    </AbsoluteFill>
  );
};

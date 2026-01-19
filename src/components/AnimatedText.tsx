// AnimatedText - Text with typing and reveal effects
import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { easing, duration, colors } from '../utils/theme';

export interface AnimatedTextProps {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
  effect?: 'type' | 'reveal' | 'fade' | 'slide';
  speed?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  style = {},
  effect = 'fade',
  speed = 3, // characters per frame for typing
}) => {
  const frame = useCurrentFrame();
  const effectiveFrame = Math.max(0, frame - delay);

  const baseStyle: React.CSSProperties = {
    ...style,
  };

  switch (effect) {
    case 'type': {
      const totalChars = text.length;
      const progress = Math.min(effectiveFrame * speed, totalChars);
      const visibleText = text.slice(0, Math.ceil(progress));

      // Cursor blink
      const cursorOpacity = interpolate(
        effectiveFrame % 30,
        [0, 15, 30],
        [1, 1, 0]
      );

      return (
        <div style={baseStyle}>
          {visibleText}
          <span
            style={{
              color: colors.text.accent,
              opacity: cursorOpacity,
              marginLeft: '4px',
            }}
          >
            |
          </span>
        </div>
      );
    }

    case 'reveal': {
      const progress = interpolate(effectiveFrame, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.bezier(...easing.enter),
      });

      const clipPath = `inset(0 ${100 * (1 - progress)}% 0 0)`;

      return (
        <div
          style={{
            ...baseStyle,
            clipPath,
            opacity: progress,
          }}
        >
          {text}
        </div>
      );
    }

    case 'slide': {
      const progress = interpolate(effectiveFrame, [0, 30], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.bezier(...easing.enter),
      });

      const translateY = interpolate(progress, [0, 1], [30, 0]);
      const opacity = interpolate(effectiveFrame, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
      });

      return (
        <div
          style={{
            ...baseStyle,
            transform: `translateY(${translateY}px)`,
            opacity,
          }}
        >
          {text}
        </div>
      );
    }

    case 'fade':
    default: {
      const opacity = interpolate(effectiveFrame, [0, duration.normal], [0, 1], {
        extrapolateRight: 'clamp',
        easing: Easing.bezier(...easing.enter),
      });

      return (
        <div style={{ ...baseStyle, opacity }}>{text}</div>
      );
    }
  }
};

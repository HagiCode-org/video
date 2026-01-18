// FeatureCard component - Display product features
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img } from 'remotion';
import { colors } from '../utils/theme';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  layout?: 'horizontal' | 'vertical';
  image?: string;
  enterAnimation?: 'slideLeft' | 'slideRight' | 'fadeIn' | 'scaleIn';
  delay?: number;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  layout = 'horizontal',
  image,
  enterAnimation = 'slideLeft',
  delay = 0,
  className = '',
}) => {
  const frame = useCurrentFrame();

  // Calculate animation - always call hooks in same order
  const fadeInProgress = interpolate(frame, [delay, delay + 30], [0, 1], { extrapolateRight: 'clamp' });

  let opacity = 1;
  let transform = '';

  if (enterAnimation === 'fadeIn') {
    opacity = fadeInProgress;
  } else if (enterAnimation === 'scaleIn') {
    const scale = fadeInProgress;
    transform = `scale(${scale})`;
  } else if (enterAnimation === 'slideLeft') {
    const translateX = interpolate(fadeInProgress, [0, 1], [-100, 0]);
    transform = `translateX(${translateX}px)`;
    opacity = fadeInProgress;
  } else if (enterAnimation === 'slideRight') {
    const translateX = interpolate(fadeInProgress, [0, 1], [100, 0]);
    transform = `translateX(${translateX}px)`;
    opacity = fadeInProgress;
  }

  // Layout styles
  const horizontalStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '40px',
  };

  const verticalStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center',
  };

  return (
    <AbsoluteFill
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px',
      }}
    >
      <div
        style={{
          ...(layout === 'horizontal' ? horizontalStyle : verticalStyle),
          opacity,
          transform,
        }}
      >
        {/* Icon */}
        <div
          style={{
            fontSize: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 600,
              color: colors.text.primary,
              margin: 0,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: '28px',
              color: colors.text.secondary,
              margin: 0,
            }}
          >
            {description}
          </p>
        </div>

        {/* Optional image */}
        {image && (
          <Img
            src={image}
            style={{
              maxWidth: '800px',
              maxHeight: '400px',
              objectFit: 'contain',
              borderRadius: '12px',
            }}
          />
        )}
      </div>
    </AbsoluteFill>
  );
};

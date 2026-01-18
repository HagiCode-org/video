// TrashBin - Trash bin visual with debris collection and lid animation
import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { colors } from '../../utils/theme';

export interface TrashBinProps {
  position: { x: number; y: number };
  collectFrom: number;
  lidCloseAt: number;
}

export const TrashBin: React.FC<TrashBinProps> = ({
  position,
  collectFrom,
  lidCloseAt,
}) => {
  const frame = useCurrentFrame();

  // Bin shake effect when debris enters
  const collectPhase = frame >= collectFrom && frame < lidCloseAt;
  const shakeIntensity = collectPhase
    ? interpolate(frame, [collectFrom, lidCloseAt - 20], [1, 0], {
        extrapolateRight: 'clamp',
      })
    : 0;

  const shakeX = collectPhase
    ? Math.sin(frame * 2) * 3 * shakeIntensity
    : 0;

  // Success checkmark appears after lid closes
  const checkmarkOpacity = interpolate(frame, [lidCloseAt, lidCloseAt + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const checkmarkScale = interpolate(frame, [lidCloseAt, lidCloseAt + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Debris count indicator
  const debrisCount = Math.min(6, Math.floor(Math.max(0, (frame - collectFrom) / 10)));
  const fillLevel = interpolate(debrisCount, [0, 6], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) translateX(${shakeX}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Success indicator */}
      {checkmarkOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            fontSize: '48px',
            opacity: checkmarkOpacity,
            transform: `scale(${checkmarkScale})`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: colors.success.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 30px ${colors.success.glow}`,
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '32px',
              color: colors.success.primary,
              fontWeight: 600,
            }}
          >
            已解决
          </span>
        </div>
      )}

      {/* Trash bin emoji */}
      <div
        style={{
          fontSize: '120px',
          position: 'relative',
          filter: `drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))`,
        }}
      >
        🗑️
      </div>

      {/* Fill level indicator */}
      {collectPhase && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            width: '80px',
            height: '60px',
            borderRadius: '0 0 8px 8px',
            background: 'rgba(239, 68, 68, 0.3)',
            overflow: 'hidden',
            border: '1px solid rgba(239, 68, 68, 0.5)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: `${fillLevel * 100}%`,
              background: `linear-gradient(to top, ${colors.error.primary}, ${colors.warning.primary})`,
              transition: 'height 0.3s ease',
            }}
          />
        </div>
      )}
    </div>
  );
};

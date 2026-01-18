// Animation utilities for Remotion
import {
  spring,
  interpolate,
  Easing,
  useCurrentFrame,
} from 'remotion';

/**
 * Fade in animation
 * @param frame - Current frame
 * @param delay - Delay in frames before animation starts
 * @param duration - Duration of animation in frames
 */
export const fadeIn = (
  frame: number,
  delay: number,
  duration: number
): number => {
  return interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    { extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );
};

/**
 * Fade out animation
 * @param frame - Current frame
 * @param delay - Delay in frames before animation starts
 * @param duration - Duration of animation in frames
 */
export const fadeOut = (
  frame: number,
  delay: number,
  duration: number
): number => {
  return interpolate(
    frame,
    [delay, delay + duration],
    [1, 0],
    { extrapolateRight: 'clamp', easing: Easing.in(Easing.quad) }
  );
};

/**
 * Slide up animation using spring physics
 * @param frame - Current frame
 * @param fps - Frames per second
 */
export const slideUp = (frame: number, fps: number): number => {
  return spring({
    frame: frame - fps,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });
};

/**
 * Scale animation using spring physics
 * @param frame - Current frame
 * @param fps - Frames per second
 */
export const scaleIn = (frame: number, fps: number): number => {
  return spring({
    frame: frame - fps,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.8,
    },
  });
};

/**
 * Custom hook for fade in animation
 * @param delay - Delay in frames
 * @param duration - Duration in frames
 */
export const useFadeIn = (delay: number = 0, duration: number = 30) => {
  const frame = useCurrentFrame();
  return fadeIn(frame, delay, duration);
};

/**
 * Custom hook for slide up animation
 * @param delay - Delay in frames
 */
export const useSlideUp = (delay: number = 0) => {
  const frame = useCurrentFrame();
  return slideUp(frame - delay, 30);
};

/**
 * Custom hook for scale animation
 * @param delay - Delay in frames
 */
export const useScaleIn = (delay: number = 0) => {
  const frame = useCurrentFrame();
  return scaleIn(frame - delay, 30);
};

/**
 * Easing functions
 */
export const easings = {
  smooth: Easing.inOut(Easing.cubic),
  bouncy: Easing.out(Easing.elastic(1.2)),
  sharp: Easing.inOut(Easing.ease),
};

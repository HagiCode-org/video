// Enhanced Theme configuration for Hagicode product video
// Based on UI/UX Pro Max best practices
// Style: Glassmorphism + Dark Mode (OLED) + AI-Native UI

export const colors = {
  // Primary - AI Purple gradient (enhanced for visual impact)
  primary: {
    from: '#7C3AED', // Enhanced Violet 600
    to: '#A78BFA',   // Soft Violet 400
    glow: 'rgba(124, 58, 237, 0.4)',
  },

  // Secondary - Cyan to Blue gradient
  secondary: {
    from: '#06b6d4', // Cyan 500
    to: '#3b82f6',   // Blue 500
    glow: 'rgba(6, 182, 212, 0.3)',
  },

  // Accent - For CTAs (enhanced amber)
  accent: {
    primary: '#f59e0b', // Amber 500
    glow: 'rgba(245, 158, 11, 0.4)',
  },

  // Success state
  success: {
    primary: '#10b981', // Emerald 500
    glow: 'rgba(16, 185, 129, 0.3)',
  },

  // Background colors (OLED-optimized dark mode)
  background: {
    dark: '#0a0a0a',      // Pure black for OLED
    medium: '#0f172a',    // Slate 900
    light: '#1e293b',     // Slate 800
    glass: 'rgba(30, 41, 59, 0.7)', // Glass effect base
    glassLight: 'rgba(255, 255, 255, 0.05)', // Light glass highlight
  },

  // Text colors (WCAG AAA compliant)
  text: {
    primary: '#f1f5f9',   // Slate 100
    secondary: '#cbd5e1', // Slate 300
    muted: '#64748b',     // Slate 500
    accent: '#a78bfa',    // Violet 400
  },

  // Border colors
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    accent: 'rgba(124, 58, 237, 0.3)',
  },

  // Aurora gradient colors
  aurora: {
    purple: '#7C3AED',
    blue: '#3B82F6',
    cyan: '#06B6D4',
    pink: '#EC4899',
  },
};

export const typography = {
  // Font families - Tech Startup pairing
  fontFamily: {
    heading: 'Space Grotesk, Inter, system-ui, sans-serif',
    body: 'DM Sans, Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, Fira Code, monospace',
  },

  // Font sizes (relative to 1080p height)
  fontSize: {
    // Titles
    hero: '140px',       // Enhanced hero size
    title: '120px',
    subtitle: '72px',    // Increased for impact
    sectionTitle: '56px', // Enhanced section title

    // Body
    bodyLarge: '40px',   // Increased for readability
    body: '32px',
    bodySmall: '28px',

    // Caption
    caption: '24px',
  },

  // Font weights
  fontWeight: {
    bold: 700,
    semibold: 600,
    medium: 500,
    normal: 400,
  },

  // Line heights for better readability
  lineHeight: {
    tight: 1.1,
    normal: 1.3,
    relaxed: 1.5,
  },
};

export const spacing = {
  // Relative to 1920x1080 canvas
  padding: {
    page: '100px',      // Increased for breathing room
    section: '80px',
    element: '48px',
  },

  gap: {
    large: '80px',
    medium: '48px',
    small: '32px',
    tiny: '16px',
  },
};

// Glassmorphism effects
export const glass = {
  // Glass card effect
  card: {
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  // Glass panel (lighter)
  panel: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
};

// Animation easing functions (per UX best practices)
export const easing = {
  // Enter animations - ease-out for smooth entrance
  enter: [0.16, 1, 0.3, 1], // cubic-bezier

  // Exit animations - ease-in for smooth exit
  exit: [0.4, 0, 1, 1],

  // Bounce for emphasis
  bounce: [0.34, 1.56, 0.64, 1],

  // Smooth default
  smooth: [0.25, 0.1, 0.25, 1],
};

// Animation durations (in frames at 30fps)
export const duration = {
  instant: 0,
  fast: 6,       // 200ms
  normal: 9,     // 300ms
  slow: 15,      // 500ms
  slower: 24,    // 800ms
};

// Glow effects
export const glow = {
  subtle: '0 0 20px rgba(124, 58, 237, 0.3)',
  medium: '0 0 40px rgba(124, 58, 237, 0.4)',
  strong: '0 0 60px rgba(124, 58, 237, 0.5)',
  cyan: '0 0 30px rgba(6, 182, 212, 0.4)',
};

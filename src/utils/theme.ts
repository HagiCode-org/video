// Enhanced Theme configuration for Hagicode Update Bulletin
// Based on UI/UX Pro Max best practices
// Style: Dark Mode (OLED) + Tech Startup + Soft UI Evolution

export const colors = {
  // Primary - Blue gradient (Developer Tool standard)
  primary: {
    from: '#3B82F6',    // Blue 500 - Tech standard
    to: '#60A5FA',      // Blue 400 - Lighter variant
    glow: 'rgba(59, 130, 246, 0.4)',
  },

  // Secondary - Purple gradient (AI innovation)
  secondary: {
    from: '#8B5CF6',    // Violet 500 - AI/Innovation
    to: '#A78BFA',      // Violet 400
    glow: 'rgba(139, 92, 246, 0.3)',
  },

  // Accent - Cyan for vibrancy
  accent: {
    primary: '#06B6D4', // Cyan 500
    glow: 'rgba(6, 182, 212, 0.4)',
  },

  // Aurora gradient colors for special effects
  aurora: {
    pink: '#EC4899',   // Pink 500
    purple: '#A855F7', // Purple 500
    blue: '#3B82F6',   // Blue 500
  },

  // Success state (Emerald - better contrast)
  success: {
    primary: '#10B981', // Emerald 500
    glow: 'rgba(16, 185, 129, 0.3)',
  },

  // Warning state (Amber)
  warning: {
    primary: '#F59E0B', // Amber 500
    glow: 'rgba(245, 158, 11, 0.3)',
  },

  // Error state (Red)
  error: {
    primary: '#EF4444', // Red 500
    glow: 'rgba(239, 68, 68, 0.3)',
  },

  // Background colors (OLED-optimized dark mode)
  background: {
    dark: '#0F172A',       // Slate 900 - Primary background
    medium: '#1E293B',     // Slate 800 - Cards/panels
    light: '#334155',      // Slate 700 - Hover states
    glass: 'rgba(30, 41, 59, 0.8)', // Glass effect base
    glassLight: 'rgba(255, 255, 255, 0.05)', // Light glass highlight
  },

  // Text colors (WCAG AAA compliant)
  text: {
    primary: '#F1F5F9',    // Slate 100 - Main text
    secondary: '#CBD5E1',  // Slate 300 - Secondary text
    muted: '#64748B',      // Slate 500 - Disabled/muted
    accent: '#60A5FA',     // Blue 400 - Links/highlights
  },

  // Border colors (enhanced visibility)
  border: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(255, 255, 255, 0.15)',
    accent: 'rgba(59, 130, 246, 0.3)', // Blue accent
  },

  // Tag colors by category
  tag: {
    feature: {
      bg: 'rgba(59, 130, 246, 0.15)',
      text: '#60A5FA',
      border: 'rgba(59, 130, 246, 0.3)',
      label: '功能',
    },
    bugfix: {
      bg: 'rgba(239, 68, 68, 0.15)',
      text: '#F87171',
      border: 'rgba(239, 68, 68, 0.3)',
      label: '修复',
    },
    improvement: {
      bg: 'rgba(16, 185, 129, 0.15)',
      text: '#34D399',
      border: 'rgba(16, 185, 129, 0.3)',
      label: '改进',
    },
    ai: {
      bg: 'rgba(139, 92, 246, 0.15)',
      text: '#A78BFA',
      border: 'rgba(139, 92, 246, 0.3)',
      label: 'AI',
    },
    ui: {
      bg: 'rgba(236, 72, 153, 0.15)',
      text: '#F472B6',
      border: 'rgba(236, 72, 153, 0.3)',
      label: 'UI',
    },
    performance: {
      bg: 'rgba(245, 158, 11, 0.15)',
      text: '#FBBF24',
      border: 'rgba(245, 158, 11, 0.3)',
      label: '性能',
    },
    other: {
      bg: 'rgba(100, 116, 139, 0.15)',
      text: '#94A3B8',
      border: 'rgba(100, 116, 139, 0.3)',
      label: '其他',
    },
  },
};

export const typography = {
  // Font families - AlibabaPuHuiTi-3 (Chinese-optimized) with fallbacks
  fontFamily: {
    heading: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
    body: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
  },

  // Font sizes (relative to 1080p height)
  fontSize: {
    // Titles
    hero: '120px',
    title: '100px',
    subtitle: '64px',
    sectionTitle: '52px',

    // Body
    bodyLarge: '36px',
    body: '30px',
    bodySmall: '26px',

    // Caption
    caption: '22px',
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
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const spacing = {
  // Relative to 1920x1080 canvas
  padding: {
    page: '100px',
    section: '80px',
    element: '48px',
  },

  gap: {
    large: '64px',
    medium: '40px',
    small: '24px',
    tiny: '16px',
  },
};

// Glassmorphism effects (Soft UI Evolution)
export const glass = {
  // Glass card effect
  card: {
    background: 'rgba(30, 41, 59, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },

  // Glass panel (lighter)
  panel: {
    background: 'rgba(51, 65, 85, 0.6)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
  },
};

// Animation easing functions (UX best practices)
export const easing = {
  // Enter animations - ease-out for smooth entrance
  enter: [0.16, 1, 0.3, 1],

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
  subtle: '0 0 20px rgba(59, 130, 246, 0.3)',
  medium: '0 0 40px rgba(59, 130, 246, 0.4)',
  strong: '0 0 60px rgba(59, 130, 246, 0.5)',
  cyan: '0 0 30px rgba(6, 182, 212, 0.4)',
  purple: '0 0 30px rgba(139, 92, 246, 0.4)',
};

// ============================================
// VIDEO-SPECIFIC TYPOGRAPHY (Mobile Optimized)
// ============================================
// Optimized for 1920x1080 canvas, readable on mobile devices
// Uses larger font sizes with proper spacing for video content

export const videoTypography = {
  // Safe zone padding (keep content within visible area)
  safeZone: {
    horizontal: '80px',  // 4% of 1920px
    vertical: '60px',     // 5.5% of 1080px
  },

  // Font family - AlibabaPuHuiTi-3 (Chinese-optimized) with fallbacks
  fontFamily: {
    heading: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
    body: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
  },

  // Font sizes optimized for video & mobile readability
  // Based on minimum 48px for body text (16px at 1080p scale)
  fontSize: {
    // Hero/Title sizes (60-120px)
    hero: '140px',        // Main brand/title - dominates screen
    title: '110px',       // Section titles
    subtitle: '70px',     // Secondary titles

    // Body text (48-60px minimum for mobile readability)
    bodyLarge: '60px',    // Primary body text
    body: '52px',         // Standard body text
    bodySmall: '44px',    // Supporting text (still readable)

    // UI elements
    button: '48px',       // Button/call-to-action text
    caption: '38px',      // Caption/annotation text
    label: '42px',        // Form labels, small descriptors
  },

  // Font weights for video (bolder for better readability)
  fontWeight: {
    display: 800,         // Hero titles
    heading: 700,         // Section headings
    subheading: 600,      // Subtitles
    body: 500,            // Body text (medium weight for readability)
    label: 400,           // Labels, captions
  },

  // Line heights optimized for video
  lineHeight: {
    tight: 1.1,           // Hero titles
    normal: 1.3,          // Body text
    relaxed: 1.5,         // Multi-line content
  },
};

// ============================================
// VIDEO LAYOUT SYSTEM
// ============================================
// Grid and spacing optimized for fixed 1920x1080 canvas

export const videoLayout = {
  // Canvas dimensions
  canvas: {
    width: 1920,
    height: 1080,
  },

  // Safe zone padding (keep content within visible area)
  safeZone: {
    horizontal: '80px',  // 4% of 1920px
    vertical: '60px',     // 5.5% of 1080px
  },

  // Safe content area (excluding safe zones)
  contentArea: {
    width: 1760,    // 1920 - 80*2
    height: 960,    // 1080 - 60*2
  },

  // Grid system for video layouts
  grid: {
    columns: 12,
    gap: '40px',
    maxWidth: '1600px', // Keep content centered and contained
  },

  // Section spacing
  section: {
    verticalGap: '80px',
    horizontalGap: '60px',
  },

  // Component-specific sizes
  component: {
    cardMinWidth: '400px',
    cardMaxWidth: '500px',
    buttonMinHeight: '80px',
    buttonMinWidth: '200px',
  },

  // Maximum line length for readability
  maxLineLength: {
    body: '1200px',    // ~60 characters at 52px
    title: '1400px',   // ~14 characters at 110px
  },
};

// ============================================
// VIDEO ANIMATION SYSTEM
// ============================================
// Optimized easing and durations for 60fps video

export const videoAnimation = {
  // Easing functions optimized for video smoothness
  easing: {
    // Smooth enter (ease-out)
    enter: [0.16, 1, 0.3, 1],

    // Smooth exit (ease-in)
    exit: [0.4, 0, 1, 1],

    // Emphatic bounce
    bounce: [0.34, 1.56, 0.64, 1],

    // Natural movement
    smooth: [0.25, 0.1, 0.25, 1],

    // Quick snappy
    snappy: [0.18, 0.9, 0.32, 1],

    // Slow dramatic
    dramatic: [0.7, 0, 0.3, 1],
  },

  // Duration presets (in frames at 60fps)
  duration: {
    instant: 0,
    snappy: 6,        // 100ms - Quick UI feedback
    fast: 12,          // 200ms - Standard UI
    normal: 18,        // 300ms - Smooth transitions
    slow: 30,          // 500ms - Emphasized animations
    slower: 48,        // 800ms - Dramatic reveals
    crawl: 72,         // 1.2s - Very slow animations
  },

  // Delays for staggered animations
  stagger: {
    instant: 0,
    tight: 3,          // 50ms between elements
    normal: 6,         // 100ms between elements
    relaxed: 10,       // 166ms between elements
    slow: 15,          // 250ms between elements
  },
};

// ============================================
// MOBILE-FIRST VIDEO CONSTRAINTS
// ============================================
// Rules to ensure content is readable on all devices

export const mobileConstraints = {
  // Minimum font sizes (scaled to 1920x1080)
  minFontSize: {
    body: '48px',      // Minimum for readable body text
    title: '64px',     // Minimum for titles
    subtitle: '52px',  // Minimum for subtitles
  },

  // Maximum line length for readability
  maxLineLength: {
    body: '1200px',    // ~60 characters at 52px
    title: '1400px',   // ~14 characters at 110px
  },

  // Touch target sizes (for any interactive elements)
  minTouchTarget: {
    size: '80px',      // 44px minimum at mobile scale
  },

  // Spacing to prevent overflow
  minPadding: {
    container: '40px',
    card: '32px',
    button: '24px',
  },
};

// ============================================
// MOBILE VIDEO TYPOGRAPHY (1080x1920 Vertical)
// ============================================
// Optimized for vertical mobile video format with larger proportional fonts

export const mobileVideoTypography = {
  // Safe zone padding for 1080x1920 vertical canvas
  safeZone: {
    horizontal: '60px',  // 5.5% of 1080px (narrower)
    vertical: '80px',     // 4% of 1920px (taller)
  },

  // Font family - AlibabaPuHuiTi-3 (Chinese-optimized) with fallbacks
  fontFamily: {
    heading: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
    body: '"AlibabaPuHuiTi-3", system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif',
  },

  // Font sizes optimized for 1080x1920 vertical video
  // Larger proportional to canvas width for mobile readability
  fontSize: {
    // Hero/Title sizes (140-160px) - larger relative to 1080px width
    hero: '160px',        // Main brand/title - dominates screen (14.8% of width)
    title: '120px',       // Section titles (11.1% of width)
    subtitle: '76px',     // Secondary titles

    // Body text (48-60px) - minimum for mobile readability
    bodyLarge: '60px',    // Primary body text (5.6% of width)
    body: '52px',         // Standard body text (4.8% of width)
    bodySmall: '46px',    // Supporting text (4.3% of width)

    // UI elements
    button: '50px',       // Button/call-to-action text
    caption: '40px',      // Caption/annotation text
    label: '44px',        // Form labels, small descriptors
  },

  // Font weights for mobile video (bolder for better readability on small screens)
  fontWeight: {
    display: 800,         // Hero titles
    heading: 700,         // Section headings
    subheading: 600,      // Subtitles
    body: 500,            // Body text (medium weight for readability)
    label: 400,           // Labels, captions
  },

  // Line heights optimized for vertical video
  lineHeight: {
    tight: 1.1,           // Hero titles
    normal: 1.3,          // Body text
    relaxed: 1.5,         // Multi-line content
  },
};

// ============================================
// MOBILE VIDEO LAYOUT SYSTEM (1080x1920)
// ============================================
// Grid and spacing optimized for vertical mobile video format

export const mobileVideoLayout = {
  // Canvas dimensions for mobile (vertical format)
  canvas: {
    width: 1080,
    height: 1920,
  },

  // Safe zone padding for 1080x1920 vertical canvas
  safeZone: {
    horizontal: '60px',  // 5.5% of 1080px (narrower than desktop)
    vertical: '80px',     // 4% of 1920px (taller than desktop)
  },

  // Safe content area (excluding safe zones)
  contentArea: {
    width: 960,    // 1080 - 60*2
    height: 1760,  // 1920 - 80*2
  },

  // Grid system for vertical video layouts (single column)
  grid: {
    columns: 1,           // Single column for mobile
    gap: '32px',          // Tighter vertical spacing
    maxWidth: '960px',    // Full width minus safe zones
  },

  // Section spacing for vertical layout
  section: {
    verticalGap: '48px',   // Smaller vertical gaps
    horizontalGap: '40px', // Reduced horizontal spacing
  },

  // Component-specific sizes for mobile
  component: {
    cardMinWidth: '400px',  // Full-width cards
    cardMaxWidth: '960px',  // Max available width
    buttonMinHeight: '88px', // Larger touch target
    buttonMinWidth: '240px',
  },

  // Maximum line length for readability on narrow canvas
  maxLineLength: {
    body: '860px',    // ~35 characters at 52px (narrower)
    title: '960px',   // ~8 characters at 120px
  },
};

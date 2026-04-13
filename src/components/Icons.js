import React from 'react';

const Icon = ({ children, size = 24, stroke = 'currentColor', strokeWidth = 1.5, fill = 'none', className = '', style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon ${className}`}
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
  >
    {children}
  </svg>
);

// === Tab Bar Icons ===

export const IconPill = (props) => (
  <Icon {...props}>
    <path d="M10.5 1.5l-8 8a4.95 4.95 0 0 0 7 7l8-8a4.95 4.95 0 0 0-7-7z" />
    <path d="M6.5 10.5l4-4" opacity="0.4" />
  </Icon>
);

export const IconDroplet = (props) => (
  <Icon {...props}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </Icon>
);

export const IconGrid = (props) => (
  <Icon {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </Icon>
);

export const IconUtensils = (props) => (
  <Icon {...props}>
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
  </Icon>
);

export const IconSmile = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
  </Icon>
);

export const IconCalendar = (props) => (
  <Icon {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

export const IconBook = (props) => (
  <Icon {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" opacity="0.4" />
    <line x1="8" y1="11" x2="13" y2="11" opacity="0.4" />
  </Icon>
);

// === Medication Icons ===

export const IconCapsule = (props) => (
  <Icon {...props}>
    <path d="M10.5 1.5l-8 8a4.95 4.95 0 0 0 7 7l8-8a4.95 4.95 0 0 0-7-7z" />
    <path d="M6.5 10.5l4-4" opacity="0.4" />
  </Icon>
);

export const IconTablet = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <line x1="3.6" y1="9" x2="20.4" y2="9" opacity="0.4" />
  </Icon>
);

export const IconSun = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </Icon>
);

export const IconLeaf = (props) => (
  <Icon {...props}>
    <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" opacity="0.4" />
  </Icon>
);

export const IconZap = (props) => (
  <Icon {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </Icon>
);

export const IconGem = (props) => (
  <Icon {...props}>
    <path d="M6 3h12l4 6-10 13L2 9z" />
    <path d="M2 9h20" opacity="0.4" />
    <path d="M12 22L9 9l3-6 3 6z" opacity="0.4" />
  </Icon>
);

export const IconShield = (props) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" opacity="0.4" />
  </Icon>
);

export const IconFish = (props) => (
  <Icon {...props}>
    <path d="M6.5 12c3-6 10-7 15-4-5 3-12 2-15 4z" />
    <path d="M6.5 12c3 6 10 7 15 4-5-3-12-2-15-4z" />
    <path d="M2.5 12L6.5 8v8z" />
    <circle cx="17" cy="12" r="0.5" fill="currentColor" stroke="none" />
  </Icon>
);

// === Symptom Icons ===

export const IconEye = (props) => (
  <Icon {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const IconDizzy = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16c-1.5 0-2.5-.5-3-1.5" />
    <path d="M8 9l2 2m0-2L8 11" strokeWidth="1.5" />
    <path d="M14 9l2 2m0-2l-2 2" strokeWidth="1.5" />
  </Icon>
);

export const IconCircleDot = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);

export const IconScratch = (props) => (
  <Icon {...props}>
    <path d="M8 4c0 0 3 2 3 6s-3 6-3 6" />
    <path d="M12 4c0 0 3 2 3 6s-3 6-3 6" />
    <path d="M16 4c0 0 3 2 3 6s-3 6-3 6" />
    <line x1="4" y1="20" x2="20" y2="20" opacity="0.4" />
  </Icon>
);

export const IconThermometer = (props) => (
  <Icon {...props}>
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" stroke="none" opacity="0.4" />
  </Icon>
);

export const IconHeartPulse = (props) => (
  <Icon {...props}>
    <path d="M19.5 12.6l-7.5 7.9-7.5-7.9A5 5 0 0 1 12 5.6a5 5 0 0 1 7.5 7z" />
    <path d="M5 12h3l2-3 3 6 2-3h4" strokeWidth="1.5" />
  </Icon>
);

export const IconDroplets = (props) => (
  <Icon {...props}>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05C11 9.57 7 4 7 4S3 9.57 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M17 20.3c2.2 0 4-1.83 4-4.05C21 13.57 17 8 17 8s-4 5.57-4 8.25c0 2.22 1.8 4.05 4 4.05z" />
  </Icon>
);

export const IconFrown = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" />
  </Icon>
);

export const IconWind = (props) => (
  <Icon {...props}>
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2" />
    <path d="M12.59 19.41A2 2 0 1 0 14 16H2" />
    <path d="M17.73 7.73A2.5 2.5 0 1 1 19.5 12H2" />
  </Icon>
);

export const IconArrowDown = (props) => (
  <Icon {...props}>
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
    <line x1="5" y1="5" x2="19" y2="5" opacity="0.3" />
  </Icon>
);

export const IconMoon = (props) => (
  <Icon {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Icon>
);

export const IconAlertTriangle = (props) => (
  <Icon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2" />
  </Icon>
);

export const IconDropletOff = (props) => (
  <Icon {...props}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    <line x1="7" y1="17" x2="17" y2="7" opacity="0.4" />
  </Icon>
);

// === Food Checker Icons ===

export const IconCheckCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);

export const IconAlertCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" />
  </Icon>
);

export const IconXCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </Icon>
);

export const IconCamera = (props) => (
  <Icon {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </Icon>
);

export const IconCpu = (props) => (
  <Icon {...props}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" opacity="0.4" />
    <line x1="9" y1="1" x2="9" y2="4" />
    <line x1="15" y1="1" x2="15" y2="4" />
    <line x1="9" y1="20" x2="9" y2="23" />
    <line x1="15" y1="20" x2="15" y2="23" />
    <line x1="20" y1="9" x2="23" y2="9" />
    <line x1="20" y1="15" x2="23" y2="15" />
    <line x1="1" y1="9" x2="4" y2="9" />
    <line x1="1" y1="15" x2="4" y2="15" />
  </Icon>
);

export const IconChefHat = (props) => (
  <Icon {...props}>
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V17a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
    <line x1="6" y1="17" x2="18" y2="17" opacity="0.4" />
    <line x1="5" y1="21" x2="19" y2="21" />
  </Icon>
);

export const IconClock = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);

export const IconLightbulb = (props) => (
  <Icon {...props}>
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
  </Icon>
);

// === Wellbeing Icons ===

export const IconSparkles = (props) => (
  <Icon {...props}>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75z" opacity="0.5" />
  </Icon>
);

export const IconActivity = (props) => (
  <Icon {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </Icon>
);

export const IconBrain = (props) => (
  <Icon {...props}>
    <path d="M9.5 2A5.5 5.5 0 0 0 5 8.5c0 .6.08 1.11.23 1.62A5 5 0 0 0 8 19h1" />
    <path d="M14.5 2A5.5 5.5 0 0 1 19 8.5c0 .6-.08 1.11-.23 1.62A5 5 0 0 1 16 19h-1" />
    <path d="M12 2v20" opacity="0.3" />
  </Icon>
);

// === Education Icons ===

export const IconDna = (props) => (
  <Icon {...props}>
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M9 22c1.8-4 6.2-4 8 0" opacity="0.5" />
    <path d="M15 2c-1.8 4-6.2 4-8 0" opacity="0.5" />
    <path d="M2 9c6.667 6 13.333 0 20 6" />
  </Icon>
);

export const IconHeart = (props) => (
  <Icon {...props}>
    <path d="M19.5 12.6l-7.5 7.9-7.5-7.9A5 5 0 0 1 12 5.6a5 5 0 0 1 7.5 7z" />
  </Icon>
);

export const IconMicroscope = (props) => (
  <Icon {...props}>
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 1 0 0-14" />
    <path d="M9 14h2" />
    <path d="M9 2v6" />
    <path d="M13 2v6" />
    <rect x="8" y="2" width="6" height="6" rx="1" opacity="0.3" />
  </Icon>
);

export const IconStethoscope = (props) => (
  <Icon {...props}>
    <path d="M4.8 2.62A2 2 0 0 0 3 4.5v5a6 6 0 0 0 12 0v-5a2 2 0 0 0-1.8-1.88" />
    <circle cx="18" cy="16" r="2" />
    <path d="M18 14v-1.5a5.5 5.5 0 0 0-5.5-5.5" opacity="0.4" />
    <path d="M18 18v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1" />
    <line x1="5" y1="1" x2="5" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
  </Icon>
);

export const IconLotus = (props) => (
  <Icon {...props}>
    <path d="M12 21c-3-3-7-5-7-10a7 7 0 0 1 14 0c0 5-4 7-7 10z" />
    <path d="M12 7v7" opacity="0.3" />
    <path d="M9 11c1.5 1 4.5 1 6 0" opacity="0.3" />
  </Icon>
);

// === Utility Icons ===

export const IconCheck = (props) => (
  <Icon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </Icon>
);

export const IconStar = (props) => (
  <Icon {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Icon>
);

export const IconDropletSmall = (props) => (
  <Icon {...props}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </Icon>
);

// === Drink Icons ===

export const IconCup = (props) => (
  <Icon {...props}>
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="2" x2="6" y2="4" opacity="0.4" />
    <line x1="10" y1="2" x2="10" y2="4" opacity="0.4" />
    <line x1="14" y1="2" x2="14" y2="4" opacity="0.4" />
  </Icon>
);

export const IconCoffee = (props) => (
  <Icon {...props}>
    <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <path d="M6 1v3" opacity="0.4" />
    <path d="M10 1v3" opacity="0.4" />
  </Icon>
);

export const IconGlass = (props) => (
  <Icon {...props}>
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M6 3h12l-1.5 14h-9L6 3z" />
    <path d="M7 7h10" opacity="0.3" />
  </Icon>
);

export const IconPlus = (props) => (
  <Icon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
);

export const IconTrash = (props) => (
  <Icon {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </Icon>
);

export const IconShoppingCart = (props) => (
  <Icon {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </Icon>
);

export const IconHome = (props) => (
  <Icon {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </Icon>
);

export const IconTrendingUp = (props) => (
  <Icon {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </Icon>
);

export const IconAward = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </Icon>
);

export const IconTarget = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" opacity="0.4" />
    <circle cx="12" cy="12" r="2" />
  </Icon>
);

export const IconUser = (props) => (
  <Icon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
);

export const IconEdit = (props) => (
  <Icon {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </Icon>
);

export const IconLock = (props) => (
  <Icon {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Icon>
);

export const IconLogout = (props) => (
  <Icon {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </Icon>
);

export const IconChevronLeft = (props) => (
  <Icon {...props}>
    <polyline points="15 18 9 12 15 6" />
  </Icon>
);

export const IconChevronRight = (props) => (
  <Icon {...props}>
    <polyline points="9 6 15 12 9 18" />
  </Icon>
);

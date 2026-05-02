/**
 * Theme data file — the ONLY file you need to edit to add, remove, or change a theme.
 *
 * Structure:
 *   vars      — colors and surfaces only, no shadows
 *   glowVars  — shadow/glow values for this palette; injected only when glow is ON
 *
 * App.vue reads this and injects CSS custom properties onto <html> at runtime,
 * so there are zero [data-theme] blocks anywhere in CSS.
 */

export interface ThemeVars {
  "--bg": string;
  "--surface": string;
  "--surface2": string;
  "--primary": string;
  "--secondary": string;
  "--accent": string;
  "--text": string;
  "--text-dim": string;
  "--game-bg": string;
  "--grid-line": string;
  "--tile-bg": string;
  "--tile-border-color": string;
  "--tile-text-color": string;
  "--tile-hint-border": string;
  "--tile-hint-text": string;
  "--tile-hint-bg": string;
  "--tile-answer-border": string;
  "--tile-answer-text": string;
  "--tile-answer-bg": string;
  "--hint-size": string;
  "--hint-color": string;
  "--hint-weight": string;
  "--hint-style": string;
}

export interface Theme {
  id: string;
  name: string;
  label: string;
  description: string;
  dark: boolean;
  primary: string;
  secondary: string;
  vars: ThemeVars;
}

export const themes: Theme[] = [
  // ─── CYBER ───────────────────────────────────────────────────────────────
  {
    id: "cyber",
    name: "Cyber",
    label: "CYBER",
    description: "Dark · cyan primary · yellow secondary",
    dark: true,
    primary: "#00E5FF",
    secondary: "#FFD600",
    vars: {
      "--bg": "#0A0A0F",
      "--surface": "#12121A",
      "--surface2": "#1A1A26",
      "--primary": "#00E5FF",
      "--secondary": "#FFD600",
      "--accent": "#FF6D00",
      "--text": "#FFFFFF",
      "--text-dim": "rgba(255,255,255,0.55)",
      "--game-bg": "#0A0A0F",
      "--grid-line": "rgba(0,229,255,0.04)",
      "--tile-bg": "#12121A",
      "--tile-border-color": "rgba(255,255,255,0.12)",
      "--tile-text-color": "#ffffff",
      "--tile-hint-border": "#00E5FF",
      "--tile-hint-text": "#00E5FF",
      "--tile-hint-bg": "rgba(0,229,255,0.1)",
      "--tile-answer-border": "rgba(255,214,0,0.5)",
      "--tile-answer-text": "#FFD600",
      "--tile-answer-bg": "rgba(255,214,0,0.06)",
      "--hint-size": "1.55rem",
      "--hint-color": "rgba(255,255,255,0.72)",
      "--hint-weight": "500",
      "--hint-style": "italic",
    },
  },

  // ─── EMBER ───────────────────────────────────────────────────────────────
  {
    id: "ember",
    name: "Ember",
    label: "EMBER",
    description: "Dark · fire orange primary · red secondary",
    dark: true,
    primary: "#FF6D00",
    secondary: "#FF1744",
    vars: {
      "--bg": "#0D0A07",
      "--surface": "#1A1008",
      "--surface2": "#241708",
      "--primary": "#FF6D00",
      "--secondary": "#FF1744",
      "--accent": "#FFD600",
      "--text": "#FFF8F0",
      "--text-dim": "rgba(255,248,240,0.55)",
      "--game-bg": "#0D0A07",
      "--grid-line": "rgba(255,109,0,0.05)",
      "--tile-bg": "#1A1008",
      "--tile-border-color": "rgba(255,248,240,0.1)",
      "--tile-text-color": "#FFF8F0",
      "--tile-hint-border": "#FF6D00",
      "--tile-hint-text": "#FF6D00",
      "--tile-hint-bg": "rgba(255,109,0,0.12)",
      "--tile-answer-border": "rgba(255,23,68,0.55)",
      "--tile-answer-text": "#FF1744",
      "--tile-answer-bg": "rgba(255,23,68,0.07)",
      "--hint-size": "1.55rem",
      "--hint-color": "rgba(255,248,240,0.72)",
      "--hint-weight": "500",
      "--hint-style": "italic",
    },
  },

  // ─── VOID ────────────────────────────────────────────────────────────────
  {
    id: "void",
    name: "Void",
    label: "VOID",
    description: "Dark · violet primary · pink secondary",
    dark: true,
    primary: "#C040FB",
    secondary: "#FF4081",
    vars: {
      "--bg": "#080010",
      "--surface": "#110020",
      "--surface2": "#1A002E",
      "--primary": "#C040FB",
      "--secondary": "#FF4081",
      "--accent": "#00E5FF",
      "--text": "#F5EEFF",
      "--text-dim": "rgba(245,238,255,0.55)",
      "--game-bg": "#080010",
      "--grid-line": "rgba(192,64,251,0.05)",
      "--tile-bg": "#110020",
      "--tile-border-color": "rgba(245,238,255,0.1)",
      "--tile-text-color": "#F5EEFF",
      "--tile-hint-border": "#C040FB",
      "--tile-hint-text": "#C040FB",
      "--tile-hint-bg": "rgba(192,64,251,0.12)",
      "--tile-answer-border": "rgba(255,64,129,0.55)",
      "--tile-answer-text": "#FF4081",
      "--tile-answer-bg": "rgba(255,64,129,0.07)",
      "--hint-size": "1.55rem",
      "--hint-color": "rgba(245,238,255,0.72)",
      "--hint-weight": "500",
      "--hint-style": "italic",
    },
  },

  // ─── CLEAN ───────────────────────────────────────────────────────────────
  {
    id: "clean",
    name: "Clean",
    label: "CLEAN",
    description: "Light · indigo primary · coral secondary",
    dark: false,
    primary: "#3D5AFE",
    secondary: "#FF5252",
    vars: {
      "--bg": "#F2F4F8",
      "--surface": "#FFFFFF",
      "--surface2": "#E8ECF4",
      "--primary": "#3D5AFE",
      "--secondary": "#FF5252",
      "--accent": "#00BFA5",
      "--text": "#0D1117",
      "--text-dim": "#5C6680",
      "--game-bg": "#F2F4F8",
      "--grid-line": "rgba(61,90,254,0.05)",
      "--tile-bg": "#FFFFFF",
      "--tile-border-color": "#D0D6E8",
      "--tile-text-color": "#0D1117",
      "--tile-hint-border": "#3D5AFE",
      "--tile-hint-text": "#3D5AFE",
      "--tile-hint-bg": "rgba(61,90,254,0.07)",
      "--tile-answer-border": "rgba(255,82,82,0.5)",
      "--tile-answer-text": "#FF5252",
      "--tile-answer-bg": "rgba(255,82,82,0.05)",
      "--hint-size": "1.55rem",
      "--hint-color": "#3A3F55",
      "--hint-weight": "500",
      "--hint-style": "italic",
    },
  },
];

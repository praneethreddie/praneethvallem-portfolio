
import React from "react";

// Stylized arc as “brand” (abstracted from hair/cheek curve)
function PersonalAccent({ color = "#a3a3a3" }: { color?: string }) {
  return (
    <path
      d="M22,51 Q32,58 46,39"
      stroke={color}
      strokeWidth="2.4"
      fill="none"
      opacity="0.28"
      strokeLinecap="round"
    />
  );
}

// Uplyft: Speech bubble + stylized arc + spark
function UplyftLogo() {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      aria-label="Uplyft Logo"
      fill="none"
    >
      <rect
        x="12"
        y="18"
        width="34"
        height="18"
        rx="8"
        fill="#7c3aed"
        stroke="#6d28d9"
        strokeWidth="2"
      />
      <circle
        cx="17"
        cy="38"
        r="7"
        fill="#d1c4f6"
        stroke="#6d28d9"
        strokeWidth="1.5"
      />
      {/* Personal accent */}
      <PersonalAccent color="#8b5cf6" />
      {/* Tiny spark */}
      <polygon
        points="41,16.5 42,18.5 44.2,19 42.8,20.1 43.2,22.3 41,21.2 38.8,22.3 39.2,20.1 37.8,19 40,18.5"
        fill="#facc15"
      />
    </svg>
  );
}

// Aircursor: Arrow, wind arc, and “personal” arc
function AircursorLogo() {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      aria-label="Aircursor Logo"
      fill="none"
    >
      <polygon
        points="14,15 50,34 36,40 47,54 40,54 30,38 17,50"
        fill="#99f6e4"
        stroke="#0d9488"
        strokeWidth="2"
      />
      {/* Motion swirl */}
      <path
        d="M41 41 Q56 48 38 57"
        stroke="#14b8a6"
        strokeWidth="2"
        fill="none"
        opacity="0.66"
        strokeLinecap="round"
      />
      {/* Personal accent */}
      <PersonalAccent color="#22d3ee" />
    </svg>
  );
}

// Dreamer: Crescent moon (offset circle), glowing star, and “personal” arc
function DreamerLogo() {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      aria-label="Dreamer Logo"
      fill="none"
    >
      <circle cx="36" cy="33" r="16" fill="#fef08a" />
      <path
        d="M52 32
           a16 16 0 1 1-22-13
           a11 11 0 1 0 22 13"
        fill="#232336"
      />
      {/* Personal accent */}
      <PersonalAccent color="#fde68a" />
      {/* Dream star */}
      <polygon
        points="56,20 57,22 59.5,22.5 57.5,24 58,26.5 56,25 54,26.5 54.5,24 52.5,22.5 55,22"
        fill="#fffde4"
      />
      <circle cx="56.7" cy="20.9" r="1.2" fill="#fef9c3" />
    </svg>
  );
}

// Promtly AI: Bot-themed logo (simple robot head, lively colors)
function BotLogo() {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      aria-label="Bot Logo"
      fill="none"
    >
      {/* Head */}
      <rect x="12" y="18" width="40" height="28" rx="14" fill="#38bdf8" stroke="#2563eb" strokeWidth="2" />
      {/* Eyes */}
      <circle cx="24" cy="32" r="4" fill="#fff" />
      <circle cx="40" cy="32" r="4" fill="#fff" />
      {/* Smile */}
      <path d="M24 39 Q32 46 40 39" stroke="#2563eb" strokeWidth="2" fill="none" />
      {/* Antenna */}
      <rect x="29.4" y="10" width="5" height="10" rx="2" fill="#818cf8" />
      <circle cx="32" cy="9.5" r="2.5" fill="#fbbf24" />
      {/* Cheek (personal accent) */}
      <PersonalAccent color="#fbbf24" />
      {/* Decorative dots */}
      <circle cx="48" cy="28" r="1" fill="#fde68a" />
      <circle cx="16" cy="28" r="1" fill="#fde68a" />
    </svg>
  );
}

// Unhmegle: Video camera with connection dots
function UnhmogleLogo() {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      aria-label="Unhmegle Logo"
      fill="none"
    >
      {/* Camera body */}
      <rect x="14" y="22" width="32" height="20" rx="4" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
      {/* Lens */}
      <circle cx="30" cy="32" r="6" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
      <circle cx="30" cy="32" r="3" fill="#475569" />
      {/* Recording indicator */}
      <circle cx="40" cy="26" r="2" fill="#fbbf24" />
      {/* Connection dots (representing strangers connecting) */}
      <circle cx="18" cy="14" r="3" fill="#06b6d4" />
      <circle cx="46" cy="14" r="3" fill="#a855f7" />
      <path d="M21 15 L28 22" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />
      <path d="M43 15 L36 22" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2,2" />
      {/* Personal accent */}
      <PersonalAccent color="#f87171" />
    </svg>
  );
}

/**
 * Main logo switcher for projects. Falls back to UplyftLogo.
 */
export default function Project3DLogo({ project }: { project: string }) {
  let Logo: React.ReactNode;

  if (project === "unhmegle") Logo = <UnhmogleLogo />;
  else if (project === "uplyft") Logo = <UplyftLogo />;
  else if (project === "aircursor") Logo = <AircursorLogo />;
  else if (project === "Dreamer") Logo = <DreamerLogo />;
  else if (project.toLowerCase() === "promtly ai") Logo = <BotLogo />;
  else Logo = <UplyftLogo />;

  return (
    <span
      style={{
        width: 64,
        height: 64,
        display: "inline-block",
        verticalAlign: "middle",
      }}
      aria-label={`${project} logo`}
    >
      {Logo}
    </span>
  );
}

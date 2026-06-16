import React from 'react'

export const JacketIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="jacketGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff2b3b" />
        <stop offset="100%" stopColor="#b30010" />
      </linearGradient>
    </defs>
    <path d="M9 7L13 5h6l4 2l1.5 8l-2 9l-13-1l-2-8z" fill="url(#jacketGrad)" />
    <path d="M12 5c0-1.5 1-3 4-3s4 1.5 4 3c0 .5-.5 1-1.5 1.5s-2.5 1-2.5 1s-1.5-.5-2.5-1S12 5.5 12 5z" fill="#90000a" />
    <path d="M9 7l-4 8l2.5 9l2.5-3l-2.5-6l2.5-5" fill="#d91626" />
    <path d="M23 7l4 8l-2.5 9l-2.5-3l2.5-6l-2.5-5" fill="#d91626" />
    <line x1="16" y1="5" x2="16" y2="23" stroke="#111" strokeWidth="1.2" />
    <line x1="16" y1="5" x2="16" y2="23" stroke="#fff" strokeWidth="0.8" strokeDasharray="1 1" />
    <line x1="11" y1="14" x2="11.5" y2="17" stroke="#111" strokeWidth="1" />
    <line x1="21" y1="14" x2="20.5" y2="17" stroke="#111" strokeWidth="1" />
    <polygon points="12.5,10 13.5,8.5 14,10" fill="#fff" />
    <polygon points="13.5,10 14.2,9 15,10" fill="#fff" />
  </svg>
)

export const HoodieIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a3a3a" />
        <stop offset="100%" stopColor="#151515" />
      </linearGradient>
    </defs>
    <path d="M8 8L12 6h8l4 2l1.5 8l-1.5 8l-12-0.5l-1.5-7.5z" fill="url(#hoodieGrad)" />
    <path d="M12 6c0-1.8 1.5-3.5 4-3.5s4 1.7 4 3.5c0 .5-.5 1-1.5 1.5s-2.5 1-2.5 1s-1.5-.5-2.5-1S12 6.5 12 6z" fill="#111" />
    <path d="M14.5 7v3.5M17.5 7v4" stroke="#fff" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M8 8l-4.5 8l2 8l3-3l-2.5-6" fill="#2d2d2d" />
    <path d="M24 8l4.5 8l-2 8l-3-3l2.5-6" fill="#2d2d2d" />
    <path d="M11 18h10l-1.5-4.5h-7z" fill="#222" stroke="#444" strokeWidth="0.5" />
  </svg>
)

export const PantsIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="pantsGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2b4c7e" />
        <stop offset="100%" stopColor="#162a4a" />
      </linearGradient>
    </defs>
    <path d="M8 4c0-0.5.5-1 1-1h14c0.5 0 1 .5 1 1l-1.5 24c0 .5-.5 1-1 1h-4.5c-.3 0-.5-.3-.5-.6V13h-1v15.4c0 .3-.2.6-.5.6H10.5c-.5 0-1-.5-1-1L8 4z" fill="url(#pantsGrad)" />
    <rect x="8.5" y="4.5" width="15" height="1.5" fill="#111" rx="0.5" />
    <rect x="14.5" y="4" width="3" height="2.5" fill="#ffd700" rx="0.5" />
    <path d="M9 15h5v2H9.2zm13.8 0h-5v2h4.8z" fill="#162a4a" opacity="0.5" />
    <path d="M9.5 7l3.5 1.5M22.5 7l-3.5 1.5" stroke="#111" strokeWidth="0.8" opacity="0.6" />
  </svg>
)

export const CapIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a07c5d" />
        <stop offset="100%" stopColor="#6e5037" />
      </linearGradient>
    </defs>
    <path d="M6 19c0-8 4-13 10-13s10 5 10 13v1H6v-1z" fill="url(#capGrad)" />
    <circle cx="16" cy="5" r="2" fill="#583f2a" />
    <rect x="5" y="18" width="22" height="5.5" rx="1.5" fill="#583f2a" />
    <path d="M8 18v5.5M11 18v5.5M14 18v5.5M17 18v5.5M20 18v5.5M23 18v5.5M26 18v5.5" stroke="#483320" strokeWidth="0.8" />
    <rect x="14" y="20.5" width="4" height="2" fill="#fff" rx="0.5" />
    <polygon points="15,22 16,21 17,22" fill="#e30613" />
  </svg>
)

export const HikingShoesIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="hikingGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8c7a6b" />
        <stop offset="100%" stopColor="#4a3e35" />
      </linearGradient>
    </defs>
    <path d="M5 22l3-11c1-1 3-2 7-2h4c3 0 5 1 7 4l3 5c1 1.5.5 3-1 3.5l-9 1l-14-.5z" fill="url(#hikingGrad)" />
    <path d="M25 18l3 4c.5 1-.2 2.5-1.5 2.5l-4.5-.5l1-6z" fill="#222" />
    <rect x="5" y="24" width="22" height="3" rx="1.5" fill="#111" />
    <path d="M7 27v1h2v-1zm4 0v1h2v-1zm4 0v1h2v-1zm4 0v1h2v-1zm4 0v1h2v-1z" fill="#ffcc00" />
    <path d="M11 11l5 4M13 10l5 4M15 9l5 4" stroke="#ff2b3b" strokeWidth="1" strokeLinecap="round" />
    <path d="M5 22c-.5-1-1.5-1-2-.5s-.5 1.5.5 2z" fill="#ff2b3b" />
  </svg>
)

export const MountaineeringBootsIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="bootGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffd700" />
        <stop offset="100%" stopColor="#ccac00" />
      </linearGradient>
    </defs>
    <path d="M7 21V7c0-1 1.5-2 3.5-2h4l1 3l-1.5 6L16 21z" fill="#111" />
    <path d="M8 21l3-7c1-1 3-1.5 6-1.5h4c2.5 0 4.5.5 6 3l3 5c1 1.5 0 3-1.5 3.5l-9 1l-11.5-1z" fill="url(#bootGrad)" />
    <path d="M7 22l1.5-6h13.5l6 6.5l-9 .5z" fill="#222" opacity="0.85" />
    <rect x="5.5" y="23.5" width="22.5" height="3" rx="1" fill="#333" />
    <rect x="5" y="25" width="23.5" height="2" rx="0.5" fill="#111" />
    <path d="M11 7.5h3.5M10 10h4.5M10.5 13H15" stroke="#e30613" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export const TrailRunningShoesIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#007bff" />
        <stop offset="100%" stopColor="#0056b3" />
      </linearGradient>
    </defs>
    <path d="M5 22l2.5-9c1-1 3-2 6-2h5c2.5 0 4.5.8 6 3l4.5 5c1 1.2.3 2.5-1 3l-11.5 1.5l-11.5-1.5z" fill="url(#trailGrad)" />
    <ellipse cx="14" cy="15" rx="4" ry="2" fill="#0056b3" opacity="0.6" />
    <ellipse cx="20" cy="17" rx="3" ry="1.5" fill="#0056b3" opacity="0.6" />
    <path d="M4.5 23.5c3 1.5 20 1.5 23.5 0l-.5 2H5z" fill="#c5ff00" />
    <path d="M4.5 25.5h23.5v1.5H4.5z" fill="#222" />
    <path d="M6 27l.5 1h1.5l-.5-1zm4 0l.5 1h1.5l-.5-1zm4 0l.5 1h1.5l-.5-1zm4 0l.5 1h1.5l-.5-1zm4 0l.5 1h1.5l-.5-1z" fill="#222" />
    <path d="M12 12l3 3M14 11l3 3" stroke="#c5ff00" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export const EverydayShoesIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="everydayGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#dcdcdc" />
        <stop offset="100%" stopColor="#a9a9a9" />
      </linearGradient>
    </defs>
    <path d="M5 21l2-8c.5-1 2-2 5.5-2h6.5c2 0 4 .5 5.5 2.5l4 4.5c.8 1 .2 2.5-1 3l-10.5 1L5 21z" fill="url(#everydayGrad)" />
    <rect x="4.5" y="22" width="23.5" height="3.5" rx="1.5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="0.5" />
    <path d="M6 18c4-.5 12-.5 16 0" stroke="#888" strokeWidth="0.5" strokeDasharray="1 1" />
    <line x1="11" y1="12" x2="16" y2="16" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
    <line x1="13" y1="11.5" x2="18" y2="15.5" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
  </svg>
)

export const ApproachShoesIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="appGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff4500" />
        <stop offset="100%" stopColor="#cc3700" />
      </linearGradient>
    </defs>
    <path d="M5 21.5l2.5-9.5c1-1 3-2 6.5-2h4c2 0 4 .8 5.5 3l4.5 5c1 1.2.3 2.5-1 3l-10.5 1.5L5 21.5z" fill="url(#appGrad)" />
    <path d="M22 17l5.5 2.5c.8.5.5 2-.5 2l-6.5-.5z" fill="#111" />
    <rect x="4.5" y="22.5" width="23" height="2.5" rx="1" fill="#222" />
    <path d="M12 12l2 2.5M14 11.5l2 2.5M16 11l2 2.5M18 10.5l2 2.5" stroke="#111" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
)

export const BackpackIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e30613" />
        <stop offset="100%" stopColor="#8c020a" />
      </linearGradient>
    </defs>
    <path d="M9 9c0-2.5 2.5-4 7-4s7 1.5 7 4l-1 2H10l-1-2z" fill="#b3030d" />
    <rect x="9" y="11" width="14" height="15" rx="2.5" fill="url(#bpGrad)" />
    <rect x="15" y="11" width="2" height="13" fill="#111" />
    <path d="M15 13h2M15 16h2M15 19h2M15 22h2" stroke="#fff" strokeWidth="0.8" />
    <line x1="7" y1="14" x2="9" y2="14" stroke="#111" strokeWidth="1.5" />
    <line x1="7" y1="19" x2="9" y2="19" stroke="#111" strokeWidth="1.5" />
    <line x1="23" y1="14" x2="25" y2="14" stroke="#111" strokeWidth="1.5" />
    <line x1="23" y1="19" x2="25" y2="19" stroke="#111" strokeWidth="1.5" />
    <path d="M11 26c0 1.5 1.5 2 5 2s5-.5 5-2" stroke="#555" strokeWidth="1.5" fill="none" />
  </svg>
)

export const AvalancheIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="avGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ff7a00" />
        <stop offset="100%" stopColor="#d35400" />
      </linearGradient>
    </defs>
    <rect x="8" y="5" width="16" height="22" rx="3" fill="url(#avGrad)" />
    <path d="M8 8v16M24 8v16" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="14" y="2" width="4" height="3.5" fill="#222" />
    <rect x="11" y="9" width="10" height="7" rx="1" fill="#1b1c1e" />
    <path d="M16 11l-2.5 3h1.5v1.5h2V14h1.5z" fill="#00ff00" />
    <circle cx="16" cy="21.5" r="2.5" fill="#e30613" />
    <circle cx="16" cy="21.5" r="1.5" fill="#fff" />
  </svg>
)

export const ClimbingIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <path d="M16 4c-2.5 0-4.5 1.5-4.5 3.5s2 3.5 4.5 3.5s3.5-1.5 3.5-3.5S18.5 4 16 4z" fill="#95a5a6" />
    <path d="M16 5.2c-1.3 0-2.5 1-2.5 2.3s1.2 2.3 2.5 2.3s2-1 2-2.3S17.3 5.2 16 5.2z" fill="#fff" />
    <path d="M18.5 6.5l-2.5 1" stroke="#333" strokeWidth="0.8" />
    <rect x="15" y="11" width="2" height="10" fill="#2c3e50" />
    <rect x="15.25" y="12" width="1.5" height="8" fill="#e30613" />
    <path d="M16 21c-2.5 0-4.5 1.5-4.5 3.5s2 3.5 4.5 3.5s3.5-1.5 3.5-3.5s-1-3.5-3.5-3.5z" fill="#7f8c8d" />
    <path d="M16 22.2c-1.3 0-2.5 1-2.5 2.3s1.2 2.3 2.5 2.3s2-1 2-2.3S17.3 22.2 16 22.2z" fill="#fff" />
    <path d="M18.5 23.5l-2.5 1" stroke="#333" strokeWidth="0.8" />
  </svg>
)

export const SleepingBagIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="sbGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00a8a8" />
        <stop offset="100%" stopColor="#005b5b" />
      </linearGradient>
    </defs>
    <path d="M16 4c-4.5 0-6.5 2.5-6.5 6.5v15c0 2.5 3 3.5 6.5 3.5s6.5-1 6.5-3.5v-15c0-4-2-6.5-6.5-6.5z" fill="url(#sbGrad)" />
    <path d="M16 4c-3.5 0-5 2-5 5s2 4 5 4s5-1 5-4s-1.5-5-5-5z" fill="#2d3748" />
    <ellipse cx="16" cy="8.5" rx="2.5" ry="3.5" fill="#f7fafc" />
    <circle cx="16" cy="8.5" r="1.5" fill="#333" />
    <path d="M10 13c3 1.5 9 1.5 12 0M9.5 17c3 1.5 9 1.5 12 0M9.5 21c3 1.5 9 1.5 12 0M10 25c3 1.5 9 1.5 12 0" stroke="#fff" strokeWidth="0.8" opacity="0.25" fill="none" />
    <line x1="16" y1="12.5" x2="16" y2="28" stroke="#1a202c" strokeWidth="1.2" />
  </svg>
)

export const AccessoriesIcon = () => (
  <svg viewBox="0 0 32 32" className="w-9 h-9 select-none drop-shadow-sm">
    <defs>
      <linearGradient id="acGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#444" />
        <stop offset="100%" stopColor="#1a1a1a" />
      </linearGradient>
    </defs>
    <rect x="6" y="9" width="20" height="14" rx="2.5" fill="url(#acGrad)" />
    <rect x="6.5" y="9.5" width="19" height="13" rx="2" fill="none" stroke="#555" strokeWidth="0.8" />
    <line x1="6" y1="12" x2="26" y2="12" stroke="#e30613" strokeWidth="1.2" />
    <rect x="22" y="11" width="2" height="3" fill="#ccc" rx="0.5" />
    <line x1="23" y1="14" x2="23" y2="17" stroke="#e30613" strokeWidth="0.8" />
    <path d="M6 16c4 1.5 16 1.5 20 0" stroke="#444" strokeWidth="0.8" fill="none" />
    <path d="M5 13v6M27 13v6" stroke="#e30613" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)

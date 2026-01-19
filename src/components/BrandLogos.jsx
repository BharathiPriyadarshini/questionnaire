import React from "react";

// Helper to standardise props
const IconWrapper = ({ size = 24, className = "", children, viewBox = "0 0 24 24" }) => (
    <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        {children}
    </svg>
);

export const TataLogo = (props) => (
    <IconWrapper {...props}>
        {/* Stylized T on blue background usually, here monochrome */}
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" strokeWidth="1.5" />
        <path d="M8 9.5h8" strokeWidth="2" />
        <path d="M12 9.5v7" strokeWidth="2" />
        <path d="M11 16.5h2" strokeWidth="2" />{/* Serif base */}
    </IconWrapper>
);

export const HyundaiLogo = (props) => (
    <IconWrapper {...props}>
        <ellipse cx="12" cy="12" rx="10" ry="7" strokeWidth="1.5" />
        {/* Slanted H */}
        <path d="M7.5 9l1.5 6" strokeWidth="2" />
        <path d="M16.5 9l-1.5 6" strokeWidth="2" />
        <path d="M8.2 12h7.6" strokeWidth="2" /> {/* Crossbar slants slightly usually but straight for simple icon */}
    </IconWrapper>
);

export const MarutiLogo = (props) => (
    <IconWrapper {...props}>
        {/* Suzuki S Logo */}
        <path d="M5 8h9l-4 8h9" strokeWidth="2" />
        <path d="M5.5 8l4-5h9" strokeWidth="1.5" strokeOpacity="0.5" />{/* Top part hint */}
        <path d="M9.5 16l-4 5h9" strokeWidth="1.5" strokeOpacity="0.5" />{/* Bottom part hint */}
        {/* Simplified S shape */}
        <path d="M17 7L7 17" strokeWidth="2" />
    </IconWrapper>
);

// Better Suzuki S
export const SuzukiLogo = (props) => (
    <IconWrapper {...props}>
        <path d="M18.5 6h-11L4 12h11L18.5 6z" fill="currentColor" stroke="none" />
        <path d="M20 12H9l-3.5 6h11L20 12z" fill="currentColor" stroke="none" />
    </IconWrapper>
);


export const KiaLogo = (props) => (
    <IconWrapper {...props}>
        <ellipse cx="12" cy="12" rx="11" ry="6" strokeWidth="1.5" />
        <path d="M6 10v4" />
        <path d="M6 12h2l2-2" />
        <path d="M8 12l2 2" />
        <path d="M12 10v4" />
        <path d="M15 14l0.5-4l0.5 4" />
        <path d="M15.5 13h1" />
    </IconWrapper>
);

export const MahindraLogo = (props) => (
    <IconWrapper {...props}>
        {/* Twin Peaks */}
        <path d="M3 16C3 16 5 8 12 8C19 8 21 16 21 16" strokeWidth="1.5" />
        <path d="M12 8L9 15" strokeWidth="1.5" />
        <path d="M12 8L15 15" strokeWidth="1.5" />
        <path d="M2 12c0-4 1-8 4-9" stroke="none" fill="currentColor" opacity="0.1" />{/* Filler */}
    </IconWrapper>
);

export const HondaLogo = (props) => (
    <IconWrapper {...props}>
        {/* Rounded Rect */}
        <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.5" />
        {/* H */}
        <path d="M8 8v8" strokeWidth="2" />
        <path d="M16 8v8" strokeWidth="2" />
        <path d="M8 12h8" strokeWidth="2" />
    </IconWrapper>
);

export const ToyotaLogo = (props) => (
    <IconWrapper {...props}>
        <ellipse cx="12" cy="12" rx="10" ry="7" strokeWidth="1.5" />
        <ellipse cx="12" cy="9" rx="6" ry="3.5" strokeWidth="1.5" />
        <path d="M12 10v8" strokeWidth="1.5" />
        <path d="M8 9c0 4 8 4 8 0" strokeWidth="1.5" />{/* Vertical loop approximation */}
    </IconWrapper>
);

export const SkodaLogo = (props) => (
    <IconWrapper {...props}>
        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
        {/* Winged Arrow hint */}
        <path d="M16 8l-6 10l5-4" fill="none" />
        <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
        <path d="M8 12h8" />
        <path d="M12 12v-5" />
    </IconWrapper>
);

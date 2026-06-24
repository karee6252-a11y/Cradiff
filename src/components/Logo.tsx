type LogoProps = {
  className?: string;
  variant?: "white" | "burgundy" | "auto";
  showText?: boolean;
};

export default function Logo({
  className = "",
  variant = "auto",
  showText = true,
}: LogoProps) {
  const markColor =
    variant === "white"
      ? "#ffffff"
      : variant === "burgundy"
        ? "#8b1a1a"
        : "currentColor";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 72"
        className="h-9 w-auto shrink-0"
        role="img"
        aria-label="Cardiff International School crest"
      >
        <defs>
          <linearGradient id="cis-crest" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b1a1a" />
            <stop offset="100%" stopColor="#4a0707" />
          </linearGradient>
        </defs>
        {/* Shield */}
        <path
          d="M32 2 60 11V36c0 18-12 28-28 34C16 64 4 54 4 36V11L32 2Z"
          fill={variant === "auto" ? "url(#cis-crest)" : markColor}
          opacity={variant === "white" ? 0.16 : 1}
        />
        <path
          d="M32 2 60 11V36c0 18-12 28-28 34C16 64 4 54 4 36V11L32 2Z"
          fill="none"
          stroke={variant === "white" ? "#ffffff" : "#d9a3a3"}
          strokeOpacity={variant === "white" ? 0.9 : 0.45}
          strokeWidth="1.4"
        />
        {/* Star */}
        <path
          d="M32 12.5l1.9 4.3 4.7.5-3.5 3.1 1 4.6-4.1-2.4-4.1 2.4 1-4.6-3.5-3.1 4.7-.5L32 12.5Z"
          fill="#ffffff"
          opacity="0.92"
        />
        {/* Monogram */}
        <text
          x="32"
          y="50"
          textAnchor="middle"
          fontFamily="var(--font-poppins), sans-serif"
          fontWeight="700"
          fontSize="18"
          letterSpacing="0.5"
          fill="#ffffff"
        >
          CIS
        </text>
      </svg>
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className="font-heading text-[15px] font-bold tracking-wide"
            style={{ color: variant === "burgundy" ? "#8b1a1a" : undefined }}
          >
            Cardiff
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--muted)]">
            Int&apos;l School
          </span>
        </span>
      )}
    </span>
  );
}

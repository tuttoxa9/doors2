interface MaestroIconProps {
  className?: string
  size?: number
}

export default function MaestroIcon({ className = "", size = 40 }: MaestroIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Base of the wardrobe */}
      <rect
        x="4"
        y="8"
        width="32"
        height="28"
        rx="2"
        fill="currentColor"
        stroke="none"
      />

      {/* Left door */}
      <rect
        x="6"
        y="10"
        width="13"
        height="24"
        rx="1"
        fill="white"
        fillOpacity="0.9"
      />

      {/* Right door */}
      <rect
        x="21"
        y="10"
        width="13"
        height="24"
        rx="1"
        fill="white"
        fillOpacity="0.9"
      />

      {/* Left door handle */}
      <circle
        cx="17"
        cy="22"
        r="1.5"
        fill="currentColor"
      />

      {/* Right door handle */}
      <circle
        cx="23"
        cy="22"
        r="1.5"
        fill="currentColor"
      />

      {/* Top decorative line */}
      <rect
        x="4"
        y="6"
        width="32"
        height="2"
        rx="1"
        fill="currentColor"
      />

      {/* Bottom base */}
      <rect
        x="2"
        y="36"
        width="36"
        height="2"
        rx="1"
        fill="currentColor"
      />

      {/* Decorative corner elements */}
      <path
        d="M4 8L8 4L12 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      <path
        d="M36 8L32 4L28 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

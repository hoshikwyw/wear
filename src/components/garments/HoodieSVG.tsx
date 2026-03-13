interface Props {
  color?: string
  className?: string
  overlayText?: string
  textColor?: string
  textSize?: 'sm' | 'md' | 'lg'
}

const textSizes = { sm: 12, md: 16, lg: 22 }

function HoodieSVG({ color = '#e8e4e0', className, overlayText, textColor = '#fff', textSize = 'md' }: Props) {
  return (
    <svg viewBox="0 0 200 250" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Hood */}
      <path
        d="M68 28 C60 8, 100 -4, 100 -4 C100 -4, 140 8, 132 28"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Body */}
      <path
        d="M68 28 L56 28 L28 48 L18 72 L40 80 L50 62 L50 238 L150 238 L150 62 L160 80 L182 72 L172 48 L144 28 L132 28 C126 40, 74 40, 68 28 Z"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Pocket */}
      <rect
        x="72" y="150" width="56" height="36" rx="4"
        fill="none"
        stroke="rgba(0,0,0,0.05)"
        strokeWidth="1.2"
      />
      {/* Center line */}
      <line x1="100" y1="28" x2="100" y2="238" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
      {/* Drawstrings */}
      <line x1="94" y1="34" x2="90" y2="62" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      <line x1="106" y1="34" x2="110" y2="62" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
      {overlayText && (
        <text
          x="100"
          y="130"
          textAnchor="middle"
          fill={textColor}
          fontSize={textSizes[textSize]}
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >
          {overlayText}
        </text>
      )}
    </svg>
  )
}

export default HoodieSVG

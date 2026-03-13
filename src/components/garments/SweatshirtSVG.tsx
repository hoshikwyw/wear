interface Props {
  color?: string
  className?: string
  overlayText?: string
  textColor?: string
  textSize?: 'sm' | 'md' | 'lg'
}

const textSizes = { sm: 12, md: 16, lg: 22 }

function SweatshirtSVG({ color = '#e8e4e0', className, overlayText, textColor = '#fff', textSize = 'md' }: Props) {
  return (
    <svg viewBox="0 0 220 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M80 14 C85 4, 135 4, 140 14 L154 14 L180 34 L198 108 L180 114 L162 48 L162 228 L58 228 L58 48 L40 114 L22 108 L40 34 L66 14 Z"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Crew neckline — ribbed */}
      <path
        d="M80 14 C85 24, 135 24, 140 14"
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="2"
      />
      {/* Waist band */}
      <line x1="58" y1="220" x2="162" y2="220" stroke="rgba(0,0,0,0.04)" strokeWidth="2" />
      {/* Cuffs */}
      <line x1="38" y1="110" x2="22" y2="106" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
      <line x1="182" y1="110" x2="198" y2="106" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
      {overlayText && (
        <text
          x="110"
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

export default SweatshirtSVG

interface Props {
  color?: string
  className?: string
  overlayText?: string
  textColor?: string
  textSize?: 'sm' | 'md' | 'lg'
}

const textSizes = { sm: 12, md: 16, lg: 22 }

function LongSleeveSVG({ color = '#e8e4e0', className, overlayText, textColor = '#fff', textSize = 'md' }: Props) {
  return (
    <svg viewBox="0 0 220 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M80 12 C85 4, 135 4, 140 12 L152 12 L178 32 L200 110 L182 116 L160 48 L158 228 L62 228 L60 48 L38 116 L20 110 L42 32 L68 12 Z"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Neckline */}
      <path
        d="M80 12 C85 22, 135 22, 140 12"
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1.5"
      />
      {/* Cuffs */}
      <line x1="36" y1="112" x2="20" y2="108" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
      <line x1="184" y1="112" x2="200" y2="108" stroke="rgba(0,0,0,0.05)" strokeWidth="2" />
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

export default LongSleeveSVG

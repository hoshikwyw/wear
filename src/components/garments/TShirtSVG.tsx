interface Props {
  color?: string
  className?: string
  overlayText?: string
  textColor?: string
  textSize?: 'sm' | 'md' | 'lg'
}

const textSizes = { sm: 12, md: 16, lg: 22 }

function TShirtSVG({ color = '#e8e4e0', className, overlayText, textColor = '#fff', textSize = 'md' }: Props) {
  return (
    <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M70 12 C75 4, 125 4, 130 12 L140 12 L168 30 L180 52 L158 62 L148 46 L148 228 L52 228 L52 46 L42 62 L20 52 L32 30 L60 12 Z"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Neckline */}
      <path
        d="M70 12 C75 22, 125 22, 130 12"
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1.5"
      />
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

export default TShirtSVG

interface Props {
  color?: string
  className?: string
  overlayText?: string
  textColor?: string
  textSize?: 'sm' | 'md' | 'lg'
}

const textSizes = { sm: 10, md: 14, lg: 18 }

function CropTopSVG({ color = '#e8e4e0', className, overlayText, textColor = '#fff', textSize = 'md' }: Props) {
  return (
    <svg viewBox="0 0 200 180" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M66 12 C72 4, 128 4, 134 12 L146 12 L170 30 L182 54 L160 62 L150 44 L150 168 L50 168 L50 44 L40 62 L18 54 L30 30 L54 12 Z"
        fill={color}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Wide neckline */}
      <path
        d="M66 12 C72 24, 128 24, 134 12"
        fill="none"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="1.5"
      />
      {overlayText && (
        <text
          x="100"
          y="100"
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

export default CropTopSVG

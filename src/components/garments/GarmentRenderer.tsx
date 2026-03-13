import type { GarmentType } from '../../types/product'
import TShirtSVG from './TShirtSVG'
import HoodieSVG from './HoodieSVG'
import CropTopSVG from './CropTopSVG'
import LongSleeveSVG from './LongSleeveSVG'
import SweatshirtSVG from './SweatshirtSVG'

interface Props {
  type: GarmentType
  color?: string
  className?: string
  overlayText?: string
  textColor?: string
  textSize?: 'sm' | 'md' | 'lg'
}

const components: Record<GarmentType, typeof TShirtSVG> = {
  'tshirt': TShirtSVG,
  'hoodie': HoodieSVG,
  'crop-top': CropTopSVG,
  'long-sleeve': LongSleeveSVG,
  'sweatshirt': SweatshirtSVG,
}

function GarmentRenderer({ type, ...props }: Props) {
  const Component = components[type]
  return <Component {...props} />
}

export default GarmentRenderer

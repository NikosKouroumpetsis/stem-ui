
import type { PrimitiveProps} from '../../Core/primitive/index'
export type Direction = 'ltr' | 'rtl'
export interface Sizes {
  content: number
  viewport: number
  scrollbar: {
    size: number
    paddingStart: number
    paddingEnd: number
  }
}

export type ScrollType = 'auto' | 'always' | 'scroll' | 'hover'  

export interface BaseScrollAreaProps extends PrimitiveProps {
  type?: ScrollType
  dir?: Direction
  scrollHideDelay?: number
}


export interface BaseScrollAreaViewportProps extends PrimitiveProps {}

export interface BaseScrollAreaCornerProps extends PrimitiveProps {}

export interface BaseScrollAreaScrollbarProps extends PrimitiveProps {
  orientation: 'vertical' | 'horizontal'
  forceMount?: boolean
}

export interface BaseScrollAreaThumbProps extends PrimitiveProps {}
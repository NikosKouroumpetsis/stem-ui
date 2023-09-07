import { type PrimitiveProps } from "../../Core/primitive/index";

export interface BaseArrowProps extends PrimitiveProps {
  /**
   * The width of the arrow in pixels.
   *
   * @default 10
   */
  width?: number;
  /**
   * The height of the arrow in pixels.
   *
   * @default 5
   */
  height?: number;
}

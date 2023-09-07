import { type PrimitiveProps } from "../../Core/primitive/index";
import { Direction, Orientation } from "./utils";

export interface BaseRovingFocusGroupProps extends PrimitiveProps {
  /**
   * The orientation of the group.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   */
  orientation?: Orientation;
  /**
   * The direction of navigation between items.
   */
  dir?: Direction;
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: boolean;
  currentTabStopId?: string | null;
  defaultCurrentTabStopId?: string;
}

export interface BaseRovingFocusItemProps extends PrimitiveProps {
  tabStopId?: string;
  focusable?: boolean;
  active?: boolean;
}

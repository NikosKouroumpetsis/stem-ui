import { type PrimitiveProps } from "../../Core/primitive/index";
import type { DataOrientation, Direction } from "../../Core/shared/types";

export interface BaseTabsProps extends PrimitiveProps {
  defaultValue?: string;
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: DataOrientation;
  /**
   * The direction of navigation between toolbar items.
   */
  dir?: Direction;
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   * */
  activationMode?: "automatic" | "manual";
  modelValue?: string;
}
export type BaseTabsEmits = {
  "update:modelValue": [payload: string];
};

export interface BaseTabsListProps extends PrimitiveProps {
  loop?: boolean;
}

export interface BaseTabsTriggerProps extends PrimitiveProps {
  value: string;
  disabled?: boolean;
}

export interface BaseTabsContentProps extends PrimitiveProps {
  value: string;
  forceMount?: boolean;
}

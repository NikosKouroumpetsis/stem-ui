import type { PrimitiveProps } from "../../Core/primitive/index";
import type { DataOrientation, Direction } from "../../Core/shared/types";
import type { BaseToggleProps } from "../BaseToggle/types";
type TypeEnum = "single" | "multiple";
export interface BaseToggleGroupProps extends PrimitiveProps {
  type?: TypeEnum;
  defaultValue?: string | string[];
  modelValue?: string | string[];
  rovingFocus?: boolean;
  disabled?: boolean;
  orientation?: DataOrientation;
  dir?: Direction;
  loop?: boolean;
}
export type BaseToggleGroupEmits = {
  "update:modelValue": [payload: string];
};

export interface BaseToggleGroupItemProps extends BaseToggleProps {
  /**
   * A string value for the toggle group item. All items within a toggle group should use a unique value.
   */
  value: string;
}

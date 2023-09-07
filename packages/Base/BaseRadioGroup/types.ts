import type { PrimitiveProps } from "../../Core/primitive/index";
import type { DataOrientation, Direction } from "../../Core/shared/types";

export interface BaseRadioProps extends PrimitiveProps {
  id?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
}

export interface BaseRadioGroupProps extends PrimitiveProps {
  modelValue?: string;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  orientation?: DataOrientation;
  dir?: Direction;
  loop?: boolean;
}
export type RadioGroupRootEmits = {
  "update:modelValue": [payload: string];
};

export interface BaseRadioGroupItemProps
  extends Omit<BaseRadioProps, "checked"> {}

export interface BaseRadioGroupIndicatorProps extends PrimitiveProps {}

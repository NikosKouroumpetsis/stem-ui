import { type PrimitiveProps } from "../../Core/primitive/index";

export interface BaseProgressProps extends PrimitiveProps {
  modelValue?: number | null;
  max?: number;
  getValueLabel?: (value: number, max: number) => string;
}
export type BaseProgressEmits = {
  "update:modelValue": [value: string[] | undefined];
  "update:max": [value: number];
};

export interface BaseProgressIndicatorProps extends PrimitiveProps {}

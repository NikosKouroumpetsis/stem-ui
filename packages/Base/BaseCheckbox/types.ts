import { type PrimitiveProps } from "../../Core/primitive/index";

export interface BaseCheckboxProps extends PrimitiveProps {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
}

export type BaseCheckboxEmits = {
  "update:checked": [value: boolean];
};

export interface BaseCheckboxIndicatorProps extends PrimitiveProps {
  forceMount?: boolean;
}

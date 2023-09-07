import { type PrimitiveProps } from "../../Core/primitive/index";

export interface BaseSwitchProps extends PrimitiveProps {
  defaultChecked?: boolean;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
}

export type BaseSwitchEmits = {
  "update:checked": [payload: boolean];
};

export interface BaseSwitchThumbProps extends PrimitiveProps {}

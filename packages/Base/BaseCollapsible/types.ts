import { type PrimitiveProps } from "../../Core/primitive/index";

export interface BaseCollapsibleProps extends PrimitiveProps {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
}

export type BaseCollapsibleEmits = {
  "update:open": [value: boolean];
};

export interface BaseCollapsibleContentProps extends PrimitiveProps {}
export interface BaseCollapsibleTriggerProps extends PrimitiveProps {}

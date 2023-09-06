import type { PrimitiveProps } from "../../Core/primitive/index";

export interface BaseToggleProps extends PrimitiveProps {
  defaultValue?: boolean;
  pressed?: boolean;
  disabled?: boolean;
}

import type { PrimitiveProps } from "../../Core/primitive/index";
import type { DataOrientation } from "../../Core/shared/types";

export interface BaseSeparatorProps extends PrimitiveProps {
  orientation?: DataOrientation;
  decorative?: boolean;
}

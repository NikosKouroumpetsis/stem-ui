import type { PrimitiveProps } from "../../Core/primitive/index";
import type { DataOrientation, Direction } from "../../Core/shared/types";
import type { SliderOrientationPrivateProps } from "./utils";

export interface BaseSliderProps extends PrimitiveProps {
  name?: string;
  defaultValue?: number[];
  modelValue?: number[];
  disabled?: boolean;
  orientation?: DataOrientation;
  dir?: Direction;
  inverted?: boolean;
  min?: number;
  max?: number;
  step?: number;
  minStepsBetweenThumbs?: number;
}
export type BaseSliderEmits = {
  "update:modelValue": [payload: number[] | undefined];
  valueCommit: [payload: number[]];
};

export interface BaseSliderImplProps extends PrimitiveProps {}

export interface BaseSliderRangeProps extends PrimitiveProps {}

export interface BaseSliderThumbImplProps extends PrimitiveProps {
  index: number;
}

export interface BaseSliderThumbProps extends PrimitiveProps {}

export interface BaseSliderTrackProps extends PrimitiveProps {}

export interface BaseSliderVerticalProps
  extends SliderOrientationPrivateProps {}
export interface BaseSliderHorizontalProps
  extends SliderOrientationPrivateProps {
  dir?: Direction;
}

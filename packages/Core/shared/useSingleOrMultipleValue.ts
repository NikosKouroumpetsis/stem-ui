import { watch, Ref, ref } from "vue";
import type { Type } from "./types";

function validateModelValue(
  type: Type,
  modelValue?: string | string[] | undefined
) {
  if (type === "single") {
    if (Array.isArray(modelValue)) {
      console.error(`Invalid prop \`value\` of value \`${modelValue}\` supplied to \`AccordionRoot\`, which type is \`single\`. The \`value\` prop must be:
  - a string
  - \`undefined\`

If you want to use multiple values, use the \`AccordionRoot\` with type \`multiple\`.

Defaulting to \`undefined\`.`);
      return undefined;
    }
  } else if (type === "multiple") {
    if (typeof modelValue === "string" || typeof modelValue === "undefined") {
      console.error(`Invalid prop \`value\` of value \`${modelValue}\` supplied to \`AccordionRoot\`, which type is \`multiple\`. The \`value\` prop must be:
- an array of strings
- empty array (\`[]\`)

If you want to use just one value, use the \`AccordionRoot\` with type \`single\`.

Defaulting to empty array (\`[]\`).`);
      return [];
    }
  }
  return modelValue;
}

function getDefaultValue({ type, defaultValue }: Props) {
  if (type === "multiple") {
    if (Array.isArray(defaultValue)) {
      return defaultValue;
    } else if (defaultValue === undefined) {
      return [];
    } else {
      console.error(
        `Invalid prop \`defaultValue\` of value \`${defaultValue}\` supplied to \`AccordionRoot\`, which type is \`multiple\`. The \`defaultValue\` prop must be:
  - an array of strings
  - empty array (\`[]\`)

If you want to use just one value, use the \`AccordionRoot\` with type \`single\`.

Defaulting to empty array (\`[]\`).`
      );
      return [];
    }
  } else if (type === "single") {
    if (typeof defaultValue === "string") {
      return defaultValue;
    } else if (defaultValue === undefined) {
      return undefined;
    } else {
      console.error(
        `Invalid prop \`defaultValue\` of value \`${defaultValue}\` supplied to \`AccordionRoot\`, which type is \`single\`. The \`defaultValue\` prop must be:
  - a string
  - \`undefined\`

Defaulting to \`undefined\`.`
      );
      return undefined;
    }
  }
}

interface Props {
  modelValue?: string | string[];
  type: Type;
  defaultValue?: string | string[];
}

type EmitType = (
  event: "update:modelValue",
  value: string | string[] | undefined
) => void;

export function useSingleOrMultipleValue<P extends Props>(
  props: P,
  emits: EmitType
) {
  const modelValue: Ref<string | string[] | undefined> = ref(
    getDefaultValue(props)
  );

  watch(
    () => [props.type, props.modelValue],
    ([newType, newModelValue]) => {
      const validatedValue = validateModelValue(
        newType as Type,
        newModelValue as string | string[] | undefined
      );
      if (modelValue.value !== validatedValue) {
        modelValue.value = validatedValue;
        emits("update:modelValue", validatedValue);
      }
    },
    { immediate: true }
  );

  function changeModelValue(value: string) {
    let newValue: string | string[] | undefined;

    if (props.type === "single") {
      newValue = value === modelValue.value ? undefined : value;
    } else {
      const modelValueArray = (modelValue.value as string[]) || [];
      const index = modelValueArray.indexOf(value);
      if (index > -1) {
        modelValueArray.splice(index, 1);
      } else {
        modelValueArray.push(value);
      }
      newValue = [...modelValueArray];
    }

    modelValue.value = newValue;
    emits("update:modelValue", newValue);
  }

  return {
    modelValue,
    changeModelValue,
  };
}

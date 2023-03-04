<template>
  <form @submit="handleSubmit" class="flex flex-col">
    <slot :valid="valid" />
  </form>
</template>

<script lang="ts" setup>
import { provide, reactive, computed, toRaw, type ComputedRef } from "vue";

export interface Field {
  value?: string | number;
  required?: boolean;
  touched?: boolean;
}

export type FormProvider = {
  init: (name: string, field: Field) => void;
  update: (name: string, value?: Field["value"]) => void;
  updateTouched: (name: string, value: boolean) => void;
  form: {
    errors: ComputedRef<{ [key: string]: string | null }>;
    values: { [key: string]: Field };
    valid: boolean;
  };
};

const emit = defineEmits<{
  (event: "submit", values: any): void;
}>();

const formState = reactive<{ [key: string]: Field }>({});

function initField(name: string, field: Field) {
  formState[name] = field;
}

const valid = computed(() => {
  const requiredFields = Object.values<Field>(formState).some(
    (field) => field.required && !field.value
  );
  return !requiredFields;
});

const errors = computed(() => {
  return Object.entries<Field>(formState)
    .filter(([, field]) => field.required)
    .reduce<{ [key: string]: string | null }>((errors, [fieldName, field]) => {
      const hasError = field.required && !field.value;
      return {
        ...errors,
        [fieldName]: hasError ? "Required field" : null,
      };
    }, {});
});

function updateFormState(name: string, value: Field["value"]) {
  formState[name].value = value;
}

function updateFieldTouched(name: string, value: boolean) {
  formState[name].touched = value;
}

function handleSubmit(event: Event) {
  event.preventDefault();

  if (valid.value) {
    const values = Object.entries<Field>(toRaw(formState)).reduce(
      (state, [fieldName, fieldValue]) => ({
        ...state,
        [fieldName]: fieldValue.value,
      }),
      {}
    );
    emit("submit", values);
  }
}

provide<FormProvider>("form-wrapper", {
  init: initField,
  update: updateFormState,
  updateTouched: updateFieldTouched,
  form: {
    values: formState,
    valid: valid.value,
    errors,
  },
});
</script>

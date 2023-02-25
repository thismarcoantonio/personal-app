<template>
  <form @submit="handleSubmit" class="flex flex-col">
    <slot :valid="valid" />
  </form>
</template>

<script lang="ts" setup>
import { provide, reactive, computed, toRaw } from "vue";

export interface Field {
  value?: string;
  required?: boolean;
}

export interface FormProvider {
  state: any;
  init: (name: string, field: Field) => void;
  update: (name: string, value: string) => void;
  form: {
    valid: boolean;
  };
}

const emit = defineEmits<{
  (event: "submit", values: FormProvider["state"]): void;
}>();

const formState = reactive<FormProvider["state"]>({});

function initField(name: string, field: Field) {
  formState[name] = field;
}

const valid = computed(() => {
  const requiredFields = Object.values<Field>(formState).some(
    (field) => field.required && !field.value
  );
  return !requiredFields;
});

function updateFormState(name: string, value: string) {
  formState[name].value = value;
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
  state: formState,
  init: initField,
  update: updateFormState,
  form: {
    valid: valid.value,
  },
});
</script>

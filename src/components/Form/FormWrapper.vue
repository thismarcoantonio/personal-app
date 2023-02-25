<template>
  <form @submit="handleSubmit" class="flex flex-col">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { provide, reactive } from "vue";

export interface FormProvider {
  state: any;
  update: (name: string, value: string) => void;
}

const emit = defineEmits<{
  (event: "submit", values: FormProvider["state"]): void;
}>();

const formState = reactive<FormProvider["state"]>({});

provide("form-wrapper", {
  state: formState,
  update: updateFormState,
});

function updateFormState(name: string, value: string) {
  formState[name] = value;
}

function handleSubmit(event: Event) {
  event.preventDefault();
  emit("submit", { ...formState });
}
</script>

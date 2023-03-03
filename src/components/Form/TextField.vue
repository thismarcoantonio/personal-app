<template>
  <div
    class="relative bg-white border rounded shadow-sm text-sm text-gray-600 focus-within:text-primary-500 focus-within:border-primary-500"
    :class="{ 'border-rose-500': showError }"
  >
    <div
      class="absolute left-3 top-3 transition pl-1 pr-2 pointer-events-none"
      :class="{
        '-translate-y-6 -translate-x-2 scale-90 bg-white': field.value,
      }"
    >
      {{ label }}
      <span v-if="!required" class="text-xs">(optional)</span>
    </div>
    <component
      :is="multiline ? 'textarea' : 'input'"
      @input="handleUpdate"
      @blur="handleBlur"
      type="text"
      class="w-full px-4 py-3 outline-0 bg-transparent text-gray-800 resize-none"
    />
  </div>
  <div :class="[showError ? 'h-8' : 'h-4']" class="transition-height">
    <span v-show="showError" class="text-xs text-rose-500">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, computed } from "vue";
import type { FormProvider } from "@/components/Form/FormWrapper.vue";

const props = defineProps<{
  label: string;
  name: string;
  multiline?: boolean;
  required?: boolean;
}>();

const state = inject<FormProvider>("form-wrapper")!;

const field = computed(() => state.form.values[props.name] ?? {});

const error = computed(() => state.form.errors.value[props.name] ?? null);

const showError = computed(() => error.value && field.value.touched);

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  state.update(props.name, target.value);
}

function handleBlur() {
  state.updateTouched(props.name, true);
}

onMounted(() => {
  state.init(props.name, {
    value: "",
    required: props.required,
  });
});
</script>

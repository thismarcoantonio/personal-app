<template>
  <div
    class="relative mb-4 bg-white border rounded shadow-sm text-sm text-gray-600 focus-within:text-primary-500 focus-within:border-primary-500"
  >
    <div
      class="absolute left-3 top-3 transition pl-1 pr-2 pointer-events-none"
      :class="{
        '-translate-y-6 -translate-x-2 scale-90 bg-white': form.state[name],
      }"
    >
      {{ label }}
      <span v-if="!required" class="text-xs">(optional)</span>
    </div>
    <component
      :is="multiline ? 'textarea' : 'input'"
      @input="handleUpdate"
      type="text"
      class="w-full px-4 py-3 outline-0 bg-transparent text-gray-800 resize-none"
    />
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import type { FormProvider } from "@/components/Form/FormWrapper.vue";

const props = defineProps<{
  label: string;
  name: string;
  multiline?: boolean;
  required?: boolean;
}>();

const form = inject<FormProvider>("form-wrapper")!;

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  form.update(props.name, target.value);
}
</script>

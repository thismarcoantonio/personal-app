<template>
  <div
    class="relative bg-white border rounded shadow-sm text-sm text-gray-600 focus-within:text-primary-500 focus-within:border-primary-500"
    :class="{ 'border-rose-500': error }"
    v-bind="$attrs"
  >
    <div
      v-if="label"
      class="absolute left-3 top-3 transition pl-1 pr-2 pointer-events-none"
      :class="{
        '-translate-y-6 -translate-x-2 scale-90 bg-white': value,
      }"
    >
      {{ label }}
      <span v-if="!required" class="text-xs">(optional)</span>
    </div>
    <slot />
  </div>
  <div :class="[error ? 'h-10' : 'h-4']" class="transition-height">
    <span v-show="error" class="text-xs text-rose-500">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import type { Field } from "@/components/Form/FormWrapper.vue";

defineProps<{
  value?: Field["value"];
  error?: string;
  label?: string;
  required?: boolean;
}>();
</script>

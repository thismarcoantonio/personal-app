<template>
  <div
    class="relative flex items-center bg-white border border-gray-300 rounded shadow-sm text-sm text-gray-600 focus-within:text-primary-500 focus-within:border-primary-500"
    v-bind="$attrs"
  >
    <remix-icon
      class="absolute pointer-events-none left-2"
      :class="{ 'text-gray-400': !value, 'text-gray-800': value }"
      :size="20"
      icon="search"
    />
    <input
      @input="handleUpdate"
      type="text"
      class="w-full pl-9 pr-4 py-3 outline-0 bg-transparent text-gray-800 resize-none"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>

<script lang="ts" setup>
import RemixIcon from "@/components/RemixIcon.vue";

defineProps<{
  value: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  (event: "update:value", value: string): void;
}>();

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:value", target.value);
}
</script>

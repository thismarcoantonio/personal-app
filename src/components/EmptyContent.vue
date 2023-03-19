<template>
  <div class="flex flex-col items-center text-center mt-4">
    <div class="text-lg text-gray-700 font-semibold mb-2">{{ title }}</div>
    <p class="text-sm text-gray-500 mb-4">{{ description }}</p>
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description: string;
}>();
</script>

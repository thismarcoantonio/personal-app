<template>
  <component
    :is="is || 'div'"
    class="relative bg-white shadow mb-4 rounded border text-lg text-gray-800"
  >
    <slot />
  </component>
</template>

<script lang="ts" setup>
defineProps<{
  is?: string;
}>();
</script>

<template>
  <component
    :is="is || 'div'"
    class="bg-white shadow mb-4 py-3 px-4 rounded border text-lg text-gray-800"
  >
    <div>{{ title }}</div>
    <div v-if="description" class="text-sm text-gray-500">
      {{ description }}
    </div>
  </component>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
  is?: string;
}>();
</script>

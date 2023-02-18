<template>
  <h1 class="text-xl text-white font-bold">
    <slot>{{ title }}</slot>
  </h1>
  <p class="text-sm text-gray-200" v-if="description">{{ description }}</p>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <header
    :class="{ 'px-6': !noGutters }"
    class="py-8 bg-primary-500 text-white rounded-bl-2xl overflow-hidden"
  >
    <slot />
  </header>
</template>

<script lang="ts" setup>
defineProps<{
  noGutters?: boolean;
}>();
</script>

<template>
  <header
    :class="{ 'px-6': !noGutters, 'py-8': !small, 'py-6': small }"
    class="flex flex-col justify-center bg-primary-500 text-white rounded-bl-2xl overflow-hidden header-container"
  >
    <slot />
  </header>
</template>

<script lang="ts" setup>
defineProps<{
  noGutters?: boolean;
  small?: boolean;
}>();
</script>

<style scoped>
.header-container {
  min-height: 90px;
}
</style>

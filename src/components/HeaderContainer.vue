<template>
  <header
    :class="{ 'px-6': !noGutters, 'py-8': !small, 'py-6': small }"
    class="bg-primary-500 text-white rounded-bl-2xl overflow-hidden"
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

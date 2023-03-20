<template>
  <button
    class="text-sm px-4 py-3 bg-white font-semibold outline-0"
    :class="{
      'opacity-30': disabled,
      'text-primary-500 border border-primary-500 shadow rounded': !link,
      'text-gray-600': link,
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  link?: boolean;
  disabled?: boolean;
}>();
</script>

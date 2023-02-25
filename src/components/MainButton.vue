<template>
  <button
    class="text-sm border px-4 py-3 border-primary-500 bg-white rounded shadow font-semibold text-primary-500 outline-0"
    :class="{ 'opacity-30': disabled }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
}>();
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    :width="size || 24"
    :height="size || 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="currentColor" :d="iconValue" />
  </svg>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";

export type IconTypes =
  | "booklet"
  | "calendar"
  | "home"
  | "list"
  | "store"
  | "arrow-down-s";

const props = defineProps<{
  size?: number;
  icon: IconTypes;
}>();

const iconValue = ref("");

onBeforeMount(async () => {
  const value = await import(`../icons/${props.icon}.ts`);
  iconValue.value = value.default;
});
</script>

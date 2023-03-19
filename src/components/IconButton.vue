<template>
  <button
    @click="handleCreate"
    class="d-block"
    :class="{
      'rounded-50': rounded,
      'rounded-md': !rounded,
      'w-9 h-9 bg-white flex items-center justify-center shadow-md text-primary-500':
        !flat,
    }"
  >
    <remix-icon :size="20" :icon="icon" />
  </button>
</template>

<script lang="ts" setup>
import RemixIcon, { type IconTypes } from "@/components/RemixIcon.vue";

defineProps<{
  icon: IconTypes;
  rounded?: boolean;
  flat?: boolean;
}>();

const emit = defineEmits<{
  (event: "create"): void;
}>();

function handleCreate() {
  emit("create");
}
</script>

<template>
  <menu-item class="py-2 px-4 text-gray-600">
    <button
      @click="emit('click')"
      class="flex w-full items-center hover:bg-violet-100"
    >
      <remix-icon v-if="icon" :icon="icon" :size="16" class="mr-2" />
      <slot />
    </button>
  </menu-item>
</template>

<script lang="ts" setup>
import { MenuItem } from "@headlessui/vue";
import RemixIcon from "@/components/RemixIcon.vue";
import type { IconTypes } from "@/components/RemixIcon.vue";

defineProps<{
  icon?: IconTypes;
}>();

const emit = defineEmits<{
  (event: "click"): void;
}>();
</script>

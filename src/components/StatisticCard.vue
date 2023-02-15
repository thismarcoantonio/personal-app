<template>
  <div
    :class="[
      'w-36 h-36 p-3',
      'flex flex-col justify-between relative',
      'shadow-md bg-white text-gray-700 rounded-lg',
    ]"
  >
    <remix-icon :size="72" :icon="icon" class="text-primary-500" />
    <div
      class="text-base font-semibold px-1 text-slate-800 statistic-card__title"
    >
      {{ title }}
    </div>
    <remix-icon
      :size="136"
      :icon="icon"
      class="text-primary-500 absolute opacity-5 -right-12 -top-12"
    />
    <remix-icon
      :size="88"
      :icon="icon"
      class="text-primary-500 absolute opacity-5 -bottom-4 -left-4"
    />
  </div>
</template>

<script lang="ts" setup>
import RemixIcon, { type IconTypes } from "@/components/RemixIcon.vue";

defineProps<{
  title: string;
  icon: IconTypes;
}>();
</script>

<style scoped>
.statistic-card__title {
  line-height: 1.2rem;
}
</style>

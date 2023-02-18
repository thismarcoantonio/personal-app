<template>
  <div class="flex items-center">
    <div v-if="$slots.prefix" class="mr-auto">
      <slot name="prefix" />
    </div>
    <div>
      <h1 class="text-xl text-white font-bold">
        <slot>{{ title }}</slot>
      </h1>
      <p class="text-sm text-gray-200 leading-none" v-if="description">
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.suffix" class="ml-auto">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  description?: string;
}>();
</script>

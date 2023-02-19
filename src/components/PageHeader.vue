<template>
  <header-container small>
    <div class="flex items-center">
      <div v-if="$slots.prefix">
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
  </header-container>
</template>

<script lang="ts" setup>
import HeaderContainer from "@/components/HeaderContainer.vue";

defineProps<{
  title: string;
  description?: string;
}>();
</script>

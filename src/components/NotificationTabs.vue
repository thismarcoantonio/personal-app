<template>
  <ul class="flex gap-6">
    <li
      :key="tab.label"
      v-for="(tab, index) in items"
      @click="handleTabClick(index)"
      :class="{
        'font-medium': isActive(index),
        'opacity-70': !isActive(index),
      }"
    >
      {{ tab.label }}
      <div
        v-show="isActive(index)"
        class="w-full h-[3px] bg-white mt-1 rounded-sm"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
export interface NotificationTabs {
  label: string;
}

const emit = defineEmits<{
  (event: "update:modelValue", index: number): void;
}>();

const props = defineProps<{
  items: NotificationTabs[];
  modelValue: number;
}>();

function handleTabClick(index: number) {
  if (index !== props.modelValue) {
    emit("update:modelValue", index);
  }
}

function isActive(index: number) {
  return props.modelValue === index;
}
</script>

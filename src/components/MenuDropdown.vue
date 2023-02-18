<template>
  <div class="relative z-10">
    <listbox :model-value="modelValue" @update:model-value="handleChange">
      <listbox-button
        class="rounded bg-white px-3 py-2 gap-1 flex items-center justify-between shadow-md text-primary-500 text-sm menu-dropdown__button"
      >
        {{ buttonLabel }}
        <remix-icon class="shrink-0" icon="arrow-down-s" :size="16" />
      </listbox-button>
      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <listbox-options
          class="absolute min-w-full right-0 mt-1 rounded-md bg-white py-1 text-base shadow-lg"
        >
          <listbox-option
            v-slot="{ active }"
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-violet-100 text-primary-500' : 'text-gray-600',
                'relative select-none py-2 px-2 text-sm',
              ]"
            >
              {{ option.label || option.value }}
            </li>
          </listbox-option>
        </listbox-options>
      </transition>
    </listbox>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import RemixIcon from "@/components/RemixIcon.vue";

export interface MenuOption {
  label?: string;
  value: string;
}

const props = defineProps<{
  modelValue: string;
  label?: string;
  options: MenuOption[];
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const buttonLabel = computed(() => {
  if (props.label) return props.label;
  const { label, value } = props.options.find(
    (option) => option.value === props.modelValue
  )!;
  return label || value;
});

function handleChange(value: string) {
  emit("update:modelValue", value);
}
</script>

<style scoped>
.menu-dropdown__button {
  min-width: 96px;
}
</style>

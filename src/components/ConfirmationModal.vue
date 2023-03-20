<template>
  <div
    class="fixed top-0 left-0 w-full h-full z-10 flex items-center justify-center px-8"
  >
    <div class="bg-black opacity-90 w-full h-full absolute left-0 top-0" />
    <card-container class="relative text-center pt-10 p-4">
      <icon-button
        flat
        icon="close"
        class="absolute top-4 right-4"
        @click="emit('close')"
      />
      <div class="font-medium">{{ title }}</div>
      <p class="text-sm text-gray-600 mt-2">{{ description }}</p>
      <div class="flex justify-between mt-5">
        <main-button @click="emit('close')" class="w-full" link>
          Cancel
        </main-button>
        <main-button @click="emit('confirm')" class="w-full">
          Confirm
        </main-button>
      </div>
    </card-container>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import CardContainer from "@/components/CardContainer.vue";
import IconButton from "@/components/IconButton.vue";
import MainButton from "@/components/MainButton.vue";

defineProps<{
  title: string;
  description?: string;
}>();

const emit = defineEmits<{
  (event: "confirm"): void;
  (event: "close"): void;
}>();

onMounted(() => {
  document.body.classList.add("overflow-y-hidden");
});

onUnmounted(() => {
  document.body.classList.remove("overflow-y-hidden");
});
</script>

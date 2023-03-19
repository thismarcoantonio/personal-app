<template>
  <transition
    :leave-active-class="transitionClasses.active"
    :enter-active-class="transitionClasses.active"
    :leave-from-class="transitionClasses.visible"
    :leave-to-class="transitionClasses.hidden"
    :enter-from-class="transitionClasses.hidden"
    :enter-to-class="transitionClasses.visible"
  >
    <div
      v-if="open"
      class="fixed top-0 left-0 w-full h-full z-20 bg-white shadow-lg"
    >
      <page-header :title="title">
        <template #prefix>
          <icon-button @click="handleClose" icon="arrow-left" class="mr-4" />
        </template>
      </page-header>
      <div class="py-8 px-4">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import IconButton from "@/components/IconButton.vue";

defineProps<{
  open: boolean;
  title: string;
}>();

const emit = defineEmits<{
  (event: "update:open", state: boolean): void;
  (event: "close"): void;
}>();

const transitionClasses = {
  active: "transition duration-200 ease-in-out",
  visible: "translate-x-0",
  hidden: "translate-x-full",
};

function handleClose() {
  emit("update:open", false);
  emit("close");
}
</script>

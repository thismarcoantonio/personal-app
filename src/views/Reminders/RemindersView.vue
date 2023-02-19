<template>
  <page-header
    title="Reminders"
    description="Calendar view"
    @create="isFullscreenOpen = true"
  >
    <template #suffix>
      <icon-button @click="isFullscreenOpen = true" icon="add" rounded />
    </template>
  </page-header>
  <fullscreen-dialog title="New reminder" v-model:open="isFullscreenOpen" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import IconButton from "@/components/IconButton.vue";
import FullscreenDialog from "@/components/FullscreenDialog.vue";

const isFullscreenOpen = ref(false);
</script>

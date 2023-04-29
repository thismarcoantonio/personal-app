<template>
  <card-container>
    <icon-button
      v-if="note.pinned"
      class="absolute right-2 top-2 text-primary-500"
      icon="pushpin-vertical"
      flat
    />
    <icon-button
      v-else
      class="absolute right-2 top-2 text-gray-400"
      icon="pushpin"
      flat
    />
    <div class="py-3 px-4">
      {{ note.title }}
      <p class="text-sm text-gray-600 whitespace-pre notes-card__body">
        {{ note.description }}
      </p>
    </div>
  </card-container>
</template>

<script lang="ts" setup>
import CardContainer from "@/components/CardContainer.vue";
import IconButton from "@/components/IconButton.vue";
import type { Note } from "@/database/Notes";

defineProps<{
  note: Note;
}>();
</script>

<style>
.notes-card__body {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<template>
  <fullscreen-dialog
    :open="open"
    :title="isEdit ? 'Update note' : 'New note'"
    @close="emit('close')"
  >
    <form-wrapper @submit="handleSubmit" v-slot="form">
      <text-field
        required
        name="title"
        label="Title"
        :initial-value="note?.title"
      />
      <text-field
        multiline
        name="description"
        label="Description"
        :initial-value="note?.description"
      />
      <checkbox-field
        name="pinned"
        label="Pinned"
        :initial-value="note?.pinned"
      />
      <main-button class="ml-auto" :disabled="!form.valid">
        {{ isEdit ? "Update note" : "Create note" }}
      </main-button>
    </form-wrapper>
  </fullscreen-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Notes, type Note } from "@/database/Notes";
import FullscreenDialog from "@/components/FullscreenDialog.vue";
import FormWrapper from "@/components/Form/FormWrapper.vue";
import TextField from "@/components/Form/TextField.vue";
import CheckboxField from "@/components/Form/CheckboxField.vue";
import MainButton from "@/components/MainButton.vue";

const props = defineProps<{
  note?: Note;
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
  (event: "submitted"): void;
}>();

const isEdit = computed(() => {
  return !!props.note;
});

async function handleSubmit(
  values: Omit<Note, "id" | "cretedAt" | "updatedAt">
) {
  const note = props.note?.id ? { ...values, id: props.note.id } : values;

  await Notes.save(note);
  emit("submitted");
}
</script>

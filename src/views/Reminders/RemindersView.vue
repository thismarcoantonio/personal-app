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
  {{ reminders }}
  <fullscreen-dialog title="New reminder" v-model:open="isFullscreenOpen">
    <form-wrapper @submit="handleSubmit">
      <text-field name="title" label="Title" />
      <text-field name="location" label="Location" />
      <text-field name="date" label="Date" />
      <text-field name="description" label="Description" multiline />
      <main-button class="ml-auto">Create reminder</main-button>
    </form-wrapper>
  </fullscreen-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import IconButton from "@/components/IconButton.vue";
import FullscreenDialog from "@/components/FullscreenDialog.vue";
import FormWrapper from "@/components/Form/FormWrapper.vue";
import TextField from "@/components/Form/TextField.vue";
import MainButton from "@/components/MainButton.vue";
import { getReminders, createReminder, type Reminder } from "@/database";

const isFullscreenOpen = ref(false);
const reminders = ref<Reminder[]>();

onMounted(async () => {
  reminders.value = await getReminders();
});

async function handleSubmit(values: Omit<Reminder, "id">) {
  await createReminder(values);
  reminders.value = await getReminders();
  isFullscreenOpen.value = false;
}
</script>

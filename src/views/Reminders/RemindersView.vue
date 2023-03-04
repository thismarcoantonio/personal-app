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
  <ul class="p-4 pb-20">
    <info-card
      is="li"
      v-for="reminder in reminders"
      :key="reminder.id"
      :title="reminder.title"
      :description="reminder.date"
    />
  </ul>
  <fullscreen-dialog title="New reminder" v-model:open="isFullscreenOpen">
    <form-wrapper @submit="handleSubmit" v-slot="form">
      <text-field name="title" label="Title" required />
      <text-field name="location" label="Location" />
      <text-field name="date" label="Date" />
      <text-field name="description" label="Description" multiline />
      <main-button class="ml-auto" :disabled="!form.valid">
        Create reminder
      </main-button>
    </form-wrapper>
  </fullscreen-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { getReminders, createReminder, type Reminder } from "@/database";
import PageHeader from "@/components/PageHeader.vue";
import IconButton from "@/components/IconButton.vue";
import FullscreenDialog from "@/components/FullscreenDialog.vue";
import FormWrapper from "@/components/Form/FormWrapper.vue";
import TextField from "@/components/Form/TextField.vue";
import MainButton from "@/components/MainButton.vue";
import InfoCard from "@/components/InfoCard.vue";

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

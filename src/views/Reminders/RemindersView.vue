<template>
  <page-header title="Reminders" description="Calendar view">
    <template #suffix>
      <icon-button @click="isFullscreenOpen = true" icon="add" rounded />
    </template>
  </page-header>
  <div class="p-4 pb-20">
    <empty-content
      v-if="!reminders.length"
      title="No reminders found"
      description="Create import reminders of your daily life, so you can be notified about it"
    >
      <main-button @click="isFullscreenOpen = true">Add reminder</main-button>
    </empty-content>
    <ul v-else>
      <info-card
        is="li"
        v-for="reminder in reminders"
        :key="reminder.id"
        :title="reminder.title"
        :description="`${reminder.date}`"
      />
    </ul>
  </div>
  <fullscreen-dialog title="New reminder" v-model:open="isFullscreenOpen">
    <form-wrapper @submit="handleSubmit" v-slot="form">
      <text-field name="title" label="Title" required />
      <date-field
        :datetime="!form.fields.allDay?.value"
        label="Date"
        name="date"
        required
      />
      <checkbox-field name="allDay" label="All Day" />
      <select-field
        required
        name="frequency"
        label="Frequency"
        :options="frequencyOptions"
      />
      <text-field name="location" label="Location" />
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
import EmptyContent from "@/components/EmptyContent.vue";
import FullscreenDialog from "@/components/FullscreenDialog.vue";
import FormWrapper from "@/components/Form/FormWrapper.vue";
import TextField from "@/components/Form/TextField.vue";
import CheckboxField from "@/components/Form/CheckboxField.vue";
import DateField from "@/components/Form/DateField.vue";
import SelectField from "@/components/Form/SelectField.vue";
import MainButton from "@/components/MainButton.vue";
import InfoCard from "@/components/InfoCard.vue";

const isFullscreenOpen = ref(false);
const reminders = ref<Reminder[]>([]);

const frequencyOptions = [
  { value: "once", label: "Once" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

onMounted(async () => {
  reminders.value = await getReminders();
});

async function handleSubmit(values: Omit<Reminder, "id">) {
  await createReminder(values);
  reminders.value = await getReminders();
  isFullscreenOpen.value = false;
}
</script>

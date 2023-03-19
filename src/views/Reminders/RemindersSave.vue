<template>
  <fullscreen-dialog title="New reminder" :open="open" @close="emit('close')">
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
import { createReminder, Frequency, type Reminder } from "@/database";
import FullscreenDialog from "@/components/FullscreenDialog.vue";
import FormWrapper from "@/components/Form/FormWrapper.vue";
import TextField from "@/components/Form/TextField.vue";
import CheckboxField from "@/components/Form/CheckboxField.vue";
import DateField from "@/components/Form/DateField.vue";
import SelectField from "@/components/Form/SelectField.vue";
import MainButton from "@/components/MainButton.vue";

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
  (event: "submitted"): void;
}>();

const frequencyOptions = Object.entries(Frequency).map(([value, label]) => ({
  value,
  label,
}));

async function handleSubmit(values: Omit<Reminder, "id">) {
  await createReminder(values);
  emit("submitted");
}
</script>

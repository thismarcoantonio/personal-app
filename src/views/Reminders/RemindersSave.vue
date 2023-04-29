<template>
  <fullscreen-dialog
    :open="open"
    :title="isEdit ? 'Update reminder' : 'New reminder'"
    @close="emit('close')"
  >
    <form-wrapper @submit="handleSubmit" v-slot="form">
      <text-field
        required
        name="title"
        label="Title"
        :initial-value="reminder?.title"
      />
      <date-field
        required
        name="date"
        label="Date"
        :initial-value="reminder?.date"
        :datetime="!form.fields.allDay?.value"
      />
      <checkbox-field
        name="allDay"
        label="All Day"
        :initial-value="reminder?.allDay"
      />
      <select-field
        required
        name="frequency"
        label="Frequency"
        :options="frequencyOptions"
        :initial-value="reminder?.frequency"
      />
      <text-field
        name="location"
        label="Location"
        :initial-value="reminder?.location"
      />
      <text-field
        multiline
        name="description"
        label="Description"
        :initial-value="reminder?.description"
      />
      <main-button class="ml-auto" :disabled="!form.valid">
        {{ isEdit ? "Update reminder" : "Create reminder" }}
      </main-button>
    </form-wrapper>
  </fullscreen-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Frequency, Reminders, type Reminder } from "@/database/Reminders";
import FullscreenDialog from "@/components/FullscreenDialog.vue";
import FormWrapper from "@/components/Form/FormWrapper.vue";
import TextField from "@/components/Form/TextField.vue";
import CheckboxField from "@/components/Form/CheckboxField.vue";
import DateField from "@/components/Form/DateField.vue";
import SelectField from "@/components/Form/SelectField.vue";
import MainButton from "@/components/MainButton.vue";

const props = defineProps<{
  reminder?: Reminder;
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
  (event: "submitted"): void;
}>();

const isEdit = computed(() => {
  return !!props.reminder;
});

const frequencyOptions = Object.entries(Frequency).map(([value, label]) => ({
  value,
  label,
}));

async function handleSubmit(values: Omit<Reminder, "id">) {
  const reminder = props.reminder?.id
    ? { ...values, id: props.reminder.id }
    : values;

  await Reminders.create(reminder);
  emit("submitted");
}
</script>

<template>
  <page-header title="Reminders" description="Calendar view">
    <template #suffix>
      <icon-button @click="openCreatePage" icon="add" rounded />
    </template>
  </page-header>
  <div class="p-4 pb-20">
    <empty-content
      v-if="!reminders.length"
      title="No reminders found"
      description="Create import reminders of your daily life, so you can be notified about it"
    >
      <main-button @click="openCreatePage">Add reminder</main-button>
    </empty-content>
    <div v-else>
      <template v-for="day in remindersByDay" :key="day.date">
        <div class="text-lg mb-2 text-gray-600 font-medium">
          {{
            dayjs().isSame(day.date, "day")
              ? "Today"
              : formatDate(day.date, { humanize: true })
          }}
        </div>
        <ul class="mb-8">
          <reminders-card
            v-for="reminder in day.reminders"
            :key="reminder.id"
            :reminder="reminder"
            @delete="openDeleteModal"
          />
        </ul>
      </template>
    </div>
  </div>
  <reminders-save
    :open="isCreatePage || isEditPage"
    :reminder="reminderToEdit"
    @close="closeCreatePage"
    @submitted="onSubmitted"
  />
  <confirmation-modal
    v-if="!!reminderToDelete"
    title="Delete confirmation"
    :description="`Do you really want to delete “${reminderToDelete?.title}” reminder?`"
    @confirm="onDeleteConfirm"
    @close="closeDeleteModal"
  />
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { deleteReminder, getReminders, type Reminder } from "@/database";
import { formatDate } from "@/utils/date";
import PageHeader from "@/components/PageHeader.vue";
import IconButton from "@/components/IconButton.vue";
import EmptyContent from "@/components/EmptyContent.vue";
import MainButton from "@/components/MainButton.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import RemindersCard from "./RemindersCard.vue";
import RemindersSave from "./RemindersSave.vue";

const route = useRoute();
const router = useRouter();
const reminders = ref<Reminder[]>([]);
const reminderToDelete = ref<Reminder | null>(null);

const remindersByDay = computed(() => {
  return reminders.value
    .reduce<{ date: number; reminders: Reminder[] }[]>((days, reminder) => {
      const latestDay = days.slice(-1)[0];
      const belongsToPreviousDay =
        latestDay && dayjs(reminder.date).isSame(latestDay?.date, "day");

      return belongsToPreviousDay
        ? [
            ...days.slice(0, -1),
            { ...latestDay, reminders: [...latestDay.reminders, reminder] },
          ]
        : [
            ...days,
            {
              date: dayjs(reminder.date).startOf("day").valueOf(),
              reminders: [reminder],
            },
          ];
    }, [])
    .map(({ reminders, ...day }) => ({
      ...day,
      reminders: reminders
        .concat()
        .sort((a, b) => (a.allDay > b.allDay ? -1 : 1)),
    }));
});

const isCreatePage = computed(() => {
  return route.params.action === "create";
});

const isEditPage = computed(() => {
  return !!route.params.action;
});

const reminderToEdit = computed(() => {
  if (!route.params.action || route.params.action === "create") return;
  return reminders.value.find(
    (reminder) => reminder.id === Number(route.params.action)
  );
});

function openCreatePage() {
  return router.push("/reminders/create");
}

function closeCreatePage() {
  return router.push("/reminders");
}

async function onSubmitted() {
  reminders.value = await getReminders();
  closeCreatePage();
}

async function openDeleteModal(reminder: Reminder) {
  reminderToDelete.value = reminder;
}

async function closeDeleteModal() {
  reminderToDelete.value = null;
}

async function onDeleteConfirm() {
  await deleteReminder(reminderToDelete.value!);
  closeDeleteModal();
  reminders.value = await getReminders();
}

onMounted(async () => {
  reminders.value = await getReminders();
});
</script>

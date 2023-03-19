<template>
  <li class="bg-white shadow mb-4 rounded border text-lg text-gray-800">
    <div class="flex justify-end pt-2 px-2">
      <menu-options>
        <template #activator>
          <icon-button flat rounded icon="more-vertical" />
        </template>
        <menu-option icon="pencil">Edit</menu-option>
        <menu-option icon="delete-bin">Delete</menu-option>
      </menu-options>
    </div>
    <div class="py-3 px-4">
      {{ reminder.title }}
      <p v-if="reminder.description" class="text-sm text-gray-600">
        {{ reminder.description }}
      </p>
      <p class="mt-2 text-sm text-gray-500">
        {{
          reminder.allDay
            ? `${formatDate(reminder.date)} All Day`
            : formatDateTime(reminder.date)
        }}
        <span v-if="reminder.location">• {{ reminder.location }}</span>
      </p>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { Reminder } from "@/database";
import { formatDate, formatDateTime } from "@/utils/date";
import { MenuOptions, MenuOption } from "@/components/MenuOptions";
import IconButton from "@/components/IconButton.vue";

defineProps<{
  reminder: Reminder;
}>();
</script>

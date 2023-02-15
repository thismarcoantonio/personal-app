<template>
  <header-container no-gutters>
    <div class="px-6">
      <p class="text-xl font-bold">Hello {{ user }},</p>
      <p class="text-sm text-gray-300">This is your progress so far</p>
      <notification-tabs
        class="mt-6"
        v-model="tab"
        :items="[
          { label: 'All' },
          { label: 'Reminders' },
          { label: 'Resolutions' },
          { label: 'Groceries' },
        ]"
      />
    </div>
    <div class="pl-6 overflow-x-auto w-full scrollbar-hidden">
      <div class="mt-4 gap-4 flex">
        <statistic-card
          class="shrink-0"
          :key="statistic.title"
          v-for="statistic in statistics"
          :title="statistic.title"
          :icon="statistic.icon"
        />
        <div class="w-6 shrink-0" />
      </div>
    </div>
  </header-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import HeaderContainer from "@/components/HeaderContainer.vue";
import NotificationTabs from "@/components/NotificationTabs.vue";
import StatisticCard from "@/components/StatisticCard.vue";

const tab = ref(0);

const user = "User";
const statistics: Array<InstanceType<typeof StatisticCard>["$props"]> = [
  { title: "14 Reminders completed", icon: "calendar" },
  { title: "Mobile App resolution", icon: "list" },
  { title: "14 remaining Reminders", icon: "calendar" },
  { title: "Groceries in 2 days", icon: "store" },
];
</script>

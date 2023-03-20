<template>
  <div
    class="w-full bg-white drop-shadow-2xl fixed bottom-0 left-0 px-8 navigation-bar"
  >
    <ul class="flex items-center justify-between h-full">
      <li :key="route.name" v-for="route in mainRoutes">
        <router-link
          class="text-gray-400"
          active-class="text-primary-500"
          :to="{ name: route.name }"
        >
          <remix-icon :icon="route.meta.icon" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { mainRoutes } from "@/router";
import RemixIcon from "@/components/RemixIcon.vue";
</script>

<style scoped>
.navigation-bar {
  height: 60px;
  box-shadow: 0 -4px 4px 0 rgba(0, 0, 0, 0.03);
}
</style>

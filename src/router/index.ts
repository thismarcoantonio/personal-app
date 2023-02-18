import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import type { IconTypes } from "@/components/RemixIcon.vue";
import HomeView from "@/views/Home/HomeView.vue";
import RemindersView from "@/views/Reminders/RemindersView.vue";

interface RouteMeta {
  meta: {
    icon: IconTypes;
  };
}

export const mainRoutes: (RouteRecordRaw & RouteMeta)[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      icon: "home",
    },
  },
  {
    path: "/reminders",
    name: "reminders",
    component: RemindersView,
    meta: {
      icon: "calendar",
    },
  },
  {
    path: "/resolutions",
    name: "resolutions",
    component: HomeView,
    meta: {
      icon: "list",
    },
  },
  {
    path: "/notes",
    name: "notes",
    component: HomeView,
    meta: {
      icon: "booklet",
    },
  },
  {
    path: "/groceries",
    name: "groceries",
    component: HomeView,
    meta: {
      icon: "store",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...mainRoutes],
});

<template>
  <headless-menu as="div" class="relative">
    <menu-button>
      <slot name="activator" />
    </menu-button>

    <transition
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <menu-items
        class="absolute min-w-full right-0 top-0 rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 z-10"
      >
        <slot />
      </menu-items>
    </transition>
  </headless-menu>
</template>

<script lang="ts" setup>
import { Menu as HeadlessMenu, MenuButton, MenuItems } from "@headlessui/vue";
</script>

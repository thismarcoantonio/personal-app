<template>
  <page-header title="Notes" description="0 notes created">
    <template #suffix>
      <icon-button @click="openCreatePage" icon="add" rounded />
    </template>
  </page-header>
  <div class="p-4 pb-20">
    <empty-content
      v-if="!notes.length"
      title="No notes found"
      description="Save information in small notes that you can refer to later"
    >
      <main-button @click="openCreatePage">Take a note</main-button>
    </empty-content>
    <div v-else>
      <search-field
        class="mb-6"
        v-model:value="search"
        placeholder="Search note"
      />
      <notes-card v-for="note in notes" :key="note.id" :note="note" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PageHeader from "@/components/PageHeader.vue";
import IconButton from "@/components/IconButton.vue";
import SearchField from "@/components/SearchField.vue";
import EmptyContent from "@/components/EmptyContent.vue";
import MainButton from "@/components/MainButton.vue";
import NotesCard from "./NotesCard.vue";

const search = ref("");
const notes = ref([
  {
    id: 1,
    title: "Github account",
    body: "Email: thismarcoantonio@gmail.com\nPassword: testing12312",
    pinned: true,
  },
  {
    id: 2,
    title: "Alternative stores",
    body: "In order\nuseoutlaws.com.br\nkeydesign.com.br\nskiveonline.com.br (expensive)\nblueenstore.com\nleaodenemeia.com.br\ncodebrincosmasculinos.com.br (earings only)",
    pinned: false,
  },
]);

const router = useRouter();

function openCreatePage() {
  return router.push("/notes/create");
}
</script>

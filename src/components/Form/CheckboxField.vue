<template>
  <base-field>
    <label class="h-11 px-3 flex items-center" :for="name">
      <input
        :id="name"
        @change="handleUpdate"
        type="checkbox"
        class="accent-primary-500 mr-2"
      />
      {{ label }}
    </label>
  </base-field>
</template>

<script lang="ts" setup>
import { inject, onMounted } from "vue";
import type { FormProvider } from "@/components/Form/FormWrapper.vue";
import BaseField from "@/components/Form/BaseField.vue";

const props = defineProps<{
  name: string;
  label: string;
}>();

const state = inject<FormProvider>("form-wrapper")!;

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  state.update(props.name, target.checked);
}

onMounted(() => {
  state.init(props.name, { value: false });
});
</script>

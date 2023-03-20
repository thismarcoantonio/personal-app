<template>
  <base-field>
    <label class="h-11 px-3 flex items-center" :for="name">
      <input
        :id="name"
        :checked="field.value"
        @change="handleUpdate"
        type="checkbox"
        class="accent-primary-500 mr-2"
      />
      {{ label }}
    </label>
  </base-field>
</template>

<script lang="ts" setup>
import { inject, computed, onMounted } from "vue";
import type { FormProvider } from "@/components/Form/FormWrapper.vue";
import BaseField from "@/components/Form/BaseField.vue";

const props = defineProps<{
  name: string;
  label: string;
  initialValue?: boolean;
}>();

const state = inject<FormProvider<boolean>>("form-wrapper")!;

const field = computed(() => state.form.fields[props.name] ?? {});

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  state.update(props.name, target.checked);
}

onMounted(() => {
  state.init(props.name, { value: props.initialValue ?? false });
});
</script>

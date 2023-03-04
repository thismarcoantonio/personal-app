<template>
  <base-field
    :label="label"
    :value="field.value"
    :required="required"
    :error="field.touched && error ? error : ''"
  >
    <component
      :is="multiline ? 'textarea' : 'input'"
      @input="handleUpdate"
      @blur="handleBlur"
      type="text"
      class="w-full px-4 py-3 outline-0 bg-transparent text-gray-800 resize-none"
    />
  </base-field>
</template>

<script lang="ts" setup>
import { inject, onMounted, computed } from "vue";
import type { FormProvider } from "@/components/Form/FormWrapper.vue";
import BaseField from "@/components/Form/BaseField.vue";

const props = defineProps<{
  label: string;
  name: string;
  multiline?: boolean;
  required?: boolean;
}>();

const state = inject<FormProvider<string>>("form-wrapper")!;

const field = computed(() => state.form.fields[props.name] ?? {});

const error = computed(() => state.form.errors.value[props.name] ?? null);

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  state.update(props.name, target.value);
}

function handleBlur() {
  state.updateTouched(props.name, true);
}

onMounted(() => {
  state.init(props.name, {
    value: "",
    required: props.required,
  });
});
</script>

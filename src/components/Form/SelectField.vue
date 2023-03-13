<template>
  <base-field
    :label="label"
    :value="field.value"
    :required="required"
    :error="field.touched && error ? error : ''"
  >
    <select
      name="name"
      class="w-full px-4 py-3 outline-0 bg-transparent text-gray-800 resize-none"
      :value="field.value"
      @change="handleUpdate"
      @blur="handleBlur"
    >
      <option class="hidden" />
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <div class="absolute right-3 top-0 h-full flex items-center">
      <icon-button
        icon="close"
        v-show="field.value"
        @click="handleClear"
        flat
      />
      <icon-button flat icon="arrow-down-s" />
    </div>
  </base-field>
</template>

<script lang="ts" setup>
import { inject, onMounted, computed } from "vue";
import type { FormProvider } from "@/components/Form/FormWrapper.vue";
import BaseField from "@/components/Form/BaseField.vue";
import IconButton from "@/components/IconButton.vue";

export interface Option {
  value: string;
  label: string;
}

const props = defineProps<{
  name: string;
  label: string;
  required?: boolean;
  options: Option[];
}>();

const state = inject<FormProvider<string>>("form-wrapper")!;

const field = computed(() => state.form.fields[props.name] ?? {});

const error = computed(() => state.form.errors.value[props.name] ?? "");

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  state.update(props.name, target.value);
}

function handleClear() {
  state.update(props.name);
}

function handleBlur() {
  if (!field.value.touched) {
    state.updateTouched(props.name, true);
  }
}

onMounted(() => {
  state.init(props.name, {
    value: "",
    required: props.required,
  });
});
</script>

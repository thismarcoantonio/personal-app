<template>
  <base-field
    :label="label"
    :value="field.value"
    :required="required"
    :error="field.touched && error ? error : ''"
  >
    <input
      @input="handleUpdate"
      @blur="handleBlur"
      :type="datetime ? 'datetime-local' : 'date'"
      :value="formattedValue"
      ref="datePicker"
      class="invisible absolute pointer-events-none"
    />
    <input
      type="text"
      readonly
      class="w-full px-4 py-3 outline-0 bg-transparent text-gray-800"
      @click="openDatePicker"
      @focus="openDatePicker"
      @blur="handleBlur"
      :value="datetime ? formatDateTime(field.value) : formatDate(field.value)"
    />
    <icon-button
      v-if="field.value"
      @click="state.update(name)"
      class="absolute right-3 top-3 text-gray-500"
      icon="close"
      flat
    />
  </base-field>
</template>

<script lang="ts" setup>
import { inject, onMounted, computed, ref } from "vue";
import dayjs from "dayjs";
import { formatDate, formatDateTime } from "@/utils/date";
import type { FormProvider } from "@/components/Form/FormWrapper.vue";
import BaseField from "@/components/Form/BaseField.vue";
import IconButton from "@/components/IconButton.vue";

const props = defineProps<{
  name: string;
  label: string;
  required?: boolean;
  datetime?: boolean;
  initialValue?: number;
}>();

const datePicker = ref<HTMLInputElement | null>(null);

const state = inject<FormProvider<number>>("form-wrapper")!;

const field = computed(() => state.form.fields[props.name] ?? {});

const error = computed(() => state.form.errors.value[props.name] ?? null);

const formattedValue = computed(() => {
  return dayjs(field.value.value).format(
    props.datetime ? "YYYY-MM-DDThh:mm" : "YYYY-MM-DD"
  );
});

function handleUpdate(event: Event) {
  const target = event.target as HTMLInputElement;
  const formattedValue = dayjs(target.value).valueOf();
  state.update(props.name, formattedValue);
}

function handleBlur() {
  state.updateTouched(props.name, true);
}

function openDatePicker() {
  datePicker.value?.showPicker();
}

onMounted(() => {
  state.init(props.name, {
    value: props.initialValue,
    required: props.required,
  });
});
</script>

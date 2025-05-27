<script setup lang="ts">
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';
import IconGrab from 'core/components/IconGrab.vue';
import type { Field, FilterGroup, Operator } from '../types/rule-builder.types';
import { useSendTrashConfirmFilter } from '../composable/use-send-trash-confirm';
import { fieldOptions } from '../model/field-options';
import { operatorOptions } from '../model/operator-options';

const props = defineProps<{
  filter: FilterGroup
  disabled: boolean
  dragAndDropClass: string
}>()

const emit = defineEmits<{
  (event: 'remove-filter'): void
}>()

const defineModelField = defineModel<Field | null>('field', { required: true })
const defineModelOperator = defineModel<Operator | null>('operator', { required: true })
const defineModelValue = defineModel<string>('value', { required: true })

const sendEmitRemoveFilter = () => {
  emit('remove-filter')
}

const { confirmFilter } = useSendTrashConfirmFilter({ callback: sendEmitRemoveFilter, title: props.filter.name })
</script>

<template>
  <Card class="flex flex-col gap-4 !ring-4 !bg-transparent">
    <template #title>
      <div class="flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <IconGrab
            :is-disabled="disabled"
            :class="dragAndDropClass"
          />

          <h3 class="font-medium text-2xl">
            {{ filter.name }}
          </h3>
        </div>

        <Button
          icon="pi pi-trash"
          severity="danger"
          variant="outlined"
          raised
          :disabled="disabled"
          @click="confirmFilter"
        />
      </div>
    </template>

    <template #content>
      <div class="flex items-center gap-4">
        <Select
          v-model="defineModelField"
          :options="fieldOptions"
          :disabled="disabled"
          option-label="name"
          option-value="value"
          placeholder="Field"
          class="w-full md:w-56"
          show-clear
        />

        <Select
          v-model="defineModelOperator"
          :options="operatorOptions"
          :disabled="disabled"
          option-label="name"
          option-value="value"
          placeholder="Operator"
          class="w-full md:w-56"
          show-clear
        />

        <InputText
          v-model="defineModelValue"
          :disabled="disabled"
          type="text"
          placeholder="Value"
        />
      </div>
    </template>
  </Card>
</template>

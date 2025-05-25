<script setup lang="ts">
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import type { Field, FilterGroup, Operator } from '../types';
import { fieldOptions } from '../model/field-options';
import { operatorOptions } from '../model/operator-options';

defineProps<{
  filter: FilterGroup
  disabled: boolean
}>()

const defineModelField = defineModel<Field | null>('field', { required: true })
const defineModelOperator = defineModel<Operator | null>('operator', { required: true })
const defineModelValue = defineModel<string>('value', { required: true })

</script>

<template>
  <section>
    <h3>Filter</h3>

    <div>
      <Select
        v-model="defineModelField"
        :options="fieldOptions"
        :disabled="disabled"
        option-label="name"
        option-value="value"
        placeholder="Select a Field"
        class="w-full md:w-56"
        show-clear
      />

      <Select
        v-model="defineModelOperator"
        :options="operatorOptions"
        :disabled="disabled"
        option-label="name"
        option-value="value"
        placeholder="Select a Operator"
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
  </section>
</template>

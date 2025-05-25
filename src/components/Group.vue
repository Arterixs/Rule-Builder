<script setup lang="ts">
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import Filter from './Filter.vue'
import { TypeLogic, type FilterGroup, type GroupRules } from '../types';
import { generateGroup } from '../utils/generate-group';
import { generateFilter } from '../utils/generate-filter';

const props = defineProps<{
  group: GroupRules
}>()

const modelSubgroup = defineModel<GroupRules[]>('subgroup', { required: true })
const modelFilters = defineModel<FilterGroup[]>('filter', { required: true })
const modelType = defineModel<TypeLogic>('type', { required: true })
const modelLocked = defineModel<boolean>('locked', { required: true })
const modelActive = defineModel<boolean>('active', { required: true })

const addSubgroup = () => {
  modelSubgroup.value.push(generateGroup(props.group.id))
}

const addFilter = () => {
  modelFilters.value.push(generateFilter(props.group.id))
}

const changeTypeLogic = () => {
  modelType.value = modelType.value === TypeLogic.AND ? TypeLogic.OR : TypeLogic.AND
}



</script>

<template>
  <article>
    <header class="p-2 flex justify-between">
      <h2>{{ group.name }}</h2>
      <Button
        label="Add a new subgroup"
        severity="contrast"
        :disabled="group.isLocked"
        @click="addSubgroup"
      />
      <Button
        label="Add a new filter"
        severity="contrast"
        :disabled="group.isLocked"
        @click="addFilter"
      />

      <ToggleButton
        v-model="modelLocked"
        on-label="Locked"
        off-label="Unlocked"
        on-icon="pi pi-lock"
        off-icon="pi pi-lock-open"
        class="w-36"
      />

      <ToggleButton
        v-model="modelActive"
        on-label="Active"
        off-label="Inactive"
        class="w-36"
        on-icon="pi pi-check"
        off-icon="pi pi-times"
        :disabled="group.isLocked"
      />
    </header>

    <Button
      class="min-w-[60px]"
      :label="modelType"
      :severity="modelType === TypeLogic.AND ? 'info' : 'success'"
      :disabled="group.isLocked"
      @click="changeTypeLogic"
    />

    <!-- <ToggleButton
      v-model="modelType"
      on-label="Or"
      off-label="And"
      @click=""
    /> -->

    <Filter
      v-for="filter of group.filters"
      :key="filter.id"
      v-model:field="filter.field"
      v-model:operator="filter.operator"
      v-model:value="filter.value"
      :disabled="group.isLocked || group.isActive"
      :filter="filter"
    />

    <Group
      v-for="subgroup of group.subgroups"
      :key="subgroup.id"
      v-model:subgroup="subgroup.subgroups"
      v-model:filter="subgroup.filters"
      v-model:type="subgroup.type"
      v-model:locked="subgroup.isLocked"
      v-model:active="subgroup.isActive"
      :group="subgroup"
    />
  </article>
</template>

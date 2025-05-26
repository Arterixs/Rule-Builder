<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Filter from './Filter.vue'
import { TypeLogic, type FilterGroup, type GroupRules } from '../types';
import { generateGroup } from '../utils/generate-group';
import { generateFilter } from '../utils/generate-filter';
import EditTitle from './EditTitle.vue';
import ListGroup from './ListGroup.vue';
import { useSendTrashConfirmGroup } from '../composable/use-send-trash-confirm';
import IconGrab from './IconGrab.vue';

const props = defineProps<{
  group: GroupRules
}>()

const emit = defineEmits<{
  (event: 'remove-group'): void
}>()

const modelSubgroup = defineModel<GroupRules[]>('subgroup', { required: true })
const modelFilters = defineModel<FilterGroup[]>('filter', { required: true })
const modelType = defineModel<TypeLogic>('type', { required: true })
const modelLocked = defineModel<boolean>('locked', { required: true })
const modelActive = defineModel<boolean>('active', { required: true })
const modelTitle = defineModel<string>('title', { required: true })

const addSubgroup = () => {
  modelSubgroup.value.push(generateGroup(props.group.id))
}

const addFilter = () => {
  modelFilters.value.push(generateFilter(props.group.id))
}

const isTypeAND = computed(() => modelType.value === TypeLogic.AND)

const changeGroupLogic = () => {
  modelType.value = isTypeAND.value ? TypeLogic.OR : TypeLogic.AND
}

const changeTitle = (title: string) => {
  modelTitle.value = title
}

const removeSubgroupByIndex = (index: number) => {
  modelSubgroup.value.splice(index, 1)
}

const sendEventRemoveGroup = () => {
  emit('remove-group')
}

const { confirmGroup } = useSendTrashConfirmGroup({
  callback: sendEventRemoveGroup,
  title: modelTitle
})

const removeFilterById = (index: number) => {
  modelFilters.value.splice(index, 1)
}


</script>

<template>
  <Panel
    class="!bg-gray-200 ring-4"
    :class="[isTypeAND ? 'ring-sky-600' : 'ring-green-600', {'grayscale': !modelActive}]"
    toggleable
  >
    <template #header>
      <header class="flex items-baseline justify-between w-full">
        <div class="w-full flex items-center gap-2">
          <IconGrab class="mr-2" />

          <h2 class="font-extrabold text-2xl">
            {{ group.name }}
          </h2>
        </div>

        <div class="flex items-center gap-1.5 mr-1.5">
          <Button
            icon="pi pi-power-off"
            severity="primary"
            rounded
            raised
            :disabled="group.isLocked"
            @click="modelActive = !modelActive"
          />

          <Button
            class="min-w-[60px]"
            :label="modelType"
            :severity="isTypeAND ? 'info' : 'success'"
            :disabled="group.isLocked"
            raised
            @click="changeGroupLogic"
          />

          <Button
            :icon="modelLocked ? 'pi pi-lock' : 'pi pi-lock-open'"
            :severity="modelLocked ? 'contrast' : 'warn'"
            raised
            @click="modelLocked = !modelLocked"
          />

          <EditTitle
            :title="group.name"
            :disabled="group.isLocked"
            @change-title="changeTitle"
          />

          <Button
            icon="pi pi-trash"
            severity="danger"
            :disabled="group.isLocked"
            raised
            @click="confirmGroup"
          />
        </div>
      </header>
    </template>

    <section class="flex flex-col gap-4">
      <div class="p-2 flex gap-4">
        <Button
          label="Subgroup"
          severity="warn"
          icon="pi pi-plus"
          :disabled="group.isLocked"
          raised
          @click="addSubgroup"
        />
        <Button
          label="Filter"
          severity="warn"
          icon="pi pi-plus"
          :disabled="group.isLocked"
          raised
          @click="addFilter"
        />
      </div>

      <Filter
        v-for="(filter, index) of group.filters"
        :key="filter.id"
        v-model:field="filter.field"
        v-model:operator="filter.operator"
        v-model:value="filter.value"
        :disabled="group.isLocked || !group.isActive"
        :class="[isTypeAND ? 'ring-sky-600' : 'ring-green-600']"
        @remove-filter="removeFilterById(index)"
      />

      <ListGroup
        v-if="group.subgroups.length"
        :groups="group.subgroups"
      >
        <template #default="slotProps">
          <Group
            v-model:subgroup="slotProps.group.subgroups"
            v-model:filter="slotProps.group.filters"
            v-model:type="slotProps.group.type"
            v-model:locked="slotProps.group.isLocked"
            v-model:active="slotProps.group.isActive"
            v-model:title="slotProps.group.name"
            :group="slotProps.group"
            @remove-group="removeSubgroupByIndex(slotProps.index)"
          />
        </template>
      </ListGroup>
    </section>
  </Panel>
</template>

<style lang="css">
  .p-panel-header {
    padding: 20px !important;
    align-items: baseline !important;
  }

</style>

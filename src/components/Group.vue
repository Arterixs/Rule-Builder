<script setup lang="ts">
import { computed } from 'vue';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Filter from './Filter.vue'
import EditTitle from './EditTitle.vue';
import IconGrab from './IconGrab.vue';
import DraggableList from './DraggableList.vue';
import { TypeLogic, type FilterGroup, type GroupRules } from '../types';
import { generateGroup } from '../utils/generate-group';
import { generateFilter } from '../utils/generate-filter';
import { useSendTrashConfirmGroup } from '../composable/use-send-trash-confirm';

const props = defineProps<{
  group: GroupRules
  dragAndDropClass: string
  isDisabledGroup?: boolean
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
  modelSubgroup.value.push(generateGroup(props.group.id, `Subgroup ${modelSubgroup.value.length + 1}`))
}

const addFilter = () => {
  modelFilters.value.push(generateFilter(props.group.id, `Filter ${modelFilters.value.length + 1}`))
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

const isDisabledGroup = computed(() => props.isDisabledGroup || modelLocked.value)
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
          <IconGrab
            class="mr-2"
            :class="dragAndDropClass"
            :is-disabled="isDisabledGroup"
          />

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
            :disabled="isDisabledGroup"
            @click="modelActive = !modelActive"
          />

          <Button
            class="min-w-[60px]"
            :label="modelType"
            :severity="isTypeAND ? 'info' : 'success'"
            :disabled="isDisabledGroup"
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
            :disabled="isDisabledGroup"
            @change-title="changeTitle"
          />

          <Button
            icon="pi pi-trash"
            severity="danger"
            :disabled="isDisabledGroup"
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
          :disabled="isDisabledGroup"
          raised
          @click="addSubgroup"
        />
        <Button
          label="Filter"
          severity="warn"
          icon="pi pi-plus"
          :disabled="isDisabledGroup"
          raised
          @click="addFilter"
        />
      </div>

      <DraggableList
        v-if="modelFilters.length"
        v-model:entity="modelFilters"
      >
        <template #default="{entity, index, classForDragAndDrop}">
          <Filter
            v-model:field="entity.field"
            v-model:operator="entity.operator"
            v-model:value="entity.value"
            :filter="entity"
            :disabled="isDisabledGroup || !modelActive"
            :class="[isTypeAND ? 'ring-sky-600' : 'ring-green-600']"
            :drag-and-drop-class="classForDragAndDrop"
            @remove-filter="removeFilterById(index)"
          />
        </template>
      </DraggableList>

      <DraggableList
        v-if="modelSubgroup.length"
        v-model:entity="modelSubgroup"
      >
        <template #default="slotProps">
          <Group
            v-model:subgroup="slotProps.entity.subgroups"
            v-model:filter="slotProps.entity.filters"
            v-model:type="slotProps.entity.type"
            v-model:locked="slotProps.entity.isLocked"
            v-model:active="slotProps.entity.isActive"
            v-model:title="slotProps.entity.name"
            :drag-and-drop-class="slotProps.classForDragAndDrop"
            :group="slotProps.entity"
            :is-disabled-group="isDisabledGroup"
            @remove-group="removeSubgroupByIndex(slotProps.index)"
          />
        </template>
      </DraggableList>
    </section>
  </Panel>
</template>

<style lang="css">
  .p-panel-header {
    padding: 20px !important;
    align-items: baseline !important;
  }

</style>

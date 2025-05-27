<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'primevue';
import DraggableList from 'core/components/DraggableList.vue';
import type { GroupRules } from '../types/rule-builder.types';
import { generateGroup } from '../helpers/generate-group';
import Group from '../components/Group.vue';
import { useSendPreviewModal } from '../composable/use-send-preview-modal';

const groups = ref<GroupRules[]>([])

const addNewGroup = () => {
  groups.value.push(generateGroup(null, `Group ${groups.value.length + 1}`))
}

const removeGroupByIndex = (index: number) => {
  groups.value.splice(index, 1)
}

const { showPreview } = useSendPreviewModal(groups)
</script>

<template>
  <article class="size-full flex flex-col gap-5 py-5">
    <header class="py-2.5 px-5 flex items-center justify-between">
      <h1 class="text-4xl font-bold">
        Rule Builder
      </h1>

      <div class="flex items-center gap-2.5">
        <Button
          label="Preview"
          severity="contrast"
          :icon="groups.length ? 'pi pi-eye' : 'pi pi-eye-slash'"
          :disabled="!groups.length"
          @click="showPreview"
        />

        <Button
          label="Add a new group"
          severity="success"
          @click="addNewGroup"
        />
      </div>
    </header>

    <section class="w-full grow p-2.5 rounded-xl shadow-[0px_0px_13px_7px_rgba(34, 60, 80, 0.2)] overflow-y-auto ring-4">
      <DraggableList
        v-if="groups.length"
        v-model:entity="groups"
      >
        <template #default="{ entity, index, classForDragAndDrop, }">
          <Group
            v-model:subgroup="entity.subgroups"
            v-model:filter="entity.filters"
            v-model:type="entity.type"
            v-model:locked="entity.isLocked"
            v-model:active="entity.isActive"
            v-model:title="entity.name"
            :drag-and-drop-class="classForDragAndDrop"
            :group="entity"
            @remove-group="removeGroupByIndex(index)"
          />
        </template>
      </DraggableList>
    </section>
  </article>
</template>

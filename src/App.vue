<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import { ConfirmDialog } from 'primevue';
import Group from './components/Group.vue';
import type { GroupRules } from './types';
import { generateGroup } from './utils/generate-group';
import DraggableList from './components/DraggableList.vue';


const groups = ref<GroupRules[]>([])

const addNewGroup = () => {
  groups.value.push(generateGroup(null, `Group ${groups.value.length + 1}`))
}

const removeGroupByIndex = (index: number) => {
  groups.value.splice(index, 1)
}
</script>

<template>
  <div class="h-full max-w-[1460px] mx-auto flex flex-col">
    <header class="border p-2.5 flex items-center justify-between">
      <h1 class="text-4xl font-bold">
        Rule Builder
      </h1>
      <Button
        label="Add a new group"
        severity="success"
        @click="addNewGroup"
      />
    </header>
    <main class="w-full border grow p-2.5">
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
    </main>
  </div>
  <ConfirmDialog />
</template>


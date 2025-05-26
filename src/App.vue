<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import { ConfirmDialog } from 'primevue';
import Group from './components/Group.vue';
import type { GroupRules } from './types';
import { generateGroup } from './utils/generate-group';
import ListGroup from './components/ListGroup.vue';


const groups = ref<GroupRules[]>([])

const addNewGroup = () => {
  groups.value.push(generateGroup())
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
      <ListGroup :groups="groups">
        <template #default="{group, index}">
          <Group
            v-model:subgroup="group.subgroups"
            v-model:filter="group.filters"
            v-model:type="group.type"
            v-model:locked="group.isLocked"
            v-model:active="group.isActive"
            v-model:title="group.name"
            :group="group"
            @remove-group="removeGroupByIndex(index)"
          />
        </template>
      </ListGroup>
    </main>
  </div>
  <ConfirmDialog />
</template>


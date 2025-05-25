<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import Group from './components/Group.vue';
import type { GroupRules } from './types';
import { generateGroup } from './utils/generate-group';

const groups = ref<GroupRules[]>([])

const addNewGroup = () => {
  groups.value.push(generateGroup())
}
</script>

<template>
  <div class="h-full max-w-[1460px] mx-auto flex flex-col">
    <header class="border p-2.5 flex items-center justify-between">
      <h1>Rule Builder</h1>
      <Button
        label="Add a new group"
        severity="contrast"
        @click="addNewGroup"
      />
    </header>
    <main class="w-full border grow p-2.5">
      <Group
        v-for="group of groups"
        :key="group.id"
        v-model:subgroup="group.subgroups"
        v-model:filter="group.filters"
        v-model:type="group.type"
        v-model:locked="group.isLocked"
        v-model:active="group.isActive"
        :group="group"
      />
    </main>
  </div>
</template>


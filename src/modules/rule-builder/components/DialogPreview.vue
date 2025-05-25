<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import type { GroupRules } from '../types/rule-builder.types';
import type { DialogModalInstance } from 'core/types';
import RulesPreview from './RulesPreview.vue';

const groups = ref<GroupRules[]>([])

const dialogRef = inject<DialogModalInstance>('dialogRef');

onMounted(() => {
  if (!dialogRef) {
    return
  }

  groups.value = dialogRef.value.data.groups;
})
</script>

<template>
  <div class="flex flex-col gap-y-2 mt-2">
    <RulesPreview
      v-for="group of groups"
      :key="group.id"
      :group="group"
      is-first-lvl
    />
  </div>
</template>

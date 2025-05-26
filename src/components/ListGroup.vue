<script setup lang="ts">
import type { GroupRules } from '../types';

defineProps<{
  groups: GroupRules[]
}>()

</script>

<template>
  <ul class="flex flex-col gap-5 relative p-2.5">
    <li
      v-for="(group, index) of groups"
      :key="group.id"
      class=" relative shadow-2xl"
    >
      <slot
        :group
        :index
      />
    </li>
  </ul>
</template>

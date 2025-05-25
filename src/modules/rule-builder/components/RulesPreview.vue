<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { TypeLogic, type GroupRules } from '../types/rule-builder.types';

const props = defineProps<{
  group: GroupRules,
  isFirstLvl?: boolean
}>();

const isAND = computed(() => props.group.type === TypeLogic.AND)
</script>

<template>
  <div
    v-if="group.isActive"
    :class="isAND ? 'text-blue-600' : 'text-green-600'"
    class="p-2"
  >
    <p
      v-if="isFirstLvl"
      class="text-2xl font-bold"
    >
      {{ group.name }}
    </p>

    <div
      v-if="group.filters.length || group.subgroups.length"
      class="before:content-['('] before:font-bold before:text-2xl after:content-[')'] after:font-bold after:text-2xl"
    >
      <ul class="flex flex-col gap-y-0.5 ml-4">
        <li
          v-for="filter of group.filters"
          :key="filter.id"
          class="flex flex-col gap-1 before:font-extrabold first:before:content-['']"
          :class="[isAND ? ' before:content-[\'AND\']' : 'before:content-[\'OR\']' ]"
        >
          {{ filter.field || '(empty)' }} -> {{ filter.operator || '(empty)' }} -> {{ filter.value || '(empty)' }}
        </li>
      </ul>

      <ul
        v-if="group.subgroups.length"
        class="mt-5 ml-4"
      >
        <li
          v-for="subgroup of group.subgroups"
          :key="subgroup.id"
          class="mb-1 last:mb-0 before:font-extrabold"
          :class="[isAND ? 'before:content-[\'AND\']' : 'before:content-[\'OR\']' ]"
        >
          <RulesPreview :group="subgroup" />
        </li>
      </ul>
    </div>
  </div>
</template>

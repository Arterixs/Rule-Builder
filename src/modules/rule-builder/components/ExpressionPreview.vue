<script setup lang="ts">
import { defineProps } from 'vue';
import type { GroupRules } from '../types/rule-builder.types';

const props = defineProps<{
  group: GroupRules,
  isFirstLvl?: boolean
}>();
</script>

<template>
  <div
    v-if="group.isActive"
    :class="props.group.type === 'AND' ? 'text-blue-600' : 'text-green-600'"
    class="p-2"
  >
    <p
      v-if="isFirstLvl"
      class="text-2xl font-bold"
    >
      {{ group.name }}
    </p>

    <span class="font-bold text-2xl">(</span>

    <div
      v-if="group.filters.length || group.subgroups.length"
      class="ml-4"
    >
      <ul class="flex flex-col gap-y-0.5">
        <li
          v-for="(filter, index) of group.filters"
          :key="filter.id"
          class="flex flex-col gap-1"
        >
          {{ filter.field || '(empty)' }} -> {{ filter.operator || '(empty)' }} -> {{ filter.value || '(empty)' }}

          <span
            v-if="group.filters.length - 1 !== index"
            class="font-extrabold"
          >
            {{ group.type }}
          </span>
        </li>
      </ul>

      <ul
        v-if="group.subgroups.length"
        class="mt-5"
      >
        <span class="font-extrabold">
          {{ group.type }}
        </span>

        <li
          v-for="subgroup of group.subgroups"
          :key="subgroup.id"
          class="mb-1 last:mb-0"
        >
          <ExpressionPreview :group="subgroup" />

          <span class="font-extrabold mt-1">
            {{ group.type }}
          </span>
        </li>
      </ul>
    </div>

    <span class="font-bold text-2xl">)</span>
  </div>
</template>

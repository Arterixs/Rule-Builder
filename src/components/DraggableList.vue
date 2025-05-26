<script setup lang="ts">
import { generateDragAndDropClass } from '../utils/generate-drag-and-drop-class';

const modelGroup = defineModel<unknown[]>('entity', { required: true })

const classForDragAndDrop = generateDragAndDropClass()
</script>

<template>
  <draggable
    class="flex flex-col gap-5 p-2.5"
    :list="modelGroup"
    :group="classForDragAndDrop"
    item-key="id"
    tag="ul"
    :handle="`.${classForDragAndDrop}`"
  >
    <template #item="{ element, index }">
      <li class="shadow-2xl">
        <slot
          :entity="element"
          :class-for-drag-and-drop
          :index
        />
      </li>
    </template>
  </draggable>
</template>

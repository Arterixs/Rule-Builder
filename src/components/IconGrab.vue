<script setup lang="ts">
defineProps<{
  isDisabled: boolean
}>()
</script>

<template>
  <i
    class="!text-2xl pi pi-equals"
    :class="isDisabled ? 'cursor-no-drop pointer-events-none pi-ban' : 'cursor-grab active:cursor-grabbing pi-equals'"
  />
</template>

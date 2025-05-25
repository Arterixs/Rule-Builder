<script setup lang="ts">
import { ConfirmDialog, DynamicDialog } from 'primevue';
import DefaultLayout from 'core/layouts/DefaultLayout.vue';
import { RuleBuilder } from 'modules/rule-builder';
</script>

<template>
  <DefaultLayout>
    <RuleBuilder />
  </DefaultLayout>

  <ConfirmDialog />
  <DynamicDialog />
</template>


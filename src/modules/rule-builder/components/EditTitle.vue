<script setup lang="ts">
import { ref, useTemplateRef, type ComponentPublicInstance } from 'vue';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

defineProps<{
  title: string
  disabled: boolean
}>()

const emit = defineEmits<{
  (e: 'change-title', value: string): void
}>()

const visible = ref(false);
const inputRef = useTemplateRef<ComponentPublicInstance<typeof InputText>>('input')

const onSave = () => {
  emit('change-title', inputRef.value?.$el.value)
  visible.value = false
}
</script>

<template>
  <Button
    icon="pi pi-pencil"
    severity="help"
    :disabled="disabled"
    raised
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    modal
    header="Edit title group"
    :style="{ width: '40rem' }"
  >
    <div class="flex flex-col gap-2">
      <label
        for="title"
        class="font-semibold w-24"
      >
        Title group
      </label>
      <InputText
        id="title"
        ref="input"
        class="flex-auto"
        autocomplete="off"
        :default-value="title"
      />
    </div>

    <template #footer>
      <Button
        label="Cancel"
        severity="warn"
        autofocus
        @click="visible = false"
      />
      <Button
        label="Save"
        severity="success"
        autofocus
        @click="onSave"
      />
    </template>
  </Dialog>
</template>

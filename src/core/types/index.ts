import type { Ref } from 'vue';
import type { UUID as typeUUID } from 'node:crypto';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';

export type UUID = typeUUID

export type DialogModalInstance = Ref<DynamicDialogInstance>

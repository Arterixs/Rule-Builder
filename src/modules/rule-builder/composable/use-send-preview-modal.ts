import { defineAsyncComponent, type Ref } from 'vue';
import { useDialog } from 'primevue';
import type { GroupRules } from '../types/rule-builder.types';

export const useSendPreviewModal = (groups: Ref<GroupRules[]>) => {
  const dialog = useDialog();

  const dynamicComponent = defineAsyncComponent(() => import('../components/DialogPreview.vue'));

  const showPreview = () => {
    dialog.open(dynamicComponent, {
      data: {
        groups: groups.value,
      },
      props: {
        header: 'Rule Preview',
        style: {
          width: '800px',
          height: '400px'
        },
        modal: true
      }
    });
  }


  return {
    showPreview
  }
}

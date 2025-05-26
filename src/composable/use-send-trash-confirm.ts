import { isRef, type MaybeRef } from 'vue';
import { useConfirm } from "primevue/useconfirm";

interface Options {
  callback?: () => void,
  title?: MaybeRef<string>
}


export function useSendTrashConfirmGroup(options?: Options) {
  const confirm = useConfirm()

  const confirmGroup = () => {
    const unwrappedTitle = isRef(options?.title) ? options.title.value : options?.title
    const titleGroup = unwrappedTitle ? `"${unwrappedTitle}"` : ''

    confirm.require({
      message: `Do you want to delete this group ${titleGroup}?`,
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        if (options?.callback) {
          options.callback()
        }
      },
    });
  };

  return {
    confirmGroup,
  }
}

export const useSendTrashConfirmFilter = (callback?: () => void) => {
  const confirm = useConfirm()

  const confirmFilter = () => {
    confirm.require({
      message: 'Do you want to delete this filter?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        if (callback) {
          callback()
        }
      },
    });
  };

  return {
    confirmFilter
  }
}

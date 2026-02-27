import { ref } from 'vue'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  duration: number
}

const toasts = ref<Toast[]>([])
let nextId = 1

export function useToast() {
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000): void => {
    const toast: Toast = {
      id: nextId++,
      message,
      type,
      duration
    }

    toasts.value.push(toast)

    setTimeout(() => {
      removeToast(toast.id)
    }, duration)
  }

  const removeToast = (id: number): void => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  return {
    toasts,
    showToast,
    removeToast
  }
}

<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        :class="['toast', `toast-${toast.type}`]"
      >
        <span class="toast-icon">
          {{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ' }}
        </span>
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" @click="removeToast(toast.id)">✕</button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 300px;
  max-width: 400px;
  pointer-events: auto;
  font-size: 0.95rem;
}

.toast-success {
  border-left: 4px solid #10b981;
}

.toast-error {
  border-left: 4px solid #ef4444;
}

.toast-info {
  border-left: 4px solid #3b82f6;
}

.toast-icon {
  font-weight: bold;
  font-size: 1.2rem;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.toast-success .toast-icon {
  background: #d1fae5;
  color: #10b981;
}

.toast-error .toast-icon {
  background: #fee2e2;
  color: #ef4444;
}

.toast-info .toast-icon {
  background: #dbeafe;
  color: #3b82f6;
}

.toast-message {
  flex: 1;
  color: #333;
}

.toast-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  color: #333;
}

/* Toast transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .toast-container {
    top: 1rem;
    right: 1rem;
    left: 1rem;
  }

  .toast {
    min-width: unset;
    max-width: unset;
  }
}
</style>

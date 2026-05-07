<template>
  <div class="cart-icon" @click="$emit('toggle')">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    <span v-if="count > 0" class="cart-badge">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  count: number
}

defineProps<Props>()
defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
.cart-icon {
  position: relative;
  cursor: pointer;
  color: white;
  padding: 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ff4757;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .cart-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .cart-badge {
    min-width: 16px;
    height: 16px;
    font-size: 0.65rem;
  }
}
</style>

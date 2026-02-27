<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h2>🛒 Your Cart ({{ itemCount }})</h2>
            <button class="close-btn" @click="$emit('close')" aria-label="Close cart">
              ✕
            </button>
          </div>

          <div class="modal-body">
            <div v-if="items.length === 0" class="empty-cart">
              <p>Your cart is empty</p>
              <p class="empty-subtitle">Start adding some amazing albums!</p>
            </div>

            <div v-else class="cart-items">
              <div v-for="item in items" :key="item.id" class="cart-item">
                <img :src="item.image_url" :alt="item.title" class="cart-item-image" />
                <div class="cart-item-info">
                  <h3 class="cart-item-title">{{ item.title }}</h3>
                  <p class="cart-item-artist">{{ item.artist }}</p>
                  <p class="cart-item-price">${{ item.price.toFixed(2) }}</p>
                </div>
                <button 
                  class="remove-btn" 
                  @click="$emit('remove', item.id)"
                  aria-label="Remove from cart"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>

          <div v-if="items.length > 0" class="modal-footer">
            <div class="total">
              <span class="total-label">Total:</span>
              <span class="total-price">${{ totalPrice.toFixed(2) }}</span>
            </div>
            <button class="checkout-btn">Checkout</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { CartItem } from '../types/cart'

interface Props {
  isOpen: boolean
  items: CartItem[]
  itemCount: number
  totalPrice: number
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  remove: [itemId: number]
}>()

const handleOverlayClick = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 15px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.empty-cart p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.empty-subtitle {
  font-size: 0.9rem;
  opacity: 0.7;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.cart-item:hover {
  background: #f0f0f0;
  transform: translateX(5px);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.cart-item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
}

.cart-item-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}

.cart-item-artist {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.cart-item-price {
  margin: 0;
  font-size: 1.1rem;
  font-weight: bold;
  color: #667eea;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  align-self: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #ffe0e0;
  transform: scale(1.1);
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
}

.total-label {
  color: #333;
}

.total-price {
  color: #667eea;
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 100%;
    margin: 0;
    border-radius: 15px 15px 0 0;
    max-height: 95vh;
  }

  .cart-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .cart-item-image {
    width: 100%;
    height: 150px;
  }

  .remove-btn {
    align-self: center;
  }
}
</style>

<script setup lang="ts">
const cartStore = useCartStore();
const loadCart = () => {
  const cart = localStorage.getItem('cartItems');
  if (cart) {
    cartStore.setCart(JSON.parse(cart));
  }
};

onMounted(() => {
  loadCart();
});
</script>

<template>
  <NuxtLink to="/cart">
    <Button
      v-if="cartStore.cartCount > 0"
      :badge="cartStore.cartCount.toString() || '0'"
      icon="pi pi-shopping-cart"
      label="Cart"
      outlined
      size="small"
      text
    />
  </NuxtLink>
</template>

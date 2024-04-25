<script setup lang="ts">
defineProps<{ item: ProductWithQuantityType }>();

const cartStore = useCartStore();
const addToCart = (value: ProductWithQuantityType) => {
  cartStore.addToCart(value);
  localStorage.setItem('cartItems', JSON.stringify(cartStore.cart));
  toast.success('Item added to cart');
};
</script>

<template>
  <Button
    :disabled="isInStock(item) === 'OUT OF STOCK'"
    icon="pi pi-shopping-cart"
    rounded
    @click.stop.prevent="addToCart(item)"
  />
</template>

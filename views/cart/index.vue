<script setup lang="ts">
const cartStore = useCartStore();
watch(cartStore.$state, (state) => {
  localStorage.setItem('cartItems', JSON.stringify(state.cart));
});
const totalPrice = computed(() => {
  return cartStore.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
});
</script>

<template>
  <div v-if="cartStore.cartCount > 0">
    <div class="overflow-x-auto rounded-md bg-surface-200 dark:bg-surface-700">
      <table class="w-full text-left text-sm">
        <thead class="text-xs uppercase">
          <tr>
            <th
              class="px-6 py-3"
              scope="col"
            >
              Image
            </th>
            <th
              class="px-6 py-3"
              scope="col"
            >
              Product Name
            </th>
            <th
              class="px-6 py-3"
              scope="col"
            >
              Price
            </th>
            <th
              class="text-center"
              scope="col"
            >
              Quantity
            </th>
            <th
              class="px-6 py-3"
              scope="col"
            ></th>
          </tr>
        </thead>
        <tbody class="font-semibold">
          <tr
            v-for="item in cartStore.cart"
            :key="item.id"
            class="odd:bg-surface-100 even:bg-white odd:dark:bg-surface-900 even:dark:bg-surface-800"
          >
            <td class="px-6 py-4">
              <Img
                :alt="item.name"
                image-class="rounded-md"
                preview
                :src="item.images[0] || ''"
                width="100"
              />
            </td>
            <td class="px-6 py-4">{{ item.name }}</td>
            <td class="px-6 py-4">${{ item.price }}</td>
            <td class="text-center">{{ item.quantity }}</td>
            <td class="px-6 py-4">
              <Button
                class=""
                icon="pi pi-trash"
                severity="danger"
                text
                type="button"
                @click="cartStore.removeFromCart(item)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Divider />
    <div class="flex flex-col items-end">
      <span class="font-bold">Total price: ${{ totalPrice }}</span>
      <Button
        class="w-fit place-self-center"
        icon="pi pi-money-bill"
        label="Checkout"
      />
    </div>
  </div>
  <h2
    v-else
    class="text-center"
  >
    Cart is empty
  </h2>
</template>

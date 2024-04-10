<script setup lang="ts">
const props = defineProps({
  refresh: {
    type: Function,
    default: () => {},
  },
});

const visible = defineModel<boolean>("visible");
const productName = ref("");
const productPrice = ref(0);

const addProduct = async () => {
  await useFetch("/api/products/product", {
    method: "POST",

    body: JSON.stringify({
      name: productName.value,
      price: productPrice.value,
    }),
  });
  visible.value = false;
  props.refresh();
};
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <h2>Add Product</h2>
    </template>
    <form class="mt-10 flex flex-col gap-2">
      <InputText
        v-model="productName"
        placeholder="Product name"
      />
      <InputNumber
        v-model="productPrice"
        placeholder="Product price"
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    </form>
    <template #footer>
      <Button
        label="Add"
        icon="pi pi-check"
        autofocus
        @click="addProduct"
      />
    </template>
  </Dialog>
</template>

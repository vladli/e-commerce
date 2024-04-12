<script setup lang="ts">
const props = defineProps({
  refresh: {
    type: Function,
    default: () => {}
  }
});

const visible = defineModel<boolean>('visible');
const productName = ref('');
const productPrice = ref(0);
const selectedCategory = ref();

const loading = ref(false);

async function addProduct() {
  await $fetch('/api/products/product', {
    method: 'POST',
    body: {
      name: productName.value,
      price: productPrice.value,
      category: selectedCategory.value.code
    },
    onRequest() {
      loading.value = true;
    },
    onResponse() {
      toast.success('Product added successfully!');
      // visible.value = false;
      loading.value = false;
      props.refresh();
    }
  });
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    header="Header"
    modal
    :style="{ width: '50rem' }"
  >
    <template #header>
      <h2>Add Product</h2>
    </template>
    <form class="mx-auto mt-10 flex w-1/2 flex-col gap-2">
      <InputText
        v-model="productName"
        placeholder="Product name"
      />
      <InputNumber
        v-model="productPrice"
        currency="USD"
        locale="en-US"
        mode="currency"
        placeholder="Product price"
      />
      <CascadeSelect
        v-model="selectedCategory"
        class="w-fit"
        :option-group-children="['subCategory', 'items']"
        option-group-label="name"
        option-label="cname"
        :options="categories"
        placeholder="Select a category"
      />
    </form>
    <template #footer>
      <Button
        autofocus
        icon="pi pi-plus"
        label="Add"
        :loading="loading"
        @click="addProduct"
      />
    </template>
  </Dialog>
</template>

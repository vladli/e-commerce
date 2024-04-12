<script setup lang="ts">
const props = defineProps({
  product: {
    type: Object,
    default: null
  },
  refresh: {
    type: Function,
    default: () => {}
  }
});

const productInfo = ref({
  ID: props.product?.id,
  Name: props.product?.name,
  Price: props.product?.price
});
watch(
  () => props.product,
  (newValue) => {
    productInfo.value = {
      ID: newValue?.id,
      Name: newValue?.name,
      Price: newValue?.price
    };
  }
);
const removeProductVisible = defineModel<boolean>('removeProductVisible');

const removeProduct = async () => {
  await $fetch(`/api/products/product`, {
    method: 'DELETE',
    query: { id: props.product?.id },
    onResponse() {
      toast.success('Product removed successfully!');
      removeProductVisible.value = false;
      props.refresh();
    }
  });
};
</script>

<template>
  <Dialog
    v-model:visible="removeProductVisible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    header="Remove product"
    modal
    :style="{ width: '50rem' }"
  >
    <div>
      <h3 class="mb-3">
        Do you want to remove this product?
      </h3>
      <p
        v-for="(value, key) in productInfo"
        :key="key"
      >
        <span class="font-bold">{{ key }}:</span>
        {{ value }}
      </p>
    </div>
    <template #footer>
      <Button
        autofocus
        icon="pi pi-check"
        label="Delete"
        @click="removeProduct"
      />
      <Button
        icon="pi pi-times"
        label="Cancel"
        severity="danger"
        @click="removeProductVisible = false"
      />
    </template>
  </Dialog>
</template>

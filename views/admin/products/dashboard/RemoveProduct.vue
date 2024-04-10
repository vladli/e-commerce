<script setup lang="ts">
const props = defineProps({
  productId: {
    type: String,
  },
  refresh: {
    type: Function,
    default: () => {},
  },
});
const removeProductVisible = defineModel<boolean>("removeProductVisible");

const removeProduct = async () => {
  await useFetch(`/api/products/product`, {
    method: "DELETE",
    query: { id: props.productId },
  });
  removeProductVisible.value = false;
  props.refresh();
};
</script>

<template>
  <Dialog
    v-model:visible="removeProductVisible"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <p>Do you want to remove product with id {{ productId }}?</p>
    <template #footer>
      <Button
        label="Remove"
        icon="pi pi-check"
        @click="removeProduct"
        autofocus
      />
      <Button
        label="Cancel"
        icon="pi pi-times"
        @click="removeProductVisible = false"
        severity="danger"
      />
    </template>
  </Dialog>
</template>

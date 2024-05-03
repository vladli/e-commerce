<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  refresh: {
    type: Function,
    required: false,
    default: () => {}
  }
});

const { data: products } = await useFetch(`/api/stores/products`, {
  query: {
    storeId: route.params.storeId
  }
});

const { data: sizes } = await useFetch(`/api/stores/sizes`, {
  query: {
    storeId: route.params.storeId
  }
});
const { data: colors } = await useFetch(`/api/stores/colors`, {
  query: {
    storeId: route.params.storeId
  }
});

const visible = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    quantity: z.number().min(1, {
      message: 'Quantity is required'
    }),
    selectedProduct: z.object({
      id: z.string()
    }),
    selectedSize: z.object({
      id: z.string()
    }),
    selectedColor: z.object({
      id: z.string()
    })
  })
);

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema
});

const { value: selectedProduct } = useField<string>('selectedProduct');
const { value: selectedSize } = useField<string>('selectedSize');
const { value: selectedColor } = useField<string>('selectedColor');
const { value: quantity } = useField<number>('quantity');

const onSubmit = handleSubmit((values, actions) => {
  const response = $fetch('/api/stores/inventory/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      productId: values.selectedProduct.id,
      sizeId: values.selectedSize.id,
      colorId: values.selectedColor.id,
      quantity: values.quantity
    }
  }).then(() => {
    props.refresh();
    visible.value = false;
    actions.resetForm();
  });
  toast.promise(response, {
    loading: 'Creating inventory...',
    success: 'Inventory created successfully!',
    error: 'An error occurred while creating the inventory'
  });
});
</script>

<template>
  <Button
    icon="pi pi-external-link"
    label="New Inventory"
    size="small"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    :style="{ width: '20rem' }"
    @hide="resetForm"
  >
    <template #header>Create Inventory</template>

    <form
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <Dropdown
        v-model="selectedProduct"
        :invalid="errors.selectedProduct ? true : false"
        option-label="name"
        :options="products as any[]"
        placeholder="Select Product"
        required
      />
      <Dropdown
        v-model="selectedSize"
        :invalid="errors.selectedSize ? true : false"
        option-label="name"
        :options="sizes as any[]"
        placeholder="Select Size"
        required
      />
      <Dropdown
        v-model="selectedColor"
        :invalid="errors.selectedColor ? true : false"
        option-label="name"
        :options="colors as any[]"
        placeholder="Select Color"
        required
      />
      <InputNumber
        v-model="quantity"
        :invalid="errors.quantity ? true : false"
        placeholder="Quantity (ex: 10)"
        required
      />
      <small v-if="errors.quantity">
        {{ errors.quantity }}
      </small>

      <Button
        :disabled="!meta.valid"
        icon="pi pi-plus"
        label="Create"
        size="small"
        type="submit"
      />
    </form>
  </Dialog>
</template>

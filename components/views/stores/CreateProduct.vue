<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  refresh: {
    type: Function,
    required: false,
    default: () => {}
  }
});

const { data: categories } = await useFetch('/api/stores/categories', {
  query: {
    storeId: route.params.storeId
  }
});
const { data: sizes } = await useFetch('/api/stores/sizes', {
  query: {
    storeId: route.params.storeId
  }
});
const { data: colors } = await useFetch('/api/stores/colors', {
  query: {
    storeId: route.params.storeId
  }
});
const visible = ref(false);

const productIsFeatured = ref();
const productIsAchieved = ref();

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, {
      message: 'Name is required'
    }),
    price: z.number().min(1, {
      message: 'Value is required'
    }),
    categoryId: z.object({
      id: z.string()
    }),
    sizeId: z.object({
      id: z.string()
    }),
    colorId: z.object({
      id: z.string()
    }),
    images: z.array(z.string())
  })
);

const { handleSubmit, meta, resetForm } = useForm({
  validationSchema
});

const { value: name } = useField<string>('name');
const { value: price } = useField<number>('price');
const { value: categoryId } = useField('categoryId');
const { value: sizeId } = useField('sizeId');
const { value: colorId } = useField('colorId');
const { push } = useFieldArray('images');

const onSubmit = handleSubmit((values, actions) => {
  const response = $fetch('/api/stores/products/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      categoryId: values.categoryId.id,
      name: values.name,
      price: values.price,
      isFeatured: productIsFeatured.value,
      isAchieved: productIsAchieved.value,
      sizeId: values.sizeId.id,
      colorId: values.colorId.id,
      images: values.images
    }
  }).then(() => {
    props.refresh();
    visible.value = false;
    actions.resetForm();
  });
  toast.promise(response, {
    loading: 'Creating product...',
    success: 'Product created successfully!',
    error: 'An error occurred while creating the product'
  });
});

const imageUpload = async (data: any) => {
  push(data.value.info.public_id as never);
};
</script>

<template>
  <Button
    icon="pi pi-external-link"
    label="New Product"
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
    <template #header>Create Product</template>

    <form
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <InputText
        v-model="name"
        placeholder="Product name"
        required
      />
      <InputNumber
        v-model="price"
        placeholder="Product price"
        required
      />
      <Dropdown
        v-model="categoryId"
        option-label="name"
        :options="categories as any[]"
        placeholder="Select category"
      />
      <Dropdown
        v-model="sizeId"
        option-label="name"
        :options="sizes as any[]"
        placeholder="Select size"
      />
      <Dropdown
        v-model="colorId"
        option-label="name"
        :options="colors as any[]"
        placeholder="Select color"
      />
      <CldUploadWidget
        v-slot="{ open }"
        :options="{
          sources: ['local', 'url'],
          folder: `e-commerce/${route.params.storeId}/products`
        }"
        signature-endpoint="/api/imageUpload"
        @upload="imageUpload"
      >
        <Button
          outlined
          severity="secondary"
          size="small"
          type="button"
          @click="open"
        >
          Upload an Image
        </Button>
      </CldUploadWidget>
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

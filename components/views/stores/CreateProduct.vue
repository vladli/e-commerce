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
const productName = ref();
const productPrice = ref();
const productIsFeatured = ref();
const productIsAchieved = ref();
const sizeId = ref();
const categoryId = ref();
const colorId = ref();
const images = ref([]);

const createSize = async () => {
  const response = await $fetch('/api/stores/products/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      categoryId: categoryId.value.id as string,
      name: productName.value,
      price: productPrice.value,
      isFeatured: productIsFeatured.value,
      isAchieved: productIsAchieved.value,
      sizeId: sizeId.value.id,
      colorId: colorId.value.id,
      images: images.value
    }
  });
  if (response) {
    toast.success('Product created successfully!');
    props.refresh();
  }
};

const imageUpload = async (data: any) => {
  images.value.push(data.value.info.public_id as never);
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
  >
    <template #header>Create Product</template>

    <form>
      <InputText
        v-model="productName"
        class="w-full"
        placeholder="Product name"
        required
      />
      <InputNumber
        v-model="productPrice"
        class="w-full"
        placeholder="Product price"
        required
      />
      <Dropdown
        v-model="categoryId"
        class="w-full md:w-56"
        option-label="name"
        :options="categories as any[]"
        placeholder="Select a Category"
      />
      <Dropdown
        v-model="sizeId"
        class="w-full md:w-56"
        option-label="name"
        :options="sizes as any[]"
        placeholder="Select a Category"
      />
      <Dropdown
        v-model="colorId"
        class="w-full md:w-56"
        option-label="name"
        :options="colors as any[]"
        placeholder="Select a Category"
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
          type="button"
          @click="open"
        >
          Upload an Image
        </Button>
      </CldUploadWidget>
    </form>
    <template #footer>
      <Button
        icon="pi pi-plus"
        label="Create"
        size="small"
        @click="createSize"
      />
    </template>
  </Dialog>
</template>

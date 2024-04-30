<script setup lang="ts">
const props = defineProps({
  refresh: {
    type: Function,
    default: () => {}
  }
});

const visible = defineModel<boolean>('visible');
const productName = ref('');
const productInventory = ref();
const productPrice = ref();
const imageLinks = ref();
const selectedCategory = ref();

const loading = ref(false);

const disabled = ref(false);
const onAdvancedUpload = async (event: any) => {
  disabled.value = true;
  const files = event.files;
  const images = [];
  for (const img of files) {
    const base64 = await getBase64FromUrl(img.objectURL);
    images.push(base64);
  }
  const imgUpload = await $fetch('/api/upload', {
    method: 'POST',
    body: images
  });
  imageLinks.value = imgUpload;
  if (imgUpload) {
    disabled.value = false;
    toast.success('Images uploaded successfully!');
  }
};

async function addProduct() {
  await $fetch('/api/products/product', {
    method: 'POST',
    body: {
      name: productName.value,
      price: productPrice.value,
      category: selectedCategory.value.code,
      images: imageLinks.value,
      inventory: 10
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
    <form class="mx-auto mt-10 flex flex-col gap-2">
      <InputText
        v-model="productName"
        placeholder="Product name"
      />
      <div class="w-full">
        <CascadeSelect
          v-model="selectedCategory"
          class="w-1/3"
          :option-group-children="['subCategory', 'items']"
          option-group-label="name"
          option-label="cname"
          :options="categories"
          placeholder="Select a category"
        />
        <InputNumber
          v-model="productPrice"
          class="w-1/3"
          currency="USD"
          locale="en-US"
          mode="currency"
          placeholder="Product price"
        />
        <InputNumber
          v-model="productInventory"
          class="w-1/3"
          placeholder="Inventory"
        />
      </div>
      <FileUpload
        accept="image/*"
        custom-upload
        :disabled="disabled"
        :max-file-size="1000000"
        :multiple="true"
        name="demo[]"
        @uploader="onAdvancedUpload"
      >
        <template #empty>
          <p>Drag and drop files to here to upload.</p>
        </template>
      </FileUpload>
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

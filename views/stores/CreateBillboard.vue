<script setup lang="ts">
const props = defineProps({
  refresh: {
    type: Function,
    required: false,
    default: () => {}
  }
});
const route = useRoute();
const visible = ref(false);
const storeName = ref('');
const image = ref('');
const createStore = async () => {
  const response = await $fetch('/api/stores/billboard/create', {
    method: 'POST',
    body: {
      label: storeName.value,
      storeId: route.params.storeId,
      image: image.value
    }
  });
  if (response) {
    toast.success('Billboard created successfully!');
    props.refresh();
  }
};

const imageUpload = (data: any) => {
  image.value = data.value.info.public_id as never;
};
</script>

<template>
  <Button
    icon="pi pi-external-link"
    label="New Billboard"
    size="small"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    :style="{ width: '20rem' }"
  >
    <template #header>Create Billboard</template>

    <form>
      <InputText
        v-model="storeName"
        autocomplete="off"
        class="w-full"
        placeholder="Billboard name"
        required
      />
      <CldUploadWidget
        v-slot="{ open }"
        :options="{
          sources: ['local', 'url'],
          multiple: false,
          cropping: true,
          folder: `e-commerce/${route.params.storeId}/billboards`
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
        @click="createStore"
      />
    </template>
  </Dialog>
</template>

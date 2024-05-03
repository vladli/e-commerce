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
const image = ref('');

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, {
      message: 'Name is required'
    })
  })
);

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema
});

const { value: name } = useField<string>('name');

const onSubmit = handleSubmit((values, actions) => {
  const response = $fetch('/api/stores/billboard/create', {
    method: 'POST',
    body: {
      label: values.name,
      storeId: route.params.storeId,
      image: image.value
    }
  }).then(() => {
    props.refresh();
    visible.value = false;
    actions.resetForm();
  });
  toast.promise(response, {
    loading: 'Creating billboard...',
    success: 'Billboard created successfully!',
    error: 'An error occurred while creating the billboard'
  });
});

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
    @hide="resetForm"
  >
    <template #header>Create Billboard</template>

    <form
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <InputText
        v-model="name"
        :invalid="errors.name ? true : false"
        placeholder="Billboard name"
        required
      />
      <small v-if="errors.name">{{ errors.name }}</small>
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

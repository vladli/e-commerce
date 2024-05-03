<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  refresh: {
    type: Function,
    required: false,
    default: () => {}
  }
});

const visible = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, {
      message: 'Name is required'
    }),
    value: z.string().min(1, {
      message: 'Value is required'
    })
  })
);

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema
});

const { value: name } = useField<string>('name');
const { value: value } = useField<string>('value');

const onSubmit = handleSubmit((values, actions) => {
  const response = $fetch('/api/stores/sizes/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      name: values.name,
      value: values.value
    }
  }).then(() => {
    props.refresh();
    visible.value = false;
    actions.resetForm();
  });
  toast.promise(response, {
    loading: 'Creating size...',
    success: 'Size created successfully!',
    error: 'An error occurred while creating the size'
  });
});
</script>

<template>
  <Button
    icon="pi pi-external-link"
    label="New Size"
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
    <template #header>Create Size</template>

    <form
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <InputText
        v-model="name"
        :invalid="errors.name ? true : false"
        placeholder="Size name (ex: Medium)"
        required
      />
      <small v-if="errors.name">
        {{ errors.name }}
      </small>
      <InputText
        v-model="value"
        :invalid="errors.value ? true : false"
        placeholder="Value (ex: M)"
        required
      />
      <small v-if="errors.value">
        {{ errors.value }}
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

<script setup lang="ts">
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
    })
  })
);

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema
});

const { value: name } = useField<string>('name');

const onSubmit = handleSubmit(async (values, actions) => {
  const response = await $fetch('/api/stores/create', {
    method: 'POST',
    body: {
      name: values.name
    }
  });
  if (response) {
    toast.success('Store created successfully!');
    props.refresh();
    visible.value = false;
    actions.resetForm();
  }
});
</script>

<template>
  <Button
    icon="pi pi-external-link"
    label="New Store"
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
    <template #header>Create Store</template>
    <form
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <InputText
        v-model="name"
        class="w-full"
        :invalid="errors.name ? true : false"
        placeholder="Store name"
      />
      <small v-if="errors.name">{{ errors.name }}</small>
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

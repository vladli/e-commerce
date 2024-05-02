<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  refresh: {
    type: Function,
    required: false,
    default: () => {}
  }
});
const { data } = await useFetch(`/api/stores/billboard`, {
  query: {
    storeId: route.params.storeId
  }
});
const visible = ref(false);

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, {
      message: 'Name is required'
    }),
    selectedBillboard: z.object({
      id: z.string()
    })
  })
);

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema
});

const { value: name } = useField<string>('name');
const { value: selectedBillboard } = useField('selectedBillboard');

const onSubmit = handleSubmit(async (values, actions) => {
  const response = await $fetch('/api/stores/categories/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      billboardId: values.selectedBillboard.id,
      name: values.name
    }
  });
  if (response) {
    toast.success('Category created successfully!');
    props.refresh();
    visible.value = false;
    actions.resetForm();
  }
});
</script>

<template>
  <Button
    icon="pi pi-external-link"
    label="New Category"
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
    <template #header>Create Category</template>

    <form
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <InputText
        v-model="name"
        :invalid="errors.name ? true : false"
        placeholder="Category name"
        required
      />
      <small v-if="errors.name">{{ errors.name }}</small>
      <Dropdown
        v-model="selectedBillboard"
        :invalid="errors.selectedBillboard ? true : false"
        option-label="label"
        :options="data as any[]"
        placeholder="Select a Billboard"
        required
      />
      <small v-if="errors.selectedBillboard">
        {{ errors.selectedBillboard }}
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

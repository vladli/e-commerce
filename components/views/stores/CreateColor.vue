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
    value: z
      .string()
      .min(1, {
        message: 'Value is required'
      })
      .regex(/^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: 'Invalid hex color'
      })
  })
);

const { handleSubmit, errors, meta } = useForm({
  validationSchema
});

const { value: name } = useField<string>('name');
const { value: value } = useField<string>('value');

const onSubmit = handleSubmit(async (values, actions) => {
  const response = await $fetch('/api/stores/colors/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      name: values.name,
      value: values.value
    }
  });
  if (response) {
    toast.success('Color created successfully!');
    props.refresh();
    visible.value = false;
    actions.resetForm();
  }
});
</script>

<template>
  <Button
    icon="pi pi-external-link"
    label="New Color"
    size="small"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    modal
    :style="{ width: '20rem' }"
  >
    <template #header>Create Color</template>

    <form
      class="flex flex-col gap-2"
      @submit="onSubmit"
    >
      <InputText
        v-model="name"
        :invalid="errors.name ? true : false"
        placeholder="Color name (ex: Red)"
        required
      />
      <small v-if="errors.name">
        {{ errors.name }}
      </small>
      <ColorPicker
        v-model="value"
        class="mx-auto"
        format="hex"
        inline
        input-id="cp-hex"
      />
      <InputText
        v-model="value"
        :invalid="errors.value ? true : false"
        placeholder="Color value (ex: FF0000)"
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

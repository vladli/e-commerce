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
const colorName = ref();
const colorValue = ref();

const createColor = async () => {
  const response = await $fetch('/api/stores/colors/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      name: colorName.value,
      value: colorValue.value
    }
  });
  if (response) {
    toast.success('Color created successfully!');
    props.refresh();
  }
};
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

    <form>
      <InputText
        v-model="colorName"
        class="w-full"
        placeholder="Color name"
        required
      />

      <ColorPicker
        v-model="colorValue"
        class="mb-3"
        format="hex"
        input-id="cp-hex"
      />
    </form>
    <template #footer>
      <Button
        icon="pi pi-plus"
        label="Create"
        size="small"
        @click="createColor"
      />
    </template>
  </Dialog>
</template>

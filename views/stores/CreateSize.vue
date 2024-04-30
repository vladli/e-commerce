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
const sizeName = ref();
const sizeValue = ref();

const createSize = async () => {
  const response = await $fetch('/api/stores/sizes/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      name: sizeName.value,
      value: sizeValue.value
    }
  });
  if (response) {
    toast.success('Size created successfully!');
    props.refresh();
  }
};
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
  >
    <template #header>Create Size</template>

    <form>
      <InputText
        v-model="sizeName"
        class="w-full"
        placeholder="Size name"
        required
      />
      <InputText
        v-model="sizeValue"
        class="w-full"
        placeholder="Value"
        required
      />
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

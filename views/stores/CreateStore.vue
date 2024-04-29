<script setup lang="ts">
const props = defineProps({
  refresh: {
    type: Function,
    required: false,
    default: () => {}
  }
});
const visible = ref(false);
const storeName = ref('');
const createStore = async () => {
  const response = await $fetch('/api/stores/create', {
    method: 'POST',
    body: {
      name: storeName.value
    }
  });
  if (response) {
    toast.success('Store created successfully!');
    props.refresh();
  }
};
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
  >
    <template #header>Create Store</template>

    <form>
      <InputText
        id="storeName"
        v-model="storeName"
        autocomplete="off"
        class="w-full"
        placeholder="Store name"
      />
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

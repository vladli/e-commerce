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
const createStore = async () => {
  const response = await $fetch('/api/stores/billboard/create', {
    method: 'POST',
    body: {
      label: storeName.value,
      storeId: route.params.storeId,
      image: ''
    }
  });
  if (response) {
    toast.success('Billboard created successfully!');
    props.refresh();
  }
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
        id="storeName"
        v-model="storeName"
        autocomplete="off"
        class="w-full"
        placeholder="Billboard name"
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

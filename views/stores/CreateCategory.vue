<script setup lang="ts">
const route = useRoute();

const props = defineProps({
  refresh: {
    type: Function,
    required: false,
    default: () => {}
  }
});
const { data } = await useFetch(`/api/stores/billboard/allBillboards`, {
  query: {
    storeId: route.params.storeId
  }
});
const visible = ref(false);
const categoryName = ref('');
const selectedBillboard = ref();

const createCategory = async () => {
  const response = await $fetch('/api/stores/categories/create', {
    method: 'POST',
    body: {
      storeId: route.params.storeId,
      billboardId: selectedBillboard.value.id,
      name: categoryName.value
    }
  });
  if (response) {
    toast.success('Category created successfully!');
    props.refresh();
  }
};
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
  >
    <template #header>Create Category</template>

    <form>
      <InputText
        v-model="categoryName"
        autocomplete="off"
        class="w-full"
        placeholder="Category name"
        required
      />
      <Dropdown
        v-model="selectedBillboard"
        class="w-full md:w-56"
        option-label="label"
        :options="data as any[]"
        placeholder="Select a Billboard"
      />
    </form>
    <template #footer>
      <Button
        icon="pi pi-plus"
        label="Create"
        size="small"
        @click="createCategory"
      />
    </template>
  </Dialog>
</template>

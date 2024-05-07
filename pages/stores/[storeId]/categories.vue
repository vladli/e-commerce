<script setup lang="ts">
const route = useRoute();
const { data: categories, refresh } = useFetch('/api/stores/categories', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteCategory = (data: any) => {
  const result = $fetch('/api/stores/categories', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting category...',
    success: 'Category deleted successfully!',
    error: 'An error occurred while deleting the category'
  });
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Categories">
    <DataTable :value="categories">
      <template #header>
        <ViewsStoresCreateCategory :refresh="refresh" />
      </template>
      <Column
        field="name"
        header="Name"
      ></Column>
      <Column
        field="billboard.label"
        header="Billboard"
      ></Column>

      <Column header="Created At">
        <template #body="slotProps">
          {{ $dayjs(slotProps.data.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </Column>
      <Column header="">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            text
            @click="deleteCategory(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ categories ? categories.length : 0 }} categories.
      </template>
    </DataTable>
  </Page>
</template>

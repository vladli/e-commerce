<script setup lang="ts">
const route = useRoute();

const { data: sizes, refresh } = useFetch('/api/stores/sizes', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteSize = (data: any) => {
  const result = $fetch('/api/stores/sizes', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting size...',
    success: 'Size deleted successfully!',
    error: 'An error occurred while deleting the size'
  });
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Sizes">
    <DataTable :value="sizes">
      <template #header>
        <ViewsStoresCreateSize :refresh="refresh" />
      </template>
      <Column
        field="name"
        header="Name"
      ></Column>
      <Column
        field="value"
        header="Value"
      ></Column>

      <Column
        field="createdAt"
        header="Created At"
      ></Column>
      <Column header="">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            text
            @click="deleteSize(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ sizes ? sizes.length : 0 }} sizes.
      </template>
    </DataTable>
  </Page>
</template>

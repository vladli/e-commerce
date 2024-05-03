<script setup lang="ts">
const route = useRoute();

const { data, refresh } = useFetch('/api/stores/colors', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteColor = (data: any) => {
  const result = $fetch('/api/stores/colors', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting color...',
    success: 'Color deleted successfully!',
    error: 'An error occurred while deleting the color'
  });
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Colors">
    <DataTable :value="data">
      <template #header>
        <ViewsStoresCreateColor :refresh="refresh" />
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
            @click="deleteColor(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ data ? data.length : 0 }} colors.
      </template>
    </DataTable>
  </Page>
</template>

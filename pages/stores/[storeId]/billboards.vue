<script setup lang="ts">
const route = useRoute();
const {
  data: billboards,
  error,
  refresh
} = await useFetch(`/api/stores/billboard`, {
  query: {
    storeId: route.params.storeId
  }
});
if (error.value) {
  showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage
  });
}

const deleteBillboard = (data: any) => {
  const result = $fetch('/api/stores/billboard', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting billboard...',
    success: 'Billboard deleted successfully!',
    error: 'An error occurred while deleting the billboard'
  });
};

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
});
</script>

<template>
  <Page title="Billboards">
    <DataTable :value="billboards">
      <template #header>
        <ViewsStoresCreateBillboard :refresh="refresh" />
      </template>
      <Column
        field="label"
        header="Label"
      ></Column>
      <Column header="Image">
        <template #body="slotProps">
          <Img
            :alt="slotProps.data.image"
            class="w-24 rounded shadow-md"
            preview
            :src="slotProps.data.image"
          />
        </template>
      </Column>

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
            @click="deleteBillboard(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ billboards ? billboards.length : 0 }} billboards.
      </template>
    </DataTable>
  </Page>
</template>

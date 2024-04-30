<script setup lang="ts">
const route = useRoute();
const { data, error, refresh } = await useFetch(`/api/stores/billboard`, {
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
definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Billboards">
    <DataTable :value="data">
      <template #header>
        <StoresCreateBillboard :refresh="refresh" />
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
            :src="slotProps.data.image"
          />
        </template>
      </Column>

      <Column
        field="createdAt"
        header="Created At"
      ></Column>

      <template #footer>
        In total there are {{ data ? data.length : 0 }} billboards.
      </template>
    </DataTable>
  </Page>
</template>

<script setup lang="ts">
const route = useRoute();

const { data, refresh } = useFetch('/api/stores/sizes', {
  query: {
    storeId: route.params.storeId
  }
});

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Sizes">
    <DataTable :value="data">
      <template #header>
        <StoresCreateSize :refresh="refresh" />
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

      <template #footer>
        In total there are {{ data ? data.length : 0 }} categories.
      </template>
    </DataTable>
  </Page>
</template>
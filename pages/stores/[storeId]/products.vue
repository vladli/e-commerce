<script setup lang="ts">
const { data, refresh } = useFetch('/api/stores/products');

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Products">
    <DataTable :value="data">
      <template #header>
        <StoresCreateSize :refresh="refresh" />
      </template>
      <Column
        field="name"
        header="Name"
      />
      <Column
        field="price"
        header="price"
      />
      <Column
        field="size"
        header="size"
      />
      <Column
        field="category"
        header="category"
      />
      <Column
        field="color"
        header="color"
      />

      <template #footer>
        In total there are {{ data ? data.length : 0 }} categories.
      </template>
    </DataTable>
  </Page>
</template>

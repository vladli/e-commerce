<script setup lang="ts">
const route = useRoute();

const { data, refresh } = useFetch('/api/stores/products', {
  query: {
    storeId: route.params.storeId
  }
});

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Products">
    <DataTable :value="data">
      <template #header>
        <ViewsStoresCreateProduct :refresh="refresh" />
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
        field="size.name"
        header="size"
      />
      <Column
        field="category.name"
        header="category"
      />
      <Column
        field="color.name"
        header="color"
      />

      <template #footer>
        In total there are {{ data ? data.length : 0 }} products.
      </template>
    </DataTable>
  </Page>
</template>

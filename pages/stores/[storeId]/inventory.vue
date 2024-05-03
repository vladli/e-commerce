<script setup lang="ts">
const route = useRoute();

const { data, refresh } = useFetch('/api/stores/inventory', {
  query: {
    storeId: route.params.storeId
  }
});

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Inventory">
    <DataTable :value="data">
      <template #header>
        <ViewsStoresCreateInventory :refresh="refresh" />
      </template>
      <Column
        field="product.name"
        header="Name"
      ></Column>
      <Column
        field="size.name"
        header="Size"
      ></Column>
      <Column
        field="color.name"
        header="Color"
      ></Column>
      <Column
        field="quantity"
        header="Quantity"
      ></Column>

      <Column
        field="createdAt"
        header="Created At"
      ></Column>

      <template #footer>
        In total there are {{ data ? data.length : 0 }} items.
      </template>
    </DataTable>
  </Page>
</template>

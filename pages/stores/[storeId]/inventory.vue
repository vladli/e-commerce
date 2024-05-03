<script setup lang="ts">
const route = useRoute();

const { data: inventory, refresh } = useFetch('/api/stores/inventory', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteInventory = (data: any) => {
  const result = $fetch('/api/stores/inventory', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting inventory...',
    success: 'Inventory deleted successfully!',
    error: 'An error occurred while deleting the inventory'
  });
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Inventory">
    <DataTable :value="inventory">
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
      <Column header="">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            text
            @click="deleteInventory(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ inventory ? inventory.length : 0 }} items.
      </template>
    </DataTable>
  </Page>
</template>

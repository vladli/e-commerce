<script setup lang="ts">
const route = useRoute();

const { data: products, refresh } = useFetch('/api/stores/products', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteProduct = (data: any) => {
  const result = $fetch('/api/stores/product', {
    method: 'DELETE',
    body: {
      productId: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting product...',
    success: 'Product deleted successfully!',
    error: 'An error occurred while deleting the product'
  });
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Products">
    <DataTable :value="products">
      <template #header>
        <ViewsStoresCreateProduct :refresh="refresh" />
      </template>
      <Column
        field="name"
        header="Name"
      />
      <Column
        field="price"
        header="Price"
      />

      <Column
        field="category.name"
        header="Category"
      />
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
            @click="deleteProduct(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ products ? products.length : 0 }} products.
      </template>
    </DataTable>
  </Page>
</template>

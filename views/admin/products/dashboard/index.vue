<script setup lang="ts">
const { data: products, refresh } = await useFetch('/api/products');

const product = ref(undefined);
const visible = ref(false);
const removeProductVisible = ref(false);

const removeProduct = (productInfo: any) => {
  product.value = productInfo;
  removeProductVisible.value = true;
};
</script>

<template>
  <DataTable
    show-gridlines
    striped-rows
    :value="products"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <span>Products: {{ products?.length || 0 }}</span>
        </div>

        <Button
          class="w-fit"
          icon="pi pi-plus"
          label="Add Product"
          outlined
          severity="secondary"
          size="small"
          @click="visible = true"
        />
      </div>
    </template>
    <Column
      field="name"
      header="Name"
      sortable
    />
    <Column
      field="price"
      header="Price"
      sortable
    >
      <template #body="slotProps">
        {{ slotProps.data.price }}
      </template>
    </Column>
    <Column
      class="max-w-10"
      field="status"
      header="Status"
    >
      <template #body="slotProps">
        <div class="flex justify-center gap-2">
          <IconButton
            icon-name="material-symbols:edit"
            outlined
            rounded
            severity="secondary"
            size="small"
            @click="console.log(slotProps.data)"
          />
          <IconButton
            icon-name="material-symbols:delete"
            outlined
            rounded
            severity="danger"
            size="small"
            @click="removeProduct(slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>
  <AdminProductsDashboardAddProduct
    v-model:visible="visible"
    :refresh="refresh"
  />
  <AdminProductsDashboardRemoveProduct
    v-model:removeProductVisible="removeProductVisible"
    :product="product"
    :refresh="refresh"
  />
</template>

<script setup lang="ts">
const { data: products, refresh } = await useFetch("/api/products");
const activeId = ref<string | undefined>(undefined);
const visible = ref(false);
const removeProductVisible = ref(false);

const removeProduct = (productId: string) => {
  activeId.value = productId;
  removeProductVisible.value = true;
};
</script>

<template>
  <DataTable
    :value="products"
    show-gridlines
    striped-rows
  >
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <span>Products: {{ products?.length || 0 }}</span>
        </div>
        <IconButton
          size="small"
          icon-name="material-symbols:add"
          @click="visible = true"
        >
          Add Product
        </IconButton>
      </div>
    </template>
    <Column
      sortable
      field="name"
      header="Name"
    />
    <Column
      sortable
      field="price"
      header="Price"
    >
      <template #body="slotProps">
        {{ slotProps.data.price }}
      </template>
    </Column>
    <Column
      class="max-w-10"
      header="Status"
      field="status"
    >
      <template #body="slotProps">
        <div class="flex justify-center gap-2">
          <IconButton
            severity="secondary"
            icon-name="material-symbols:edit"
            rounded
            outlined
            size="small"
            @click="console.log(slotProps.data.id)"
          />
          <IconButton
            icon-name="material-symbols:delete"
            severity="danger"
            rounded
            @click="removeProduct(slotProps.data.id)"
            outlined
            size="small"
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
    :refresh="refresh"
    :product-id="activeId"
  />
</template>

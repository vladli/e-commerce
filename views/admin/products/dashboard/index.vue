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
    <template #empty>
      <div class="text-center font-bold">No data</div>
    </template>
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
      class="max-w-28"
      header="Stock"
    >
      <template #body="slotProps">
        <div class="flex flex-col items-center gap-y-1">
          <Tag
            :severity="
              isInStock(slotProps.data) == 'IN STOCK' ? 'success' : 'danger'
            "
            :value="isInStock(slotProps.data)"
          />
          {{ slotProps.data.inventory || 0 }}
        </div>
      </template>
    </Column>
    <Column
      field="name"
      header="Name"
      sortable
    />
    <Column header="Image">
      <template #body="slotProps">
        <NuxtImg
          :alt="slotProps.data.image"
          class="w-20 rounded shadow-md"
          :src="slotProps.data.image"
        />
      </template>
    </Column>
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
      field="category"
      header="Category"
      sortable
    >
      <template #body="slotProps">
        {{ getCnameByCode(slotProps.data.category) || slotProps.data.category }}
      </template>
    </Column>
    <Column
      class="max-w-24"
      field="status"
      header="Actions"
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

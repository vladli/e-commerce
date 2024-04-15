<script setup lang="ts">
import type { DataViewProps } from 'primevue/dataview';

const { data }: any = useFetch('/api/products');

const layout = ref<DataViewProps['layout']>('grid');

const getSeverity = (item: any) => {
  return item.inventory >= 10 ? 'success' : 'danger';
};
const inventoryStatus = (item: any) => {
  return item.inventory >= 10 ? 'IN STOCK' : 'OUT OF STOCK';
};
</script>

<template>
  <UIBox>
    <DataView
      :data-key="data.id"
      :layout="layout"
      paginator
      :pt="{
        content: '',
        header: 'p-4'
      }"
      :rows="6"
      :value="data"
    >
      <template #header>
        <div class="flex justify-end">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template>
      <template #list="slotProps">
        <MainListView
          :get-severity="getSeverity"
          :items="slotProps.items"
        />
      </template>
      <template #grid="slotProps">
        <MainGridView
          :get-severity="getSeverity"
          :items="slotProps.items"
        />
      </template>
    </DataView>
  </UIBox>
</template>

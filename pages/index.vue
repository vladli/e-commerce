<script setup lang="ts">
import type { DataViewProps } from 'primevue/dataview';

const { data } = useFetch('/api/products');

const layout = ref<DataViewProps['layout']>('grid');

const getSeverity = (item: any) => {
  return item.inventory >= 10 ? 'success' : 'danger';
};
</script>

<template>
  <Page>
    <DataView
      data-key="1"
      :layout="layout"
      paginator
      :pt="{
        content: '',
        header: 'p-4'
      }"
      :rows="6"
      :value="data as any[]"
    >
      <template #header>
        <div class="flex justify-end">
          <DataViewLayoutOptions v-model="layout" />
        </div>
      </template>
      <template #list="slotProps">
        <ViewsMainListView
          :get-severity="getSeverity"
          :items="slotProps.items"
        />
      </template>
      <template #grid="slotProps">
        <ViewsMainGridView
          :get-severity="getSeverity"
          :items="slotProps.items"
        />
      </template>
    </DataView>
  </Page>
</template>

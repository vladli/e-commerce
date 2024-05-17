<script setup lang="ts">
import type { DataTableRowEditSaveEvent } from 'primevue/datatable';

const route = useRoute();
const { data: categories, refresh } = useFetch('/api/stores/categories', {
  query: {
    storeId: route.params.storeId
  }
});

const { data: billboards } = useFetch('/api/stores/billboard', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteCategory = (data: any) => {
  const result = $fetch('/api/stores/categories', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting category...',
    success: 'Category deleted successfully!',
    error: 'An error occurred while deleting the category'
  });
};

const editingRows = ref();

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const result = $fetch('/api/stores/categories', {
    method: 'PUT',
    query: {
      id: event.data.id,
      storeId: event.data.storeId
    },
    body: {
      name: event.newData.name,
      billboardId: event.newData.billboardId
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Saving category...',
    success: 'Category saved successfully!',
    error: 'An error occurred while saving the category'
  });
};

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
});
</script>

<template>
  <Page title="Categories">
    <DataTable
      v-model:editingRows="editingRows"
      edit-mode="row"
      :value="categories"
      @row-edit-save="onRowEditSave"
    >
      <template #header>
        <ViewsStoresCreateCategory :refresh="refresh" />
      </template>
      <Column
        field="name"
        header="Name"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>
      <Column
        field="billboard.label"
        header="Billboard"
      >
        <template #editor="{ data }">
          <Dropdown
            v-model="data['billboardId']"
            option-label="label"
            option-value="id"
            :options="billboards as any[]"
          ></Dropdown>
        </template>
      </Column>

      <Column header="Created At">
        <template #body="slotProps">
          {{ $dayjs(slotProps.data.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </Column>
      <Column
        body-style="text-align:right"
        :row-editor="true"
      />
      <Column header="">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            rounded
            severity="danger"
            text
            @click="deleteCategory(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ categories ? categories.length : 0 }} categories.
      </template>
    </DataTable>
  </Page>
</template>

<script setup lang="ts">
import type { DataTableRowEditSaveEvent } from 'primevue/datatable';

const route = useRoute();

const { data: sizes, refresh } = useFetch('/api/stores/sizes', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteSize = (data: any) => {
  const result = $fetch('/api/stores/sizes', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting size...',
    success: 'Size deleted successfully!',
    error: 'An error occurred while deleting the size'
  });
};

const editingRows = ref();

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const result = $fetch('/api/stores/sizes', {
    method: 'PUT',
    query: {
      id: event.data.id,
      storeId: event.data.storeId
    },
    body: {
      name: event.newData.name,
      value: event.newData.value
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Saving size...',
    success: 'Size saved successfully!',
    error: 'An error occurred while saving the size'
  });
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Sizes">
    <DataTable
      v-model:editingRows="editingRows"
      edit-mode="row"
      :value="sizes"
      @row-edit-save="onRowEditSave"
    >
      <template #header>
        <ViewsStoresCreateSize :refresh="refresh" />
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
        field="value"
        header="Value"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
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
            @click="deleteSize(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ sizes ? sizes.length : 0 }} sizes.
      </template>
    </DataTable>
  </Page>
</template>

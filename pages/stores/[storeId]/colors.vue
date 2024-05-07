<script setup lang="ts">
import type { DataTableRowEditSaveEvent } from 'primevue/datatable';

const route = useRoute();

const {
  data: colors,
  refresh,
  pending
} = useFetch('/api/stores/colors', {
  query: {
    storeId: route.params.storeId
  }
});

const deleteColor = (data: any) => {
  const result = $fetch('/api/stores/colors', {
    method: 'DELETE',
    body: {
      id: data.id
    }
  }).then(() => {
    refresh();
  });
  toast.promise(result, {
    loading: 'Deleting color...',
    success: 'Color deleted successfully!',
    error: 'An error occurred while deleting the color'
  });
};

const editingRows = ref();

const onRowEditSave = (event: DataTableRowEditSaveEvent) => {
  const result = $fetch('/api/stores/colors', {
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
    loading: 'Saving color...',
    success: 'Color saved successfully!',
    error: 'An error occurred while saving the color'
  });
};

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Colors">
    <DataTable
      v-model:editingRows="editingRows"
      edit-mode="row"
      :loading="pending"
      :value="colors"
      @row-edit-save="onRowEditSave"
    >
      <template #header>
        <ViewsStoresCreateColor :refresh="refresh" />
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
          <div class="flex items-center gap-2">
            <InputText
              v-model="data[field]"
              disabled
            />
            <ColorPicker v-model="data[field]" />
          </div>
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
            @click="deleteColor(data)"
          />
        </template>
      </Column>
      <template #footer>
        In total there are {{ colors ? colors.length : 0 }} colors.
      </template>
    </DataTable>
  </Page>
</template>

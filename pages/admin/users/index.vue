<script setup lang="ts">
const { data } = useFetch('/api/admin/users');
definePageMeta({
  middleware: 'admin'
});
</script>

<template>
  <UIPage title="Users">
    <DataTable :value="data">
      <Column
        field="name"
        header="Name"
        sortable
      />
      <Column
        field="email"
        header="Email"
        sortable
      />
      <Column
        field="role"
        header="Role"
        sortable
      />
      <Column
        field="createdAt"
        header="Created At"
        sortable
      />
    </DataTable>
  </UIPage>
</template>

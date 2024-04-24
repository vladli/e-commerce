<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
});
useHead({
  title: 'Products'
});
</script>

<template>
  <UIPage title="Products">
    <AdminProductsDashboard />
  </UIPage>
</template>

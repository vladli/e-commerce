<script setup lang="ts">
definePageMeta({
  middleware: 'admin'
});
useHead({
  title: 'Products'
});
</script>

<template>
  <Page title="Products">
    <AdminProductsDashboard />
  </Page>
</template>

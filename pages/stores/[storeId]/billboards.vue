<script setup lang="ts">
const route = useRoute();
const { data } = await useFetch(`/api/stores/billboard/:storeId`, {
  query: {
    storeId: route.params.storeId
  }
});

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Billboards">
    <h3>{{ data }}</h3>
  </Page>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = await useFetch(`/api/stores/store/:storeId`, {
  query: {
    storeId: route.params.storeId
  }
});

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Settings">
    <h2>{{ data?.name }}</h2>
  </Page>
</template>

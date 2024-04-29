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
  <Page :title="data?.name">asd</Page>
</template>

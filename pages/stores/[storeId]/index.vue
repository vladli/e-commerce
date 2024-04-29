<script setup lang="ts">
const route = useRoute();

const { data, error } = await useFetch(`/api/stores/store/:storeId`, {
  query: {
    storeId: route.params.storeId
  }
});
if (error.value) {
  showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage
  });
}

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page :title="data?.name">asd</Page>
</template>

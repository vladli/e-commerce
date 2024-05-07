<script setup lang="ts">
const route = useRoute();
const id = route.params.storeId;

const { data, error } = await useFetch(`/api/stores/store/${id}`);

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

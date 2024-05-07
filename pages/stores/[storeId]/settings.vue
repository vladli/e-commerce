<script setup lang="ts">
const route = useRoute();
const id = route.params.storeId;

const { data } = await useFetch(`/api/stores/store/${id}`);

definePageMeta({
  layout: 'dashboard'
});
</script>

<template>
  <Page title="Settings">
    <h2>{{ data?.name }}</h2>
  </Page>
</template>

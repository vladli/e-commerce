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
  layout: 'dashboard',
  middleware: 'auth'
});
</script>

<template>
  <Page
    class="flex flex-wrap justify-around gap-4"
    :title="data?.name"
  >
    <ViewsStoresDashboardCard
      title="Billboards"
      :value="data?.billboards.length || 0"
    />
    <ViewsStoresDashboardCard
      title="Categories"
      :value="data?.categories.length || 0"
    />
    <ViewsStoresDashboardCard
      title="Sizes"
      :value="data?.sizes.length || 0"
    />
    <ViewsStoresDashboardCard
      title="Colors"
      :value="data?.colors.length || 0"
    />
    <ViewsStoresDashboardCard
      title="Products"
      :value="data?.products.length || 0"
    />
  </Page>
</template>

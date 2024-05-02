<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data, error } = useFetch('/api/stores/product', {
  query: {
    productId: id
  }
});
if (error.value) {
  showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage
  });
}
</script>

<template>
  <Page
    class="flex flex-col items-center"
    :title="data?.name"
  >
    <Img
      alt="Product image"
      image-class="rounded-md"
      preview
      :src="data?.images?.[0].url || ''"
      width="200"
    />
  </Page>
</template>

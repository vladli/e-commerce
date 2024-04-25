<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data, error } = useFetch('/api/products/product', {
  query: {
    id
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
    <Image
      alt="Product image"
      image-class="rounded-md"
      preview
      :src="data?.image || ''"
      width="250"
    />
  </Page>
</template>

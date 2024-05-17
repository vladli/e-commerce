<script setup lang="ts">
const route = useRoute();
const id = route.params.id;
const { data: shop, error } = useFetch(`/api/stores/store/${id}`);
if (error.value) {
  showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage
  });
}
</script>

<template>
  <Page :title="shop?.name">
    <div>
      <div
        v-for="product in shop?.products"
        :key="product.id"
        class="card max-w-xs"
      >
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <NuxtLink :to="`/product/${product.id}`">View Product</NuxtLink>
      </div>
    </div>
  </Page>
</template>

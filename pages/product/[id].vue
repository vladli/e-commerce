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
console.log(data.value);
</script>

<template>
  <Page
    class="flex flex-col items-center"
    :title="data?.name"
  >
    <Galleria
      :circular="true"
      container-style="max-width: 420px"
      :num-visible="5"
      :show-item-navigators="true"
      :value="data?.images"
    >
      <template #item="slotProps">
        <Img
          alt=""
          :src="slotProps.item.url"
          style="width: 100%; display: block"
        />
      </template>
      <template #thumbnail="slotProps">
        <Img
          alt=""
          :src="slotProps.item.url"
          style="display: block"
        />
      </template>
    </Galleria>

    <div></div>
  </Page>
</template>

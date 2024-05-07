<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

const { data, error } = useFetch(`/api/stores/product/${id}`);
if (error.value) {
  showError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage
  });
}
</script>

<template>
  <Page
    v-if="data"
    class="flex flex-col xl:flex-row"
  >
    <div class="p-4 xl:hidden">
      <h4 class="text-2xl font-bold">{{ data?.name }}</h4>
      <p class="text-lg">{{ data?.category?.name }}</p>
      <p class="text-lg">${{ data?.price }}</p>
      <CartAddButton :item="data as any" />
    </div>
    <div class="mx-auto max-w-screen-sm xl:mx-0">
      <Galleria
        id="galleria"
        circular
        :num-visible="5"
        :pt="{
          thumbnailitem: 'overflow-hidden',
          thumbnailitems: 'gap-2'
        }"
        :pt-options="{ mergeProps: true }"
        show-item-navigators
        thumbnails-position="left"
        :value="data?.images"
      >
        <template #item="slotProps">
          <NuxtImg
            alt=""
            provider="cloudinary"
            :src="slotProps.item.url"
          />
        </template>
        <template #thumbnail="slotProps">
          <NuxtImg
            alt=""
            class="max-w-24 object-fill"
            provider="cloudinary"
            :src="slotProps.item.url"
          />
        </template>
      </Galleria>
    </div>

    <div class="hidden flex-col p-4 xl:flex">
      <h4 class="text-2xl font-bold">{{ data?.name }}</h4>
      <p class="text-lg">{{ data?.category?.name }}</p>
      <p class="text-lg">${{ data?.price }}</p>
      <CartAddButton :item="data as any" />
    </div>
  </Page>
</template>

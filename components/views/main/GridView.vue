<script setup lang="ts">
defineProps<{
  items: any[];
  getSeverity: (item: any) => string;
}>();
</script>

<template>
  <div class="flex flex-wrap">
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      class="w-full p-3 sm:w-6/12 xl:w-4/12"
      :to="`/product/${item.id}`"
    >
      <div class="card rounded p-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <i class="pi pi-tag" />
            <span class="font-semibold">
              {{ item?.category?.name }}
            </span>
          </div>
        </div>
        <div class="flex flex-col items-center gap-3 py-5">
          <Img
            :alt="item.name"
            class="rounded shadow-md"
            :src="item.images?.[0].url || ''"
            width="200"
          />
        </div>
        <div class="flex items-center justify-around text-2xl font-bold">
          <span>{{ item.name }}</span>
          <span>${{ item.price }}</span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

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
              {{ getCnameByCode(item.category) || item.category }}
            </span>
          </div>
          <Tag
            :severity="getSeverity(item)"
            :value="isInStock(item)"
          />
        </div>
        <div class="flex flex-col items-center gap-3 py-5">
          <NuxtImg
            :alt="item.name"
            class="w-9/12 rounded shadow-md"
            :src="item.image"
          />
          <div class="text-2xl font-bold">
            {{ item.name }}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-semibold">${{ item.price }}</span>
          <CartAddButton :item="item" />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

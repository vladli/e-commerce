<script setup lang="ts">
defineProps<{
  items: any[];
  getSeverity: (item: any) => string;
}>();
</script>

<template>
  <div class="flex flex-wrap">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="w-full p-3"
    >
      <NuxtLink
        class="card flex flex-col gap-4 p-4 xl:flex-row xl:items-start"
        :to="`/product/${item.id}`"
      >
        <Img
          :alt="item.name"
          class="mx-auto block rounded shadow-md sm:w-64 xl:block xl:w-40"
          :src="item.images?.[0].url"
        />
        <div
          class="flex flex-1 flex-col items-center justify-between gap-4 sm:flex-row xl:items-start"
        >
          <div class="flex flex-col items-center gap-3 sm:items-start">
            <div
              class="text-2xl font-bold text-surface-900 dark:text-surface-0"
            >
              {{ item.name }}
            </div>

            <div class="flex items-center gap-3">
              <span class="flex items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">
                  {{ item.category?.name }}
                </span>
              </span>
            </div>
          </div>
          <div
            class="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2"
          >
            <span class="text-2xl font-semibold">${{ item.price }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

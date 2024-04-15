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
      class="w-full p-3 sm:w-6/12 xl:w-4/12"
    >
      <div
        class="rounded border border-surface-200 bg-surface-0 p-4 dark:border-surface-700 dark:bg-surface-800"
      >
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
          <Button
            :disabled="isInStock(item) === 'OUT OF STOCK'"
            icon="pi pi-shopping-cart"
            rounded
          />
        </div>
      </div>
    </div>
  </div>
</template>

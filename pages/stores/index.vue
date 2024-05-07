<script setup lang="ts">
const { data, refresh } = useFetch('/api/stores');

definePageMeta({
  middleware: 'auth'
});
</script>

<template>
  <Page title="My Stores">
    <div class="flex justify-end">
      <ViewsStoresCreateStore :refresh="refresh" />
    </div>
    <div
      v-if="data && data.length > 0"
      class="flex flex-wrap gap-2"
    >
      <NuxtLink
        v-for="item in data"
        :key="item.id"
        :to="`/stores/${item.id}`"
      >
        <Button
          outlined
          severity="secondary"
          size="small"
        >
          {{ item.name }}
        </Button>
      </NuxtLink>
    </div>
  </Page>
</template>

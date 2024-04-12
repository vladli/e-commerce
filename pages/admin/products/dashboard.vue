<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <UIBox class="flex flex-col gap-y-2">
    <h2 class="text-center">Products Dashboard</h2>
    <AdminProductsDashboard />
  </UIBox>
</template>

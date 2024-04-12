<script setup lang="ts">
import { Toaster } from '@steveyuowo/vue-hot-toast'
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <Toaster />
    <NuxtPage />
  </NuxtLayout>
</template>

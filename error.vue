<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({})
  }
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div
    class="flex h-dvh w-full items-center justify-center overflow-hidden bg-surface-0 dark:bg-surface-900"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            rgba(33, 150, 243, 0.4) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="flex w-full flex-col items-center bg-surface-100 px-5 py-8 dark:bg-surface-800 sm:px-8"
          style="border-radius: 53px"
        >
          <span class="text-3xl font-bold text-blue-500">
            {{ error.statusCode }}
          </span>
          <h1
            class="mb-2 text-3xl font-bold text-surface-700 dark:text-surface-0 lg:text-5xl"
          >
            Not Found
          </h1>
          <div class="mb-5 text-surface-700 dark:text-surface-0">
            {{ error.statusMessage }}
          </div>
          <Button @click="handleError">Back to home</Button>
        </div>
      </div>
    </div>
  </div>
</template>

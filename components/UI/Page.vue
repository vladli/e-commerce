<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false
  }
});
</script>

<template>
  <div
    class="rounded-md bg-surface-0 p-2 text-surface-700 shadow-md dark:bg-surface-900 dark:text-surface-0 flex flex-col gap-y-2"
  >
    <h2
      class="text-center"
      v-if="title"
    >
      {{ title }}
    </h2>
    <slot />
  </div>
</template>

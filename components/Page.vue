<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  }
});
defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <div
    class="z-10 flex flex-col gap-y-2 rounded-md bg-[var(--page-bg)] p-2 text-surface-700 shadow-sm dark:text-surface-0"
  >
    <h2
      v-if="title"
      class="text-center"
    >
      {{ title }}
    </h2>
    <div v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>

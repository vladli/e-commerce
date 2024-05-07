<script setup lang="ts">
defineProps<{
  title: string;
  value: number | string;
}>();
</script>

<template>
  <div class="card min-w-80 max-w-xs">
    <div class="flex items-center justify-around rounded-md text-xl font-bold">
      <div class="w-1/2 uppercase">{{ title }}</div>
      <div
        class="flex size-20 items-center justify-center rounded-full bg-slate-800"
      >
        {{ value }}
      </div>
    </div>
  </div>
</template>

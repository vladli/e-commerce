<script setup lang="ts">
interface ImgProps {
  src: string | undefined;
  preview?: boolean;
}
defineProps<ImgProps>();
</script>

<template>
  <Image
    alt="Image"
    :preview="preview"
  >
    <template #indicatoricon>
      <i class="pi pi-search"></i>
    </template>
    <template #image>
      <NuxtImg
        provider="cloudinary"
        v-bind="$attrs"
        :src="src || ''"
      />
    </template>
    <template #preview="slotProps">
      <NuxtImg
        alt="preview"
        provider="cloudinary"
        :src="src"
        :style="slotProps.style"
        @click="slotProps.onClick"
      />
    </template>
  </Image>
</template>

<script setup lang="ts">
const imageUpload = (images: string[]) => {
  console.log(images);
};
</script>

<template>
  <div>
    <CldUploadWidget
      v-slot="{ open }"
      :options="{
        sources: ['local', 'url']
      }"
      signature-endpoint="/api/imageUpload"
      @upload="imageUpload"
    >
      <Button
        type="button"
        @click="open"
      >
        Upload an Image
      </Button>
    </CldUploadWidget>
  </div>
</template>

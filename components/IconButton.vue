<script setup lang="ts">
import type { ButtonProps } from "primevue/button";

interface MyInputProps extends /* @vue-ignore */ ButtonProps {
  iconName: string;
}

defineProps<MyInputProps>();
</script>

<template>
  <Button class="gap-2 !p-2">
    <Icon :name="iconName" />
    <slot />
  </Button>
</template>

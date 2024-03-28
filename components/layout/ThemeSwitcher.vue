<script setup>
import { twMerge } from "tailwind-merge";
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
  <Button
    rounded
    outlined
    class="!p-3"
    @click="toggleTheme"
  >
    <Icon name="mdi:theme-light-dark" />
  </Button>
</template>
Button

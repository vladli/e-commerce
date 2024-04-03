<script setup>
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
  <Button
    severity="secondary"
    rounded
    text
    class="!p-2"
    @click="toggleTheme"
  >
    <Icon
      name="mdi:theme-light-dark"
      size="1.5em"
    />
  </Button>
</template>
Button

<script setup>
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "light" ? "dark" : "light";
}
</script>

<template>
  <Button
    class="!p-2"
    rounded
    severity="secondary"
    text
    @click="toggleTheme"
  >
    <Icon
      name="mdi:theme-light-dark"
      size="1.5em"
    />
  </Button>
</template>
Button

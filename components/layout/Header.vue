<script setup lang="ts">
const visible = ref(false);
</script>

<template>
  <header
    class="fixed left-0 top-0 z-50 flex h-20 w-full bg-surface-0 px-4 text-surface-700 dark:bg-surface-900 dark:text-surface-0"
  >
    <div class="flex grow items-center">
      <Logo />
      <Button
        class="lg:hidden"
        @click="visible = !visible"
      >
        <Icon name="material-symbols:menu" />
      </Button>
      <LayoutSideBarMobile v-model:visible="visible" />
    </div>

    <div class="flex items-center gap-2">
      <LayoutThemeSwitcher />
      <LayoutAuthButton />
    </div>
  </header>
</template>

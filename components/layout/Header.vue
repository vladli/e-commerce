<script setup lang="ts">
const visible = ref(false);
const topHeader = ref(false);

const handleScroll = () => {
  if (window.scrollY > 0) {
    topHeader.value = false;
  } else {
    topHeader.value = true;
  }
};
onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    class="fixed left-0 top-0 z-50 flex h-20 w-full px-4 text-surface-700 dark:text-surface-0"
    :class="{ scrolled: !topHeader }"
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

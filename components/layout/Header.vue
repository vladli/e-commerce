<script setup lang="ts">
const visible = ref(false);
const topHeader = ref(false);
const {
  status,

  signIn
} = useAuth();
const handleScroll = () => {
  if (window.scrollY > 0) {
    topHeader.value = true;
  } else {
    topHeader.value = false;
  }
};
onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    class="fixed left-0 top-0 z-50 flex h-20 w-full px-4 text-surface-700 dark:text-surface-0"
    :class="{ scrolled: topHeader }"
  >
    <div class="flex grow items-center gap-2">
      <Logo />
      <Button
        class="lg:hidden"
        icon="pi pi-align-justify"
        outlined
        severity="secondary"
        size="small"
        @click="visible = !visible"
      ></Button>
      <LayoutSideBarMobile v-model:visible="visible" />
    </div>

    <div class="flex items-center gap-2">
      <CartButton />
      <LayoutThemeSwitcher />
      <LayoutAuthButton class="hidden lg:block" />
      <Button
        v-if="status !== 'authenticated'"
        class="lg:hidden"
        @click="signIn('google')"
      >
        Log In
      </Button>
    </div>
  </header>
</template>

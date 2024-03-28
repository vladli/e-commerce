<template>
  <header
    class="fixed left-0 top-0 z-10 flex h-20 w-full bg-surface-0 px-4 text-surface-700 dark:bg-surface-900 dark:text-surface-0"
  >
    <div class="flex size-full select-none items-center gap-2">
      <Icon
        name="noto:shopping-cart"
        size="42"
      />
      <span class="text-xl font-bold text-primary-500">E-commerce</span>
    </div>
    <div class="flex items-center">
      <LayoutThemeSwitcher />
    </div>
  </header>
</template>

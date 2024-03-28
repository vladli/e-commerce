<template>
  <div class="flex min-h-dvh flex-col">
    <LayoutHeader />
    <div class="flex grow gap-2 bg-surface-100 p-4 pt-24 dark:bg-surface-800">
      <LayoutSidebar class="w-64 flex-none" />
      <main class="grow text-surface-700 dark:text-surface-0">
        <slot />
      </main>
    </div>
  </div>
</template>

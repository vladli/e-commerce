<template>
  <div class="flex min-h-dvh flex-col">
    <LayoutHeader />
    <div class="flex grow gap-2 p-4 pt-24">
      <LayoutSidebar class="w-64 flex-none" />
      <main class="grow overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

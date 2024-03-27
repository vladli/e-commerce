<template>
  <div class="flex flex-col min-h-dvh">
    <LayoutHeader />
    <div class="flex gap-2 grow p-4 bg-slate-100">
      <LayoutSidebar class="w-64" />
      <main class="bg-red-500 grow p-2">
        <slot />
      </main>
    </div>
  </div>
</template>

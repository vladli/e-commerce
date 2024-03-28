<template>
  <UIBox class="hidden lg:block">
    <div class="flex flex-col gap-1">
      <div
        v-for="item in mainMenu"
        :key="item.path"
      >
        <NuxtLink
          :to="item.path"
          class="flex items-center gap-2 rounded-lg p-2 transition-all duration-300 hover:bg-surface-100 dark:hover:bg-surface-800"
        >
          <Icon :name="item.icon" />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </UIBox>
</template>

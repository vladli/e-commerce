<template>
  <div class="bg-orange-300 flex flex-col gap-1">
    <div
      v-for="item in mainMenu"
      :key="item.path"
    >
      <NuxtLink
        :to="item.path"
        class="flex gap-2 items-center p-2 border rounded-lg"
      >
        <Icon :name="item.icon" />
        <span>{{ item.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

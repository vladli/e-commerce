<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <ul class="m-0 list-none overflow-hidden p-0 pl-1">
    <li
      v-for="child in item"
      :key="child.name"
    >
      <div
        v-if="child.children"
        v-ripple
        v-styleclass="{
          selector: '@next',
          enterClass: 'hidden',
          enterActiveClass: 'slidedown',
          leaveToClass: 'hidden',
          leaveActiveClass: 'slideup'
        }"
        class="flex cursor-pointer items-center justify-between rounded-md p-3 text-surface-700 transition-colors duration-200 hover:bg-surface-100 dark:text-surface-0/80 dark:hover:bg-surface-700"
      >
        <span class="font-medium">{{ child.name }}</span>
        <Icon name="ion:chevron-down" />
      </div>
      <template v-if="child.children">
        <LayoutMenuItem :item="child.children" />
      </template>
      <template v-else>
        <li :key="child.name">
          <NuxtLink
            class="flex cursor-pointer items-center rounded-md p-3 text-surface-700 transition-colors duration-200 hover:bg-surface-100 dark:text-surface-0/80 dark:hover:bg-surface-700"
            :to="child.path"
          >
            {{ child.name }}
          </NuxtLink>
        </li>
      </template>
    </li>
  </ul>
</template>

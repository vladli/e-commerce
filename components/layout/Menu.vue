<script setup lang="ts"></script>

<template>
  <div class="mt-4 overflow-y-auto">
    <ul class="m-0 list-none px-4">
      <li
        v-for="(item, index) in mainMenu"
        :key="index + item.name"
      >
        <div
          v-ripple
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'slideup'
          }"
          class="flex cursor-pointer items-center justify-between rounded-md p-3 text-surface-600 dark:text-surface-400"
        >
          <span class="font-medium">{{ item.name }}</span>
          <Icon name="ion:chevron-down" />
        </div>
        <LayoutMenuItem
          v-if="item.children"
          :item="item.children"
        />
      </li>
    </ul>
  </div>
</template>

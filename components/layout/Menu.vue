<script setup lang="ts"></script>

<template>
  <div class="mt-4 overflow-y-auto">
    <ul
      v-for="item in mainMenu"
      :key="item.name"
      class="m-0 list-none px-4"
    >
      <li>
        <div
          v-ripple
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'slidedown',
            leaveToClass: 'hidden',
            leaveActiveClass: 'slideup',
          }"
          class="flex cursor-pointer items-center justify-between rounded-md p-3 text-surface-600 dark:text-surface-400"
        >
          <span class="font-medium">{{ item.name }}</span>
          <Icon name="ion:chevron-down" />
        </div>
        <ul
          v-if="item.children"
          class="m-0 list-none overflow-hidden p-0"
        >
          <li
            v-for="child in item.children"
            :key="child.name"
          >
            <NuxtLink
              v-if="!child.children"
              v-ripple
              :to="child.path"
              class="flex cursor-pointer items-center rounded-md p-3 text-surface-700 transition-colors duration-200 hover:bg-surface-100 dark:text-surface-0/80 dark:hover:bg-surface-700"
            >
              <Icon
                :name="child.icon"
                class="mr-2"
              />
              <span class="font-medium">{{ child.name }}</span>
            </NuxtLink>
            <div v-else>
              <div
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterClass: 'hidden',
                  enterActiveClass: 'slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'slideup',
                }"
                class="flex cursor-pointer items-center rounded-md p-3 text-surface-700 transition-colors duration-200 hover:bg-surface-100 dark:text-surface-0/80 dark:hover:bg-surface-700"
              >
                <Icon
                  :name="child.icon"
                  class="mr-2"
                />
                <span class="font-medium">{{ child.name }}</span>
                <Icon
                  name="ion:chevron-down"
                  class="ml-auto"
                />
              </div>
              <ul
                v-for="child2 in child.children"
                :key="child2.name"
                class="m-0 hidden list-none overflow-y-hidden py-0 pl-3 pr-0 transition-all duration-500 ease-in-out"
              >
                <li>
                  <NuxtLink
                    v-ripple
                    :to="child2.path"
                    class="flex cursor-pointer items-center rounded-md p-3 text-surface-700 transition-colors duration-200 hover:bg-surface-100 dark:text-surface-0/80 dark:hover:bg-surface-700"
                  >
                    <Icon
                      :name="child2.icon"
                      class="mr-2"
                    />
                    <span class="font-medium">{{ child2.name }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

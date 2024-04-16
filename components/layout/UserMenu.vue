<script setup lang="ts">
const { data, signOut } = useAuth();
const model = defineModel<any>('menu');
const items = ref<any>([
  {
    separator: true
  },
  {
    label: 'Profile',
    icon: 'iconamoon:profile',
    url: '/profile'
  },
  {
    label: 'Sign Out',
    icon: 'uil:signout',
    command: signOut
  }
]);
</script>

<template>
  <div class="flex justify-center">
    <Menu
      ref="model"
      class="w-full md:w-60"
      :model="items"
      :popup="true"
    >
      <template #start>
        <div
          class="relative flex w-full items-center overflow-hidden rounded-none p-2 pl-3 text-surface-700 dark:text-surface-0/80"
        >
          <Avatar
            class="mr-2"
            :image="data?.user?.image || ''"
            shape="circle"
          />
          <span class="inline-flex flex-col justify-start">
            <span class="font-bold">
              {{ data?.user?.name || data?.user?.email }}
            </span>
            <span class="text-sm capitalize">{{ data?.user?.role }}</span>
          </span>
        </div>
      </template>

      <template #item="{ item, props }">
        <NuxtLink
          v-if="item.url"
          v-ripple
          v-bind="props.action"
          class="flex items-center"
          :to="item.url"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
          />
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            class="ml-auto"
            :value="item.badge"
          />
        </NuxtLink>
        <a
          v-else
          v-ripple
          class="flex items-center"
          v-bind="props.action"
          @click="item.command"
        >
          <Icon
            v-if="item.icon"
            :name="item.icon"
          />
          <span class="ml-2">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            class="ml-auto"
            :value="item.badge"
          />
        </a>
      </template>
    </Menu>
  </div>
</template>

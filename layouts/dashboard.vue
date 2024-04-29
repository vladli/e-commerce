<script setup lang="ts">
const route = useRoute();
const storeId = ref();
watchEffect(() => {
  storeId.value = route.params.storeId;
});

const menu = computed(() => [
  {
    title: 'Dashboard',
    icon: 'pi pi-home',
    route: `/stores/${storeId.value}`
  },

  {
    title: 'Billboards',
    icon: 'pi pi-image',
    route: `/stores/${storeId.value}/billboards`
  },
  {
    title: 'Settings',
    icon: 'pi pi-cog',
    route: `/stores/${storeId.value}/settings`
  }
]);
</script>

<template>
  <div>
    <header class="layout">
      <Menubar
        v-if="storeId"
        :model="menu"
        :pt="{
          root: 'rounded-none bg-transparent dark:bg-transparent',
          content: 'rounded-none'
        }"
        :pt-options="{ mergeProps: true }"
      >
        <template #start>
          <Logo class="mr-4" />
        </template>
        <template #item="{ item, props }">
          <NuxtLink
            v-ripple
            v-bind="props.action"
            active-class="bg-primary-500 "
            class="flex items-center"
            :to="item.route"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.title }}</span>
          </NuxtLink>
        </template>
        <template #end>
          <div class="flex items-center gap-2">
            <LayoutAuthButton />
          </div>
        </template>
      </Menubar>
    </header>
    <main class="grow overflow-auto p-4">
      <slot />
    </main>
  </div>
</template>

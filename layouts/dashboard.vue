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
    title: 'Edit',
    icon: 'pi pi-pencil',
    items: [
      {
        title: 'Billboards',
        icon: 'pi pi-images',
        route: `/stores/${storeId.value}/billboards`
      },
      {
        title: 'Categories',
        icon: 'pi pi-book',
        route: `/stores/${storeId.value}/categories`
      },
      {
        title: 'Sizes',
        icon: 'pi pi-spinner-dotted',
        route: `/stores/${storeId.value}/sizes`
      },
      {
        title: 'Colors',
        icon: 'pi pi-palette',
        route: `/stores/${storeId.value}/colors`
      },
      {
        title: 'Products',
        icon: 'pi pi-barcode',
        route: `/stores/${storeId.value}/products`
      },
      {
        title: 'Inventory',
        icon: 'pi pi-list',
        route: `/stores/${storeId.value}/inventory`
      }
    ]
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
          root: 'rounded-none bg-transparent dark:bg-transparent h-20 px-4',
          menu: 'md:bg-transparent md:dark:bg-transparent',
          content: 'rounded-none '
        }"
        :pt-options="{ mergeProps: true }"
      >
        <template #start>
          <Logo class="mr-4" />
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
          <NuxtLink
            v-ripple
            v-bind="props.action"
            active-class="bg-primary-500 text-surface-100"
            class="flex items-center"
            :to="item.route"
          >
            <span :class="item.icon" />
            <span class="ml-2">{{ item.title }}</span>
            <i
              v-if="hasSubmenu"
              :class="[
                'pi pi-angle-down text-primary-500 dark:text-primary-400',
                { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }
              ]"
            ></i>
          </NuxtLink>
        </template>
        <template #end>
          <div class="flex items-center gap-2">
            <LayoutThemeSwitcher />
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

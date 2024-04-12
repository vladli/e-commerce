<script setup lang="ts">
const visible = defineModel("visible", {
  type: Boolean,
  required: true,
});
const { status, data } = useAuth();
</script>

<template>
  <Sidebar v-model:visible="visible">
    <template #container="{ closeCallback }">
      <div class="flex h-full flex-col">
        <div class="flex shrink-0 items-center justify-between px-4 pt-4">
          <div class="inline-flex items-center gap-2">
            <Logo />
          </div>
          <Button
            class="!p-2"
            outlined
            rounded
            type="button"
            @click="closeCallback"
          >
            <Icon name="material-symbols:close" />
          </Button>
        </div>

        <LayoutMenu />

        <div
          v-if="status == 'authenticated'"
          class="mt-auto"
        >
          <hr class="mx-3 mb-3 border-t-2 border-surface-200 dark:border-surface-700">
          <a
            v-ripple
            class="m-3 flex cursor-pointer items-center gap-2 rounded-md p-3 text-surface-700 transition-colors duration-200 hover:bg-surface-100 dark:text-surface-0/80 dark:hover:bg-surface-700"
          >
            <Avatar
              :image="data?.user?.image || ''"
              shape="circle"
            />
            <span class="font-bold">{{ data?.user?.name || data?.user?.email }}</span>
          </a>
        </div>
      </div>
    </template>
  </Sidebar>
</template>

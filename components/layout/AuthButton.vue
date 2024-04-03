<script setup>
const {
  status,
  data,

  signIn,
} = useAuth();

const menu = ref();

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
<template>
  <div v-if="status === 'authenticated'">
    <Avatar
      :image="data?.user?.image || ''"
      aria-haspopup="true"
      shape="circle"
      size="large"
      class="cursor-pointer"
      @click="toggle"
    />
    <LayoutUserMenu v-model:menu="menu" />
  </div>
  <Button
    v-else
    @click="signIn"
  >
    Log In
  </Button>
</template>

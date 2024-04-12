<script setup>
const {
  status,
  data,

  signIn
} = useAuth();

const menu = ref();

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
<template>
  <div v-if="status === 'authenticated'">
    <Avatar
      aria-haspopup="true"
      class="cursor-pointer"
      :image="data?.user?.image || ''"
      shape="circle"
      size="large"
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

<script setup>
const {
  status,
  data,

  getSession,
  signIn,
  signOut,
} = useAuth();
</script>
<template>
  {{ data?.user?.email }}
  <Button
    v-if="status === 'authenticated'"
    size="small"
    @click="signOut"
  >
    Log Out
  </Button>
  <Button
    v-else
    size="small"
    @click="signIn"
  >
    Log In
  </Button>
</template>

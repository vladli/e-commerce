export default defineNuxtRouteMiddleware((to) => {
  const { data } = useAuth();
  if (data?.value?.user?.role === 'admin') {
    return;
  }
  return showError('You are not authorized to access this page');
});

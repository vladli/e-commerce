import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  // if (getRequestURL(event).pathname.startsWith('/api/stores')) {
  //   const session = await getServerSession(event);
  //   if (!session) {
  //     throw createError({
  //       statusCode: 401,
  //       statusMessage: 'Unauthorized',
  //       fatal: true
  //     });
  //   }
  // }
});

import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
  if (getRequestURL(event).pathname.startsWith('/api/admin')) {
    const session = await getServerSession(event);
    if (!session || session?.user?.role !== 'admin') {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        fatal: true
      });
    }
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  if (process.server) {
    process.on('unhandledRejection', (error: any) => {
      // Check if the error is the Prisma/Supabase idle connection drop
      if (error?.code === 'ECONNRESET' || error?.message?.includes('ECONNRESET')) {
        console.warn('⚠️ [Prisma/Supabase]: Dropped an idle connection (ECONNRESET). Recovering automatically...');
        return; // Prevent the server from crashing!
      }
      
      // Log other unhandled rejections normally
      console.error('Unhandled Rejection:', error);
    });
  }
});

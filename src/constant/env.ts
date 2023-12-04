export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const baseUrl =
  process.env.NEXT_PUBLIC_API_GATEWAY || 'http://localhost:3001/api/v1';

export const aiBaseUrl =
  process.env.NEXT_PUBLIC_AI_BASE_URL || 'http://localhost:9000';

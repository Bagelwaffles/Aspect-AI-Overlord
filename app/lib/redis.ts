import { Redis } from '@upstash/redis';

export const redis = Redis.fromEnv();
export const SESSION_TTL = 60 * 60 * 24; // 24 hours in seconds

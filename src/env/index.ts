import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.number().default(3333)
});

const envParsed = envSchema.safeParse(process.env);

if (envParsed.success === false) {
  console.log('Missing environment variables.', envParsed.error.format());

  throw new Error('Missing environment variables.');
}

export const env = envParsed.data;
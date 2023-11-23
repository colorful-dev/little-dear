import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import * as schema from './schema'
import { env } from '~/env.mjs'

const client = new Client({
  connectionString: env.DATABASE_URL,
})
await client.connect()
export const db = drizzle(client, { schema })

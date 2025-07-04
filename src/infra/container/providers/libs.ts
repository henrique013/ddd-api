import { t } from '@infra/container/tokens.js'
import { DependencyContainer } from 'tsyringe'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '@infra/orm/schema.js'
import { DrizzlePg } from '@infra/orm/types.js'
import { env } from '@infra/env.js'
import { Pool } from 'pg'
import { Connection, Publisher } from 'rabbitmq-client'

const MAX_TIMEOUT_MS = 5_000

export async function registerLibs(container: DependencyContainer) {
  const drizzlePg = connectToPg()
  const rabbit = await connectToRabbitMQ()
  const pub = createRabbitMQPublisher(rabbit)

  container.register(t.libs.DrizzlePg, {
    useValue: drizzlePg,
  })

  container.register(t.libs.RabbitMQPublisher, {
    useValue: pub,
  })
}

function connectToPg(): DrizzlePg {
  const pgPool = new Pool({
    connectionString: env.PG_API_URL,
    connectionTimeoutMillis: MAX_TIMEOUT_MS,
  })

  const drizzlePg: DrizzlePg = drizzle(pgPool, { schema })

  return drizzlePg
}

async function connectToRabbitMQ(): Promise<Connection> {
  const rabbit = new Connection(env.RABBITMQ_URL)

  return new Promise((resolve, reject) => {
    rabbit.on('error', (err) => reject(err))
    rabbit.on('connection', () => resolve(rabbit))
  })
}

function createRabbitMQPublisher(rabbit: Connection): Publisher {
  const pub = rabbit.createPublisher({
    confirm: true,
    maxAttempts: 2,
  })

  return pub
}

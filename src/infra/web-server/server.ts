import Fastify, { FastifyInstance } from 'fastify'
import { BaseError } from '@domain/errors.js'
import * as Sentry from '@sentry/node'
import cors from '@fastify/cors'
import rateLimit from '@fastify/rate-limit'
import { env } from '@infra/env.js'

export type ServerOptions = {
  port: number
  debug: boolean
  sentry_dsn: string | undefined
}

export class Server {
  private constructor(
    private readonly fastify: FastifyInstance,
    private readonly options: ServerOptions
  ) {}

  static async create(options: ServerOptions): Promise<Server> {
    const fastify = await this.createFastifyInstance(options.debug)

    this.setupCustomErrorHandler(fastify, options.debug, options.sentry_dsn)

    await this.setupRoutes(fastify)

    return new Server(fastify, options)
  }

  private static async createFastifyInstance(debug: boolean): Promise<FastifyInstance> {
    // Create Fastify instance with logger
    const fastify: FastifyInstance = Fastify({
      logger: {
        level: debug ? 'debug' : 'warn',
        transport: {
          target: 'pino-pretty',
          options: {
            levelFirst: true,
            ignore: 'pid,hostname',
            colorize: true,
            singleLine: true,
          },
        },
      },
    })

    // Register CORS plugin with secure defaults
    const origin = env.API_CORS_ORIGINS === '*' ? true : env.API_CORS_ORIGINS.split(',')
    await fastify.register(cors, {
      origin,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400, // 24 hours
    })

    // Register Rate Limit plugin
    await fastify.register(rateLimit, {
      max: 10,
      timeWindow: '10 seconds',
    })

    return fastify
  }

  private static setupCustomErrorHandler(fastify: FastifyInstance, debug: boolean, sentry_dsn?: string) {
    if (sentry_dsn) {
      Sentry.init({
        dsn: sentry_dsn,
        sendDefaultPii: true,
      })
    }

    fastify.setErrorHandler(function (error, _request, reply) {
      const json = {
        message: error.message,
        error: 'Internal Server Error',
        statusCode: 500,
      }

      // Special errors
      if (error instanceof BaseError) {
        const status = error.toHttpStatus()
        json.error = status.name
        json.statusCode = status.code
      } else if (error?.statusCode === 429) {
        json.error = 'Too Many Requests'
        json.statusCode = 429
      }

      // Send to Sentry
      if (sentry_dsn && json.statusCode >= 500) {
        Sentry.captureException(error)
      }

      reply.status(json.statusCode).send(json)

      if (debug) {
        fastify.log.error(error)
      }
    })
  }

  private static async setupRoutes(fastify: FastifyInstance) {
    // index
    fastify.route((await import('@infra/web-server/routes/hello-world.js')).routeOpt)

    // health
    fastify.route((await import('@infra/web-server/routes/health.js')).routeOpt)

    // cities
    fastify.route((await import('@infra/web-server/routes/cities.find-by-ddd.js')).routeOpt)
  }

  async listen(): Promise<void> {
    try {
      const host = '0.0.0.0'
      const port = this.options.port

      console.log(`Server will listen on ${host}:${port}`)

      await this.fastify.listen({ host, port })
    } catch (err) {
      this.fastify.log.error(err)
      process.exit(1)
    }
  }
}

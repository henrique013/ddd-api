const TOKENS = {
  libs: {
    Redis: Symbol.for('Redis'),
    PgPool: Symbol.for('PgPool'),
    DrizzlePg: Symbol.for('DrizzlePg'),
  },
  repos: {
    ICitiesExternal: Symbol.for('ICitiesExternalRepo'),
    ICities: Symbol.for('ICitiesRepo'),
  },
}

export { TOKENS as t }

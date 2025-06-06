const TOKENS = {
  libs: {
    PgPool: Symbol.for('PgPool'),
    DrizzlePg: Symbol.for('DrizzlePg'),
  },
  repos: {
    ICitiesRepo: Symbol.for('ICitiesRepo'),
  },
  services: {
    ICityService: Symbol.for('ICityService'),
  },
}

export { TOKENS as t }

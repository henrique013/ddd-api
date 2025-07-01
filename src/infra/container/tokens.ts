const TOKENS = {
  libs: {
    DrizzlePg: Symbol.for('DrizzleSqlite'),
  },
  repos: {
    ICitiesRepo: Symbol.for('ICitiesRepo'),
  },
  services: {
    ICityService: Symbol.for('ICityService'),
  },
}

export { TOKENS as t }

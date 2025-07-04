const TOKENS = {
  libs: {
    DrizzlePg: Symbol.for('DrizzleSqlite'),
  },
  repos: {
    ICitiesRepo: Symbol.for('ICitiesRepo'),
    ISearchCountersRepo: Symbol.for('ISearchCountersRepo'),
  },
  services: {
    ICityService: Symbol.for('ICityService'),
    ISearchCounterService: Symbol.for('ISearchCounterService'),
  },
}

export { TOKENS as t }

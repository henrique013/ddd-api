const TOKENS = {
  libs: {
    DrizzlePg: Symbol.for('DrizzleSqlite'),
    RabbitMQPublisher: Symbol.for('RabbitMQPublisher'),
  },
  providers: {
    ICacheProvider: Symbol.for('ICacheProvider'),
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

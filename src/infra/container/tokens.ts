const TOKENS = {
  libs: {
    Redis: Symbol.for('Redis'),
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
    CityService: Symbol.for('CityService'),
    ISearchCounterService: Symbol.for('ISearchCounterService'),
  },
}

export { TOKENS as t }

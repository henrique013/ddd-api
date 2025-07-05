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
    SearchCounterService: Symbol.for('SearchCounterService'),
  },
}

export { TOKENS as t }

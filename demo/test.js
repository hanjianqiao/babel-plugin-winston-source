class Test {
  constructor() {
    logger.warn('warn');    logger.log('log tet');
    logger.info('info');
    logger.error('error');
    logger.table(['one', 'two']);
  }

  a() {
    //
  }
}

export default new Test();

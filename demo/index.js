import Test from './test';

class App {
  constructor() {
    Test.a();
    logger.log('Testing');

    this.main();
  }

  main() {
    logger.log('testing 1234');
  }
}

export default new App();

import { fullpath, acronyms } from './resolveFileName';

describe('fullpath', () => {
  test('should return fullpath', () => {
    expect(
      fullpath({
        prefix: 'my-example',
        filename: 'C:\\workspace\\babel-plugin-logger-source\\src\\view/home\\index.ts',
        column: 10,
        line: 2,
        projectPath: 'C:\\workspace\\babel-plugin-logger-source\\',
      }),
    ).toBe('my-example [src\\view\\home\\index.ts (2:10)]');
  });
});

describe('acronyms', () => {
  test('should return acronyms', () => {
    expect(
      acronyms({
        prefix: 'my-example',
        filename: 'C:\\workspace\\babel-plugin-logger-source\\src\\View/app.js',
        column: 10,
        line: 2,
        projectPath: 'C:\\workspace\\babel-plugin-logger-source\\',
      }),
    ).toBe('my-example [s.V/app.js (2:10)]');
  });
});

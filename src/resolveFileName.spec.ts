import { fullpath, acronyms } from './resolveFileName';

describe('fullpath', () => {
  test('should return fullpath', () => {
    expect(
      fullpath({
        prefix: 'my-example',
        filename: 'C:\\workspace\\babel-plugin-logger-source\\src\\view\\home\\index.ts',
        column: 10,
        line: 2,
        projectPath: 'C:\\workspace\\babel-plugin-logger-source\\',
      }),
    ).toBe('my-example [src\\view\\home\\index.ts:2]');
  });
});

describe('acronyms', () => {
  test('should return acronyms', () => {
    expect(
      acronyms({
        prefix: 'my-example',
        filename: 'C:\\workspace\\babel-plugin-logger-source\\src\\view/Home\\index.ts',
        column: 10,
        line: 2,
        projectPath: 'C:\\workspace\\babel-plugin-logger-source\\',
      }),
    ).toBe('my-example [s.v.H:index.ts:2]');
  });
});

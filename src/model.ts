export interface ResolveFileNameParams {
  filename: string;
  projectPath: string;
  prefix: string;
  line: number;
  column: number;
}

export interface BabelNodePath {
  node: {
    callee: {
      object: { name: string };
      property: { name: string };
    };
    arguments: any[];
    loc: {
      start: {
        line: number;
        column: number;
      };
    };
  };
}

export interface BabelState {
  opts: {
    logger: string[];
    prefix: string;
    resolveFileName: ((params: ResolveFileNameParams) => string) | 'acronyms' | 'fullpath';
  };
  file: {
    opts: {
      filename: string;
    };
  };
}

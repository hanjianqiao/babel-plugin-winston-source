const projectPath = (global as any).rootPath || process.cwd();
import { BabelNodePath, BabelState } from './model';
import * as resolveFileName from './resolveFileName';

export default function () {
  return {
    visitor: {
      CallExpression(nodePath: BabelNodePath, state: BabelState) {
        const logArr = state.opts.logger || [
          'logger.log',
          'logger.info',
          'logger.wran',
          'logger.error',
          'logger.debug',
        ];

        if (
          nodePath.node.callee.object &&
          logArr.includes(nodePath.node.callee.object.name + '.' + nodePath.node.callee.property.name)
        ) {
          let filename = state.file.opts.filename;

          const params = {
            filename: filename,
            projectPath: projectPath,
            prefix: state.opts.prefix || '',
            line: nodePath.node.loc.start.line,
            column: nodePath.node.loc.start.column,
          };

          switch (typeof state.opts.resolveFileName) {
            case 'function':
              filename = state.opts.resolveFileName(params);
              break;
            case 'string':
              if (resolveFileName[state.opts.resolveFileName]) {
                filename = resolveFileName[state.opts.resolveFileName](params);
                break;
              }
            default:
              filename = resolveFileName['acronyms'](params);
          }

          let value = '';
          value += state.opts.prefix ? state.opts.prefix + ' ' : '';
          value += `[${filename}:${nodePath.node.loc.start.line})]`;

          if (nodePath.node.arguments[0].value !== value) {
            nodePath.node.arguments.unshift({
              type: 'StringLiteral',
              value,
            });
          }
        }
      },
    },
  };
}

const projectPath = (global as any).rootPath || process.cwd();
import { BabelNodePath, BabelState } from './model';
import * as resolveFileName from './resolveFileName';

module.exports = function () {
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
          const filename = state.file.opts.filename;

          const params = {
            filename: filename,
            projectPath: projectPath,
            prefix: state.opts.prefix || '',
            line: nodePath.node.loc.start.line,
            column: nodePath.node.loc.start.column,
          };
          let value = '';
          switch (typeof state.opts.resolveFileName) {
            case 'function':
              value = state.opts.resolveFileName(params);
              break;
            case 'string':
              if (resolveFileName[state.opts.resolveFileName]) {
                value = resolveFileName[state.opts.resolveFileName](params);
                break;
              }
            default:
              value = resolveFileName['acronyms'](params);
          }

          if(!(nodePath.node.arguments.length === 2 && nodePath.node.arguments[1].value === value)){
            nodePath.node.arguments = [
              {
                type: 'ArrayExpression',
                elements: nodePath.node.arguments
              },
              {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'ObjectProperty',
                    method: false,
                    key: {
                      type: 'StringLiteral',
                      value: 'position'
                    },
                    value: {
                      type: 'StringLiteral',
                      value: value
                    }
                  }
                ]
              }
            ]
          }
        }
      },
    },
  };
};

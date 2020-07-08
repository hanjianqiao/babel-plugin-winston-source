const projectPath = global.rootPath || process.cwd();
const path = require('path');

/**
 * Prepend file name and number as part of the babel process
 *
 * @author Peter Ingram
 *
 * {
 *  source:[],
 *  resolveFile:function(){}
 * }
 */

module.exports = () => {
  return {
    visitor: {
      CallExpression(nodePath, state) {
        const opts = state.opts;
        const logArr = state.opts.source || [
          'logger.log',
          'logger.info',
          'logger.wran',
          'logger.error',
          'logger.debug',
        ];

        if (
          nodePath.node.callee.object &&
          logArr.includes(
            nodePath.node.callee.object.name +
              '.' +
              nodePath.node.callee.property.name
          )
        ) {
          let filename = state.file.opts.filename;

          if (typeof opts.resolveFile === 'function') {
            filename = opts.resolveFile(filename, projectPath);
          } else {
            filename = path.relative(projectPath, filename);
          }

          let value = `${filename} (${nodePath.node.loc.start.line}:${nodePath.node.loc.start.column})`;

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
};

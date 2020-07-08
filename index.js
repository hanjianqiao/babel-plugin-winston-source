const root = global.rootPath || process.cwd();
const path = require('path');

/**
 * Prepend file name and number as part of the babel process
 *
 * @author Peter Ingram
 * {
 *  resolveFunction:[],
 *  resolveFile:function(){}
 * }
 */

module.exports = () => {
    return {
        visitor: {
            CallExpression(nodepath, state) {
                const opts = state.opts;
                const logArr = state.opts.resolveFunction || [
                    'logger.log',
                    'logger.info',
                    'logger.wran',
                    'logger.error',
                    'logger.debug',
                ];

                if (
                    nodepath.node.callee.object &&
                    logArr.includes(
                        nodepath.node.callee.object.name +
                            '.' +
                            nodepath.node.callee.property.name
                    )
                ) {
                    let file = state.file.opts.filename;

                    if (typeof opts.resolveFile === 'function') {
                        file = opts.resolveFile(file);
                    } else {
                        file = path.relative(root, file);
                    }

                    let value = `${file} (${nodepath.node.loc.start.line}:${nodepath.node.loc.start.column})`;

                    if (nodepath.node.arguments[0].value !== value) {
                        nodepath.node.arguments.unshift({
                            type: 'StringLiteral',
                            value,
                        });
                    }
                }
            },
        },
    };
};

const loggerSource = require('../dist');

module.exports = {
  optimization: {
    minimize: false,
  },
  mode: 'development',
  context: __dirname,
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'scripts.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          plugins: [
            [
              loggerSource,
              {
                resolveFileName: function (params) {
                  return params.filename;
                },
              },
            ],
          ],
        },
      },
    ],
  },
};

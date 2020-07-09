const notifier = require('node-notifier');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        const severityIcon = {
          warning: '⚠️',
          error: '💢',
        }[severity] || '';

        notifier.notify({
          title: `${severityIcon} Webpack Error`,
          message: `Webpack detected the project has ${errors.length} ${severity.toUpperCase()}${errors.length === 1 ? '' : 's'}`,
          wait: true,
        });
      },
    }),
  ],
});

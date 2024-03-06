const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, options) => {
    // Enable live reloading
    config.devServer = {
      ...config.devServer,
      liveReload: true,
      hot: true
    };

    // Return the modified webpack config
    return config;
  }
);

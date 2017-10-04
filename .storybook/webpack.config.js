const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  config.module.rules.push({
    test: /\.(css|scss)$/,
    loaders: ["style-loader", "css-loader", "sass-loader"]
  });

  return config;
};
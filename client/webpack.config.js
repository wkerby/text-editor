const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [ //insert plug-in to bundle html
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'JATE'
    }),
    
    new InjectManifest({ //creates custom service worker
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),

    new WebpackPwaManifest({ //will create manifest.json file so application can be downloaded
      fingerprints: false,
      inject: true,
      name: 'Just Another Text Editor',
      short_name: 'JATE',
      description: 'Add and Edit your Text!',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],

    module: {
      rules: [
        {
          test: /\.css$/i, //searches for any file with .css extension
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/, //searches for any file with .js extension
          exclude: /node_modules/,
          // bring in babel-loader to transpile any ES5 JavaScript to ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};

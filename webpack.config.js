const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Common configuration
const commonConfig = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          }
        ]
      },
      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: process.env.NODE_ENV === 'production'
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        // Copy icons and images to dist folder
        {
          from: 'assets/icons',
          to: 'icons',
          noErrorOnMissing: true
        },
        {
          from: 'assets/images',
          to: 'images',
          noErrorOnMissing: true
        }
      ]
    })
  ]
};

module.exports = () => {
  // Define entry points for JavaScript files
  const jsEntries = {
    // Global JS
    global: './assets/js/global.js',

    // Component JS
    'components/details-disclosure': './assets/js/components/details-disclosure.js',
    'components/details-modal': './assets/js/components/details-modal.js',
    'components/search-form': './assets/js/components/search-form.js',
    'components/animations': './assets/js/components/animations.js',

    // Utility JS
    'utils/constants': './assets/js/utils/constants.js',
    'utils/pubsub': './assets/js/utils/pubsub.js',
  };

  // Define entry points for CSS files
  const cssEntries = {
    'base': './assets/css/base.css',

    // Component CSS
    'components/collapsible-content': './assets/css/components/collapsible-content.css',
    'components/quick-add': './assets/css/components/quick-add.css',
    'components/quick-order-list': './assets/css/components/quick-order-list.css',

    // Section CSS
    'sections/newsletter-section': './assets/css/sections/newsletter-section.css',
  };  // Combine all entries
  const entries = { ...jsEntries, ...cssEntries };

  return {
    ...commonConfig,
    entry: entries
  };
};

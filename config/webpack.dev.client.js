const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Loadable  = require('react-loadable/webpack');
const getEnvironmentConstants = require('../getEnvironmentConstants');
const path = require('path');

const projectRootPath = path.resolve(__dirname, '../');

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: [
    './src/index.js',
  ],

  devServer: {
    staticOptions: {
      redirect: true,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true,
    hot: true,
    port: 8000,
    noInfo: true,
  },  

  output: {
    path: `${projectRootPath}/src`,    
    filename: '[name]-bundle.js',
    publicPath: `http://localhost:8000/dist/`
  },  

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      // SCSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]-[local]--[hash:base64:5]',
              },
              importLoaders: 2,              
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()],
              sourceMap: true              
            },
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
      // images
      {
        test: /\.(png|jp(e*)g|svg)$/,  
        use: [{
            loader: 'url-loader',
            options: { 
                limit: 8000, // Convert images < 8kb to base64 strings
                name: 'images/[hash]-[name].[ext]'
            } 
        }]
      },
      //File loader used to load fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }                    
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env' : getEnvironmentConstants() } ),  

    new Loadable.ReactLoadablePlugin({
        filename: './dist/loadable-manifest.json',
      }),

    // hot reload
    new webpack.HotModuleReplacementPlugin({multiStep: true}),

    new MiniCssExtractPlugin({
        // these are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    }),
    
    new OptimizeCSSAssetsPlugin({})    
  ]
};
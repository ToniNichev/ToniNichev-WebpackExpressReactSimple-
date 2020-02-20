const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack =require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const getEnvironmentConstants = require('../getEnvironmentConstants');
const NodemonPlugin = require('nodemon-webpack-plugin');

const WEBPACK_PORT = 3007;


module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: "node",
  node: {
    __dirname: false, // use the standard Node behavior of __dirname
  },
  externals: [nodeExternals()],

  entry: {
    server: './ssr-server.js'
  },

  output: {
    path: path.resolve(__dirname, '../', 'server-build'),    
    filename: '[name]-bundle.js',
    publicPath: `http://localhost:${WEBPACK_PORT}/dist/`
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
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },            
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
    // on the server we still need one bundle
    new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
    }),    
    new webpack.DefinePlugin({ 'process.env' : getEnvironmentConstants() } ),  

    new NodemonPlugin({
      watch: path.resolve('./server-build'),
      ext: 'js,json,jsx',
      script: `./server-build/server-bundle.js`,
      verbose: true,
    }),    
  ]
};
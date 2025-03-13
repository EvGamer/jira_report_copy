const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const generateManifest = require("./manifest.cjs");


module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    "my-work-week": path.join(__dirname, "src", "content-scripts", "my-work-week.js"),
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['build/*']
    }),
    new WebpackManifestPlugin({
      generate: generateManifest,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "assets/icons", to: "icons" },
        { from: "src/content-scripts/my-work-week.css", to: ""}
      ]
    }),
  ]
};
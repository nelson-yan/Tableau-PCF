const webpack = require("webpack");
module.exports = {
  devtool: 'source-map',
  resolve: {
    alias: {
      'stream$': 'stream-browserify'
    },
    fallback: {
      // 👇️👇️👇️ add this 👇️👇️👇️
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer")
    }
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   Buffer: ['buffer', 'Buffer'],
    // }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ["buffer", "Buffer"],
    })
  ]
}
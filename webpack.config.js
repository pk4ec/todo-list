// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // either development/production
  entry: "./src/index.js", // file for input (js file)
  output: { // object containing output stuff
    filename: "main.js", // what webpack outputs as
    path: path.resolve(__dirname, "dist"), // to where (if doesnt exist, itll make one)
    clean: true, // empty the output directory before putting stuff in it
  },
  devtool: "eval-source-map", // for debugging
  devServer: {
    watchFiles: ["./src/index.html"],
    open: true, // when npm webpack serve, it opens a tab of the localhost for me
    hot: false, // disables whatever the fuck in my console
    client: {
      logging: 'none' // for webpack-dev-server to stop logging garbage
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // for html
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i, // look for files ending with css
        use: ["style-loader", "css-loader"], // in THIS exact order
      },
      {
        test: /\.html$/i, // end with html
        loader: "html-loader", // loads pic in html file
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i, // same (?)
        type: "asset/resource", // uh this loads pics for js
      }
    ],
  },
};
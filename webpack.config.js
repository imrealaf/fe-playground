const path = require("path");

const NAME = "app";
const BUILD_DIR = path.resolve("./public/dist");
const APP_DIR = path.resolve("./src", "js");
const STYLE_DIR = path.resolve("./src", "scss");

module.exports = {
  entry: [`${APP_DIR}/index.js`, `${STYLE_DIR}/index.scss`],
  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },
  output: {
    path: BUILD_DIR,
    filename: `js/${NAME}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: APP_DIR,
        loader: "babel-loader",
        exclude: path.resolve("./node_modules")
      },
      {
        enforce: "pre",
        test: /\.js$/,
        include: APP_DIR,
        loader: "source-map-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `${NAME}.css`,
              context: `${BUILD_DIR}/css`,
              outputPath: "css/",
              publicPath: "../"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: false
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  devServer: {
    publicPath: "./public/dist",
    contentBase: ["./public", "./src"],
    //watchContentBase: true,
    port: 8080,
    open: true,
    inline: true,
    hot: true
  }
};

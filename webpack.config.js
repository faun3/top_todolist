import webpack from "webpack";
import { locales } from "./src/DOMstuff";

const path = require("path");

module.exports = {
  entry: "./src/todoApp.js",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

export default config = {
  plugins: [
    new webpack.ContextReplacementPlugin(
      /^date-fns[/\\]locales$/,
      new RegExp(`\\.[/\\\\](${locales.join("|")})[/\\\\]index\\.js$`)
    ),
  ],
};

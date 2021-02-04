const webpack = require("webpack");
const config = require("./webpack.config");
const logger = require("./logger");
const Server = require("webpack-dev-server");

// WebpackDevSever 不允许使用第二个参数
const compiler = webpack(config);

const options = Object.assign({}, config.devServer, {
  
});

const server = new Server(compiler, options);

server.listen(3000, "127.0.0.1", (err) => {
  if (err) {
    logger.error(err);
  }
});

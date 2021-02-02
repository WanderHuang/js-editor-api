const webpack = require("webpack");
const config = require("./webpack.config");
const logger = require("./logger");

webpack(config, (err, stats) => {
  if (err) {
    logger.error(err);
  } else if (stats.hasErrors()) {
    logger.error(stats.toString());
  } else {
    // if (stats.hasWarnings()) {
    //   logger.warn(stats.toString())
    // } 
    logger.build(logger.green("success !!"));
  }
});

const chalk = require("chalk");

const logger = {
  cyan: chalk.cyan,
  green: chalk.green,
  build: (...args) => console.log(chalk.cyan("[ build ]"), ...args),
  error: (...args) => console.log(chalk.red("[ error ]"), ...args),
  warn: (...args) => console.log(chalk.yellow("[ warn ]"), ...args),
  onCompile: (persent, ...args) => {
    console.clear();
    console.log(
      chalk.cyan(
        `[ compile ] ${getProgressChars(persent, {
          len: 40,
          fill: chalk.bgGreen(" "),
          empty: chalk.bgCyan(" "),
        })}`
      ),
      ...args
    );
  },
};

module.exports = logger;

exports.getProgressChars = getProgressChars;

function getProgressChars(persent, { len = 30, fill = ">", empty = "*" } = {}) {
  let x = Math.floor(persent * len);

  let res = "";
  for (let i = 0; i < len; i++) {
    if (i < x) {
      res += fill;
    } else {
      res += empty;
    }
  }

  res += ` ${(persent * 100).toFixed(2)}%`;

  return res;
}

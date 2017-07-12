const connect = require('connect');

const now = () => {
  let result = '';
  let splitter = '/';
  const space = ' ';
  const date = new Date();
  const year = date.getFullYear();
  const day = date.getDate() < 10
    ? `0${date.getDate()}`
    : date.getDate();
  const month = date.getMonth() < 9
    ? `0${date.getMonth() + 1}`
    : date.getMonth() + 1;
  result = `${year}${splitter}${month}${splitter}${day}`;
  const hours = date.getHours() < 10
    ? `0${date.getHours()}`
    : date.getHours();
  const minutes = date.getMinutes() < 10
    ? `0${date.getMinutes()}`
    : date.getMinutes();
  const seconds = date.getSeconds() < 10
    ? `0${date.getSeconds()}`
    : date.getSeconds();
  splitter = ':';
  return `${result}${space}${hours}${splitter}${minutes}${splitter}${seconds}`;
};

const simplelogger = () => {
  const chain = connect();
  chain.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
      const msg = `> Start request at ${utils.now(true)}`;
      console.log(`\x1b[33m${msg}\x1b[39m`);
      console.log(`\x1b[90m${req.headers.origin} -> ${req.method} ${req.url}\x1b[39m`);
    }
    next();
  });
  return chain;
};

module.exports = simplelogger;

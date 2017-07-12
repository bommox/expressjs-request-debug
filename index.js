const connect = require('connect');

const simplelogger = () => {
  const chain = connect();
  chain.use((req, res, next) => {
    console.log('req', req);
    const msg = `> Start request at ${utils.now(true)}`;
    console.log(`\x1b[33m${msg}\x1b[39m`);
    console.log(`\x1b[90m${req.headers.origin} -> ${req.method} ${req.url}\x1b[39m`);
    next();
  });
  return chain;
};

module.exports = simplelogger;

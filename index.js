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

const logResponseError = (statuscode, starttime) => {
  const msg = `> ${statuscode} :: Request takes ~${Date.now() - starttime}ms\n`;
  console.log(`\x1b[1;31m${msg}\x1b[0m`);
};

const logResponseBody = (body, starttime) => {
  console.log(`\x1b[90m${body}\x1b[0m`);
  const msg = `> SUCCESS :: Request takes ~${Date.now() - starttime}ms\n`;
  console.log(`\x1b[1;32m${msg}\x1b[0m`);
};

const onwrite = (res, chunks) => {
  const old = res.write;
  return function (chunk) {
    chunks.push(new Buffer(chunk));
    old.apply(res, arguments);
  }
};


const onend = (res, chunks, starttime) => {
  const old = res.end;
  return function (chunk) {
    if (chunk) chunks.push(new Buffer(chunk));
    const body = Buffer.concat(chunks).toString('utf8');
    if (res.statusCode !== 200) logResponseError(res.statusCode, starttime);
    else logResponseBody(body, starttime);
    old.apply(res, arguments);
  }
};

const simplelogger = () => {
  const chain = connect();

  // at request start log
  chain.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
       next();
      return;
    }
    const chunks = [];
    res.write = onwrite(res, chunks);
    res.end = onend(res, chunks, Date.now());
    const msg = `> Start request at ${now()}`;
    console.log(`\x1b[33m${msg}\x1b[39m`);
    console.log(`\x1b[90m${req.headers.origin} -> ${req.method} ${req.url}\x1b[39m`);
    next();
  });
  return chain;
};

module.exports = simplelogger;

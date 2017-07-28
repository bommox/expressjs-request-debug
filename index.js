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
  const msg = `> ${statuscode} ~${Date.now() - starttime}ms`;
  console.log(`\x1b[1;31m${msg}\n\x1b[0m`);
};

const logResponseBody = (body, starttime, cached) => {
  let json = body;
  let more = false;
  more = json.length > 255;
  if (json.length > 255) json = json.substr(0, 255);
  if (more) more = (body.length - 255);
  if (!cached) {
    console.log(`\x1b[90m${json}${more ? `\n...${body.length} more` : ''}\x1b[0m`);
  }
  let msg = `> SUCCESS ~${Date.now() - starttime}ms`;
  if (cached) msg = `${msg} \x1b[1;31m[CACHED]\x1b[0m`;
  console.log(`\x1b[1;32m${msg}\n\x1b[0m`);
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
    if (res.statusCode === 200
      || res.statusCode === 201) logResponseBody(body, starttime, false);
    else if (res.statusCode === 304) logResponseBody(body, starttime, true);
    else logResponseError(res.statusCode, starttime);
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
    let msg = `\x1b[36m${now()}\x1b[0m`;
    msg = `${msg} \x1b[33m${req.headers.origin} -> ${req.method} ${req.url}\x1b[0m`;
    console.log(msg);
    next();
  });
  return chain;
};

module.exports = simplelogger;

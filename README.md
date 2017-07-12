# Express Simple Logger Middleware

!!! DO NOT USE IN PRODUCTION

## Install

```bash
npm i --save expressjs-simple-logger
```

## Usage

```javascript
const express = require('express');
const simplelogger = require('expressjs-simple-logger');
const app = express();
app.use(simplelogger());
```

## Output

#### Success (=== 200)

```bash
> Start request at 2017-7-12 10:04:57
GET /manifest http://localhost:8081
# {
# ..body response...
# }
> SUCCESS :: Request takes ~26ms
```

#### Error (!== 200)

```bash
> Start request at 2017/07/12 21:26:53
http://localhost:8081 -> GET /home/page
> 404 :: Request takes ~3ms
```

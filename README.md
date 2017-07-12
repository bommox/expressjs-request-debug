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

```bash
> Start request at 2017-7-12 10:04:57
GET /manifest http://localhost:8081
```

"use strict";
const express = require('express');
const logger = require('./simple-logger');
const app = express();
app.use(logger());

app.get('/', (req,res) => res.send("Hello!"));
app.post('/', (req,res) => res.send("Hello!"));

app.listen(8123, _ => console.log("Server started on port 8123"));

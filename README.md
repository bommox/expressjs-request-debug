# Simple ExpressJS Server

## Install

```bash
git clone https://github.com/bommox/expressjs-request-debug.git
```

## Usage

```bash
cd expressjs-request-debug
node server.js
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

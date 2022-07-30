# Client and Server Implmentation with NodeJS

In this implmentation, developing server API for frontend project. for frontend we using `React` framework and for server side we using `NodeJS` and `Express JS` for middlware.

under this i will learn,

> how to develop both Client and Server
> How to handle CORS while integrating the API to client side.
> How to Modify Header with allowing `Access-Control-Allow-Origin` to `*` or single origin
> How to use `CORS` package in `ExpressJS`

For handle `CORS` we are using following NPM package, https://www.npmjs.com/package/cors

Install Concurrently library for run both `client` and `server` together peralley. https://www.npmjs.com/package/concurrently

## Following steps you can build your frontend and serve those with NodeJS

Root `pacakge.json` following is the snippet for build production frontend code and serve from `NODEJS`

> "deploy": "npm run build --prefix client && npm run start --prefix server"

in frontend `package.json` script build script is look like following `client` directory package.json

> "build": "set BUILD_PATH=../server/public&& react-scripts build",

## For Capture LOGS of requests you can use `moran`

For more details about Morgan refer following link https://www.npmjs.com/package/morgan

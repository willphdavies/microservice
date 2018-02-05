#!/usr/bin/env bash
npm i
cd src/client
npm i
npm run build
cd ../../
node ./src/server/server
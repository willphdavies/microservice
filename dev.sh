#!/usr/bin/env bash

nodemon src/server/server.js &
cd src/client
npm start &&
open http://localhost:3000/
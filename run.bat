@echo off

npm ci --silent
npm install
npm test
npm start --silent sample_input\input1.txt
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const main = require('./main.js');

const request = require('request');
const { WebClient } = require('@slack/client');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  .get('/start', (req, res) => res.send('hello world'))
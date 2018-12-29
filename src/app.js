const fs = require('fs');
const path = require('path');
const express = require('express');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

const app = express();

const { accounts, users, writeJSON } = require('./data');

//set the views directory
app.set('views', path.join(__dirname, 'views')); //__dirname jako element z node-a
app.set('view engine', 'ejs'); //use ejs as our view engine

//tell express, how to find out public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);

/** MIDDLEWARE **/
app.use( express.urlencoded({ extended: true }) );

/** ROUTING **/
// GET
//app.get - 2 parametry - url i callback
app.get('/',
  (req, res) =>
    res.render('index',
      { title: 'Account Summary',
        accounts: accounts }
    )
  );

app.get('/profile', (req, res) => res.render('profile', { user: users[0] }) );

//Tworzenie serwera http
app.listen(3000, () => console.log('Server is running on 3000'));

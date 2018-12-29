const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const { accounts, users, writeJSON } = require('./data');

//set the views directory
app.set('views', path.join(__dirname, 'views')); //__dirname jako element z node-a
app.set('view engine', 'ejs'); //use ejs as our view engine

//tell express, how to find out public directory
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/savings', (req, res) => res.render('account', { account: accounts.savings }) );
app.get('/checking', (req, res) => res.render('account', { account: accounts.checking }) );
app.get('/credit', (req, res) => res.render('account', { account: accounts.credit }) );

app.get('/profile', (req, res) => res.render('profile', { user: users[0] }) );
app.get('/transfer', (req, res) => res.render('transfer') );
app.get('/payment', (req, res) => res.render('payment', { account: accounts.credit }) );

// POST
app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount, 10);

  writeJSON();
  res.render('transfer', { message: 'Transfer Completed' });
} );
app.post('/payment', (req, res) => {
  accounts.credit.balance = accounts.credit.balance - req.body.amount;
  accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);

  writeJSON();
  res.render('payment', { message: 'Payment Successful', account: accounts.credit });
});


//Tworzenie serwera http
app.listen(3000, () => console.log('Server is running on 3000'));

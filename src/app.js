const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

//accounts
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), { encoding:'UTF8'});
const accounts = JSON.parse(accountData);

//users
const usersData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), { encoding:'UTF8'});
const users = JSON.parse(usersData);

//set the views directory
app.set('views', path.join(__dirname, 'views')); //__dirname jako element z node-a
app.set('view engine', 'ejs'); //use ejs as our view engine

//tell express, how to find out public directory
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTING **/
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

//Tworzenie serwera http
app.listen(3000, () => console.log('Server is running on 3000'));

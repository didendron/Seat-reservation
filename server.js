const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

const path = require('path');
const express = require('express');

app.use('/db', middlewares, router);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});




//server.use(middlewares);
//server.use(router);

app.listen(port);
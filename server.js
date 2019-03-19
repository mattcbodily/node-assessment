const express = require('express');
const {json} = require('body-parser');
const ctrl = require('./usersCtrl');
const app = express();
app.use(json());

app.get('/api/user', ctrl.getAllUsers);
app.get('/api/user/:id', ctrl.getUser);
app.get('/api/admin', ctrl.getAllAdmin);
app.get('/api/nonadmin', ctrl.getAllNonAdmin);
app.get('/api/type/:userType', ctrl.getUserByType);

app.post('/api/user', ctrl.addUser);

app.put('/api/user/:id', ctrl.updateUser);

app.delete('/api/user/:id', ctrl.deleteUser);


const serverPort = 3000;
app.listen(serverPort, console.log(`Server is running on ${serverPort}`));
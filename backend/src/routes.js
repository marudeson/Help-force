const express = require('express');
const instController= require('./controllers/instController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router(); 

  routes.post('/sessions' , sessionController.create);

  routes.get('/instituicao' , instController.index);
  routes.post('/instituicao' , instController.create);

  routes.get('/incidents' , incidentController.index);
  routes.post('/incidents' , incidentController.create);
  routes.delete('/incidents/:id' , incidentController.delete);

  routes.get('/profile' , profileController.index);



module.exports = routes; 
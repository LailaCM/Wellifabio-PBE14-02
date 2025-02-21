const express = require('express');

const routes = express.Router();

const Cliente = require('./controllers/cliente');
const Medicos = require('./controllers/medicos');
const Consultas = require('./controllers/consultas');

routes.get('/', (req, res) => {
    res.send('API Clínica Respondendo');
});

routes.post('/clientes', Cliente.create);
routes.get('/clientes', Cliente.read);
routes.put('/clientes/:id', Cliente.update);
routes.delete('/clientes/:id', Cliente.del);


routes.post('/medicos', Medicos.create);
routes.get('/medicos', Medicos.read);
routes.put('/medicos/:id', Medicos.update);
routes.delete('/medicos/:id', Medicos.del);


routes.post('/consultas', Consultas.create);
routes.get('/consultas', Consultas.read);
routes.put('/consultas/:id', Consultas.update);
routes.delete('/consultas/:id', Consultas.del);

module.exports = routes;
const express = require('express')
const app = express()
const routes = require('./api/routes')
const cors = require('cors')
const expressListEndpoints = require('express-list-endpoints')

app.use(cors({
    origin: true, 
    credentials: true
}));

app.use('/api', routes)

app.listen(8080, function () { 
    console.log('Aplicação executando na porta 8080!');
    console.log(expressListEndpoints(app));
}); 
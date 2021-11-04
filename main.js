const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const handlebars = require('express-handlebars');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;
const mensajes = [];

const clientes = [];
app.use(express.static('./public'));


app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/public",
       
    })
);

app.set('views', './public');
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    res.render('index', {clientes});
});
//--------------------------------------------------------------------
const objeto1 = require('./Clase-Docs.js');
const { extname } = require('path');
app.use(express.urlencoded({extended: true}));




httpServer.listen(PORT, () => {
    console.log('Servidor HTTP escuchando en el puerto', PORT);
});

//--------------------------------------------------------------------Para el Chat

io.on('connection', (socket) => {
    console.log("usuario conectado");

    socket.emit('mensajes', mensajes);

    socket.on('mensaje', (data) =>{
        mensajes.push({ socketid: socket.id, mensaje: data});
        io.sockets.emit('mensajes', mensajes) });

//---------------------------------------------------------------------Para el ingreso de nuevo cliente
    socket.on('clientenuevo', (data) => {      
        clientes.push(data);
        console.log(clientes);
        io.sockets.emit('baseclientes', clientes) });
    
});


app.use(express.json())
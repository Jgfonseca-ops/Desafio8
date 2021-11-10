const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const handlebars = require('express-handlebars');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//DB de clientes--------------------------------------------------

const ClienteSql = require('./ClaseMySQL.js');
const { options } = require('./mysql.js');
const knex = require('knex')(options);


const sql = new ClienteSql(options, "Clientes");
sql.crearTabla();

const PORT = 8080;
const mensajes = [];

const clientes = [];


//--------------------------------------------------------------
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

//----------------------------------------------------------------Para el ingreso de nuevo cliente
    socket.on('clientenuevo', async (data) => {    
        try {
        await sql.insertarClientes(data)
        }
        catch (error) {
        console.log(error)}

  });
    
});

app.use(express.json())

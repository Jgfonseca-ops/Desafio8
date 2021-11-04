const socket = io();

//Para ingreso nuevo cliente
function nuevoCliente(event) {
    const nombre = document.getElementById('nombre').value; 
    const apellido = document.getElementById('apellido').value; 
    const edad = document.getElementById('edad').value;  
    const id = document.getElementById('id').value;
    const objeto= {nombre: nombre, apellido: apellido,edad: edad, id: id}
    socket.emit('clientenuevo', objeto);
     //   event.preventDefault()
}


//Para el chat
const input = document.getElementById('chat')
document.getElementById('botonEnviar').addEventListener('click', () => {
    socket.emit('mensaje', input.value);
});

socket.on('mensajes', data => {
    
    const mensajesHTML = data
        .map(data => `SocketId: ${data.socketid} -> Mensaje: ${data.mensaje}`)
        .join('<br>');
    
    document.querySelector('p').innerHTML = mensajesHTML
});


/*socket.on('baseclientes', client => {

    

    const clienteNombre = client[0].nombre;
    const clienteApellido = client[0].apellido;
    const clienteEdad = client[0].edad;
   
    document.getElementById('uno').innerHTML = clienteNombre;
    document.getElementById('dos').innerHTML = clienteApellido;
    document.getElementById('tres').innerHTML = clienteEdad;
    
    }); */
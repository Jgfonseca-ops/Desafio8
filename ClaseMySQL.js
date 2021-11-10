const { options } = require('./mysql.js');
const knex = require('knex')(options);

class ClienteSql {
    constructor(config , tabla) {
                this.knex = config;
                this.tabla = tabla;
              }

 async crearTabla() {
        try {
            return knex.schema.createTable(this.tabla, table => {
                table.string('nombre', 50).notNullable(); 
                table.string('apellido', 50).notNullable(); 
                table.integer('edad');
                table.integer('id');
             })}
        catch (error){
                console.log('No se pudo crear la tabla')
            }           
        }

async insertarClientes(cliente) {
        try{
              return knex(this.tabla).insert(cliente) }
        catch (error){
                console.log('No se pudo guardar el contenido')
            }
        }     
        
async listarClientes() {
        try {
              return knex(this.tabla).select('*')}
        catch (error){
              console.log('No se pudo listar el contenido')
            }
      }

async borrarClientePorId(id) {
        try {
              return knex.from(this.tabla).where('id', id).del() }
        catch (error){
              console.log('No se pudo listar el contenido')
              }
             
            }

}

module.exports = ClienteSql

const { options } = require('./mysql.js');
const knex = require('knex')(options);

class ClienteSql {
    constructor(config , tabla) {
      this.knex = knexLib(config);
      this.tabla = tabla;
    }

    crearTabla() {
            return this.knex.schema.createTable(this.tabla, table => {
                table.string('nombre', 50).notNullable(); 
                table.string('apellido', 50).notNullable(); 
                table.integer('edad');
                table.increments('id').primary();
             })
             .then(() => console.log('tabla creada'))
             .catch((err) => {console.log(err); throw err})
             .finally(()=> {
                 knex.destroy();
             })         
      }

    insertarArticulos(articulos) {
        return this.knex(this.tabla).insert(articulos)
        .then(()=> console.log("data inserted"))
        .catch((err) => { console.log(err); throw err})
        .finally(()=> {
                knex.destroy();
        })
      }





}
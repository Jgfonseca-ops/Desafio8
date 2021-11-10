const { options } = require('./mysql.js');
const knex = require('knex')(options);

class ClienteSql {
    constructor(config , tabla) {
      this.knex = config;
      this.tabla = tabla;
    }

    crearTabla() {
            return knex.schema.createTable(this.tabla, table => {
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
        return knex(this.tabla).insert(articulos)
        .then(()=> console.log("data inserted"))
        .catch((err) => { console.log(err); throw err})
        .finally(()=> {
                knex.destroy();
        })
      }

    listarArticulos() {
        return knex(this.tabla).select('*')
     
      }

    borrarArticuloPorId(id) {
        return knex.from(this.tabla).where('id', id).del()
        .then(()=> console.log("data deleted"))
        .catch((err) => { console.log(err); throw err})
        .finally(()=> {
                knex.destroy();
        })
      }


}

module.exports = ClienteSql

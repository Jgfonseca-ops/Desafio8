const fs = require('fs');
const { domainToASCII } = require('url');

class Contenedor{
  constructor(nombre){
      this.nombre = nombre;
             }

async save(objeto){
    try {
        await fs.promises.writeFile(this.nombre, JSON.stringify(objeto, null, 2));
        console.log("Guardado!")    
    }
    catch (error){
        console.log('No se pudo guardar el contenido')
    }
}

async getAll(){
    try{
        const contenido = await fs.promises.readFile(this.nombre , 'utf8')
        return(JSON.parse(contenido))
    }
    catch (error){
        return('no se puede leer el archivo', error)
    }
}
async getById(id){
    try{
        const contenido = await fs.promises.readFile(this.nombre, 'utf8')
        const array = JSON.parse(contenido);
        const findId = array.find(element => element.id == id);
	    console.log(findId)
        return(findId)     
    }
    catch (error){
        console.log('no existe', error)
    }
}
async deleteById(id){
    try{
        const contenido = await fs.promises.readFile(this.nombre, 'utf8')
        const array = JSON.parse(contenido);
        const Escribir = array.filter(element =>element.id !== id);
        await fs.promises.writeFile(this.nombre,JSON.stringify(Escribir, null, 2));
        console.log("se eliminó el ID!")
        //console.log(Escribir);
        return(Escribir);
        }
               
    catch (error){
        console.log('no se pudo eliminar el id', error)
    }
}
async deleteAll(){
    try{ 
        const contenido = await fs.promises.readFile(this.nombre, 'utf8')
        const array = JSON.parse(contenido)
        await fs.promises.writeFile(this.nombre,JSON.stringify(null, null, 2));
        console.log("se elimino todo el documento!")
    }
    catch (error){
        console.log('no se puede eliminar el contenido del archivo', error)
    }
}

}

const objeto1 = new Contenedor("productos.txt");
objeto1.save([{nombre: "escuadra", apellido: 22.50, edad: 'url', id: 1},
            {nombre: "regla", apellido: 50.50, edad: 'url2',id: 2},
            {nombre: "cuaderno", apellido: 98.15, edad: 'url3',id: 3},
            {nombre: "hojas", apellido: 158.23, edad: 'url4',id: 4},
            {nombre: "borrador", apellido: 23.52, edad: 'url5',id: 5},
            {nombre: "Fee", apellido: 358.96, edad: 'url6',id: 6}]);
console.log(objeto1);
//objeto1.getAll();
//objeto1.getById(1);
//objeto1.deleteById(12);
//objeto1.deleteAll()

module.exports = objeto1


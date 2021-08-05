//Clase constructora de productos
export class Product{
  constructor(id, nombre, precio, imagen){
    this.id = id;
    this.nombre = nombre;
    this.iva = 0.21;
    this.precio = precio + precio * this.iva;
    this.imagen = imagen;
  }
}
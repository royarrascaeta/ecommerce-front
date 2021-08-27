//Clase constructora de productos
export class Product{
  constructor(id, nombre, categoria, precio, imagen){
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.iva = 0.21;
    this.precio = (precio + precio * this.iva).toFixed(0);
    this.imagen = imagen;
  }
}
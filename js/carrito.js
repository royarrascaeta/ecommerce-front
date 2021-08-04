import { productos } from "./products.js";

//Tienda de productos
//Creación de nueva clase y sus métodos
export class Carrito{
  constructor(){
    this.productos = [],
    this.envio = 0,
    this.subTotal = 0,
    this.total = 0
  }

  mostrarProductos(){
    let detalle = "";
    for(let producto of this.productos){
      detalle += `- ${producto.nombre} ($${producto.precio}) x ${producto.cantidad}\n`
    }
    return detalle.trim();
  }

  calcularSubtotal(){
    for(let producto of this.productos){
      this.subTotal += producto.precio * producto.cantidad;
    }
  }
  
  calcularIVA(){
    return this.subTotal * 0.21;
  }
  
  consultaEnvio(){
    return confirm("Detalle del pedido: \n" + this.mostrarProductos() + "\n\n¿Desea que le enviemos el producto a domicilio?") ? this.calcularEnvio() : this.envio = 0;
  }

  calcularEnvio(){
    if(this.subTotal >= 5000){
      alert("Felicitaciones!\nSu compra supera los $5000 y por ello tenes el envío bonificado!")
      this.envio = 0;
    }else{
      this.envio = 650;
    }
  }

  calcularTotal(){
    this.total = this.subTotal + this.envio + this.calcularIVA();
  }
}


//Creación de nueva instancia de la clase
export const carrito1 = new Carrito();


//Lista de productos string
//Generamos una lista en string a partir del array de productos
let listaProductos = "";

productos.forEach(producto => listaProductos += `- ${producto.id}: ${producto.nombre} ($${producto.precio}) \n`); 



//Creación de función que agregar productos al carrito
export function agregarAlCarrito(){
  let idProducto = 0,
  cantidadProducto = 0;
  
  //Entrada de datos, id del producto a comprar
  while(!idProducto || idProducto <= 0 || idProducto > 6){
    idProducto = parseInt(prompt(
      `¿Qué producto desea comprar? Introduzca el número junto al nombre del producto: \n${listaProductos}`))
  }

  //Seleccionamos el producto de la base de datos y lo guardamos en una variable
  let productoElegido = productos.find(el=> el.id == idProducto);

  //Entrada de datos, cantidad del producto a comprar
  while(!cantidadProducto || cantidadProducto <= 0){
    cantidadProducto = parseInt(prompt("Producto elegido: " + productoElegido.nombre + "\nIntroduzca la cantidad deseada. (Solo números)"));
  }

  //Agrego el nuevo producto al arreglo productos del carrito
  //Validamos si el producto ya existe, y en caso que así sea no "pusheamos" otra vez el mismo producto sino que le incrementamos la cantidad
  let indice = carrito1.productos.findIndex(el=>el.nombre == productoElegido.nombre);

  if(indice != -1){
    carrito1.productos[indice].cantidad += cantidadProducto
  }else{
    carrito1.productos.push({"nombre": productoElegido.nombre, "precio": productoElegido.precio, "cantidad":cantidadProducto});
  }
  
  //Preguntamos si desea agregar otro producto al carrito, y si es así se vuelve a ejecutar la función
  if(confirm("¿Desea agregar otro producto?")){
    agregarAlCarrito()
  }
}
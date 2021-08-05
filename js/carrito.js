import { productos } from "./products.js";

//Tienda de productos
//Creación de nueva clase y sus métodos
export class Carrito{
  constructor(){
    this.productos = [],
    this.cantidad = 0;
    this.envio = 0,
    this.subTotal = 0,
    this.total = 0
  }

  calcularCantidad(){
    this.cantidad = 0;
    for(let producto of this.productos){
      this.cantidad += producto.cantidad;
    }
  }

  mostrarProductos(){
    let detalle = "";
    for(let producto of this.productos){
      detalle += `- ${producto.nombre} ($${producto.precio}) x ${producto.cantidad}\n`
    }
    return detalle.trim();
  }

  calcularSubtotal(){
    this.subTotal = 0;
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



//Creación de función que agregar productos al carrito
export function agregarAlCarrito(id, cantidad){
  // //Seleccionamos el producto de la base de datos y lo guardamos en una variable
  let productoElegido = productos.find(el=> el.id == id);

  //Agrego el nuevo producto al arreglo productos del carrito
  //Validamos si el producto ya existe, y en caso que así sea no "pusheamos" otra vez el mismo producto sino que le incrementamos la cantidad
  let indice = carrito1.productos.findIndex(el=>el.nombre == productoElegido.nombre);

  if(indice != -1){
    carrito1.productos[indice].cantidad += cantidad
  }else{
    carrito1.productos.push({"id-producto": id, "nombre": productoElegido.nombre, "imagen": productoElegido.imagen, "precio": productoElegido.precio, "cantidad":cantidad});
  }

  //Ejecutamos función para actualizar la cantidad total de productos en nuestro carrito, luego la mostramos en el indicador de carrito en el menú
  carrito1.calcularCantidad();

  const $carritoIndex = document.querySelectorAll(".carrito-span");
  $carritoIndex.forEach(span => span.innerHTML = carrito1.cantidad);

  mostrarCarrito();

  // //Preguntamos si desea agregar otro producto al carrito, y si es así se vuelve a ejecutar la función
  // if(confirm("¿Desea agregar otro producto?")){
  //   agregarAlCarrito()
  // }
}

export function mostrarCarrito(){
  const $modal = document.querySelector(".modal");
  const $carritoTable = document.querySelector(".carrito-container table tbody");
  const $fragment = document.createDocumentFragment();
  
  //Muestro el modal
  $modal.style.opacity = 100;

  //Genero tabla del carrito
  carrito1.productos.forEach(producto => {
    
    const $carritoProduct = document.createElement("tr");

    $carritoProduct.innerHTML = `
      <td class="img-container">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </td>
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td>x${producto.cantidad}</td>
      <td>$${producto.cantidad * producto.precio}</td>
    `;

    $fragment.appendChild($carritoProduct)
  
  })

  //Imprimo en pantalla el cuerpo de la tabla
  $carritoTable.innerHTML = "";
  $carritoTable.appendChild($fragment)

  //Declaro variables del pie de la tabla
  const $carritoSubtotal = document.querySelector(".carrito-container table tfoot .subtotal");
  const $carritoIVA = document.querySelector(".carrito-container table tfoot .iva");
  const $carritoSubtotalIVA = document.querySelector(".carrito-container table tfoot .subtotalIva");
  
  //Calculo subtotal de productos y lo muestro
  carrito1.calcularSubtotal();
  $carritoSubtotal.textContent = "$"+carrito1.subTotal;
  
  //Calculo y muestro el IVA
  $carritoIVA.textContent = "$"+carrito1.calcularIVA();
  
  //Calculo subtotal + IVA
  $carritoSubtotalIVA.textContent = "$"+(carrito1.subTotal + carrito1.calcularIVA());


}
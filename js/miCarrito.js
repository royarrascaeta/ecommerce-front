import { productos } from "./products.js";
import { Carrito } from "./Carrito.js";

//Creación de nueva instancia de la clase Carrito
export const carrito1 = new Carrito();

//Creación de función que agrega productos al carrito
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
  $carritoIndex.forEach(span => span.innerHTML = carrito1.cantidadTotal);
}

//Creación de función para mostrar el carrito
export function mostrarCarrito(){

  const $modal = document.querySelector(".modal");
  const $carritoTable = document.querySelector(".carrito-container table");
  const $carritoTableBody = document.querySelector(".carrito-container table tbody");
  const $carritoMessage = document.querySelector(".carrito-container .message");
  //Declaro variables del pie de la tabla
  const $carritoSubtotal = document.querySelector(".carrito-container .subtotal");
  const $thEnvio = document.querySelector(".carrito-container .envio");
  const $carritoTotal = document.querySelector(".carrito-container .total");
  let $btnEnvio = document.querySelector(".carrito-container .boton-principal");
  //Creo fragmento
  const $fragment = document.createDocumentFragment();

  //Muestro el modal
  $modal.style.opacity = 100;

  if(carrito1.cantidadTotal !==0){
    $carritoTable.style.display = "block";
    $carritoMessage.style.display = "none";
  }


  //Genero filas y celdas de la tabla, las inserto en el fragment
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

  //Reinicio el cuerpo de la tabla por si hubiera agregado algún producto al carrito, y luego inserto el fragment en el cuerpo de la tabla
  $carritoTableBody.innerHTML = "";
  $carritoTableBody.appendChild($fragment)

  //Calculo subtotal de productos y lo muestro
  carrito1.calcularSubtotal();
  $carritoSubtotal.textContent = "$"+carrito1.subTotal;
  
  //Envío
  //El boton Calcular Envío llama a la función del constructor "Carrito", dispara un prompt y según la respuesta asigna un valor a la propiedad envio del carrito. Luego se elimina el botón y en su lugar aparece el importe.

  //La bandera "flagEnvio" se activa cuando la función calcularEnvio() fue ejecutada. Si fue ejecutada y el costo de envío es 0 (porque supera el monto establecido) volvemos a crear el boton de Calcular Envio
  if(carrito1.flagEnvio && carrito1.envio != 0){
    $thEnvio.innerHTML = "";
    let $btnNuevo = document.createElement("button");
    $btnNuevo.classList.add("boton-principal");
    $btnNuevo.classList.add("hover");
    $btnNuevo.innerText = "Calcular Envio";
    $thEnvio.appendChild($btnNuevo);
    $btnEnvio = document.querySelector(".carrito-container .envio .boton-principal");
  }

  console.log($btnEnvio);

  $btnEnvio.addEventListener("click",e=>{
    carrito1.consultaEnvio();

    $thEnvio.innerHTML = "$"+carrito1.envio;

    //Muestro el total en pantalla
    carrito1.calcularTotal();
    $carritoTotal.innerHTML = "$"+carrito1.total;
  })

  //Muestro el total en pantalla
  carrito1.calcularTotal();
  $carritoTotal.innerHTML = "$"+carrito1.total;


}
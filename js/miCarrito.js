import { productos } from "./products.js";
import { Carrito } from "./Carrito.js";
import { cerrarModal } from "./modal.js";

//Creación de nueva instancia de la clase Carrito
export const carrito1 = new Carrito();

//Creación de función que agrega productos al carrito
export function agregarAlCarrito(id, cantidad){
  console.log(carrito1)
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

  //Ejecutamos función para actualizar la cantidad total de productos en nuestro carrito, luego la mostramos en el indicador de carrito en el menú y carrito flotante
  carrito1.calcularCantidad();

  const $carritoIndex = document.querySelectorAll(".carrito-span");
  $carritoIndex.forEach(span => span.innerHTML = carrito1.cantidadTotal);

  //Creamos y/o Actualizamos el localStorage
  localStorage.setItem("carritoLocal",JSON.stringify(carrito1))

  //Al finalizar ejecuto la función para que se imprima el detalle en el modal
  mostrarCarrito();
}


//Variables del DOM para usar en las funciones de abajo
const $carritoTable = document.querySelector(".carrito-container table");
const $carritoTableBody = document.querySelector(".carrito-container table tbody");
const $carritoMessage = document.querySelector(".carrito-container .message");
const $carritoSubtotal = document.querySelector(".carrito-container .subtotal");
const $btnEnvio = document.querySelector(".carrito-container .envio .boton-principal");
const $btnVolver = document.querySelector("#btn-volver");
const $btnBorrar = document.querySelector("#btn-borrar");
const $btnComprar = document.querySelector("#btn-comprar");
const $totalEnvio = document.querySelector(".carrito-container .envio .totalEnvio");
const $carritoTotal = document.querySelector(".carrito-container .total");
const $fragment = document.createDocumentFragment();


//Creación de función para mostrar el carrito
export function mostrarCarrito(){
  console.log("Ejecutando función mostrarCarrito")
  console.log(carrito1)

  //Si no hay productos en el carrito se muestra un mensaje que invita a añadir productos al carrito
  if(carrito1.cantidadTotal !==0){
    $carritoTable.style.display = "block";
    $carritoMessage.style.display = "none";
  }

  //Recorro cada producto y genero filas y celdas de la tabla, las inserto en el fragment
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

  //Reinicio el cuerpo de la tabla por si hubiera agregado algún producto al carrito, y luego inserto el fragment
  $carritoTableBody.innerHTML = "";
  $carritoTableBody.appendChild($fragment)

  //Calculo subtotal de productos y lo muestro
  carrito1.calcularSubtotal();
  $carritoSubtotal.textContent = "$"+carrito1.subTotal;

  //Verifico si se ha ejecutado anteriormente la función para calcular envío, y en caso que no se haya bonificado (costo 0) vuelvo a generar el botón para que el usuario pueda acceder al beneficio en caso que haya seguido agregando productos
  if(carrito1.flagEnvio && carrito1.envio !== 0){
    $btnEnvio.style.display = "block";
    $totalEnvio.innerHTML = "";
  }else if(carrito1.flagEnvio && carrito1.envio === 0){
    carrito1.calcularTotal();
    $carritoTotal.textContent = "$"+carrito1.total;
  }
}

//Añadimos el evento al botón de calcular envío
$btnEnvio.addEventListener("click",(e)=>{
  calcularEnvio();
})

//Función para calcular el envío, ejecuta el método del constructor y luego oculta el botón. Finalmente muestra el total con la suma del subtotal + envío
export function calcularEnvio(){

  carrito1.consultaEnvio();
  $btnEnvio.style.display = "none";
  $totalEnvio.innerHTML = "$"+carrito1.envio;

  //Creamos y/o Actualizamos el localStorage
  localStorage.setItem("carritoLocal",JSON.stringify(carrito1))

  //Muestro el total en pantalla
  carrito1.calcularTotal();
  $carritoTotal.innerHTML = "$"+carrito1.total;
}


//Añadimos el evento al botón de borrar
$btnBorrar.addEventListener("click",(e)=>{
  limpiarCarrito();
})


//Función para eliminar los productos del carrito y del LocalStorage
export function limpiarCarrito(){
  if(confirm("¿Desea quitar todos los productos del carrito?")){
    carrito1.limpiarCarrito();
    mostrarCarrito();
  }
}

//Añadimos el evento al botón volver
$btnVolver.addEventListener("click",(e)=>{
  if(location.pathname === "/carrito.html"){
    location.href = "index.html";
  }else{
    cerrarModal();
  }
})
import { Carrito } from "./Carrito.js";
import { cerrarModal } from "./modal.js";

//Creación de nueva instancia de la clase Carrito
export const carrito1 = new Carrito();

//Variables del DOM para usar en las funciones de abajo
const $carritoTable = document.querySelector(".carrito-container table");
const $carritoTableBody = document.querySelector(".carrito-container table tbody");
const $carritoMessage = document.querySelector(".carrito-container .message");
const $carritoSubtotal = document.querySelector(".carrito-container .subtotal");
const $btns = document.querySelector(".carrito-container .botones");
const $btnEnvio = document.querySelector("#btn-envio");
const $btnVolver = document.querySelector("#btn-volver");
const $btnBorrar = document.querySelector("#btn-borrar");
const $btnComprar = document.querySelector("#btn-comprar");
const $totalEnvio = document.querySelector(".carrito-container .envio .totalEnvio");
const $carritoTotal = document.querySelector(".carrito-container .total");
const $fragment = document.createDocumentFragment();


//Creación de función para mostrar el carrito
export function mostrarCarrito(target){
  //Si no hay productos en el carrito se muestra un mensaje que invita a añadir productos al carrito
  if(carrito1.cantidadTotal > 0){
    $carritoTable.style.display = "block";
    $carritoMessage.style.display = "none";
    $btnBorrar.style.display = "block";
    $btnComprar.style.display = "block";
    $btns.style.justifyContent = "space-between";
  }else{
    $btnBorrar.style.display = "none";
    $btnComprar.style.display = "none";
    $btns.style.justifyContent = "center";
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
    //El parámetro target indica desde dónde se ejecutó la función, si es distinto de undefined significa que la ejecutó un botón de añadir producto
    if(target === undefined){
      $btnEnvio.style.display = "none";
      $totalEnvio.innerHTML = "$"+carrito1.envio;
      carrito1.calcularTotal();
      $carritoTotal.textContent = "$"+carrito1.total;
    }else{
      $btnEnvio.style.display = "block";
      $totalEnvio.innerHTML = "";
      $carritoTotal.textContent = "";
    }
  }else if(carrito1.flagEnvio && carrito1.envio === 0){
    $btnEnvio.style.display = "none";
    $totalEnvio.innerHTML = "$"+carrito1.envio;
    carrito1.calcularTotal();
    $carritoTotal.textContent = "$"+carrito1.total;
  }  
}

//Añadiendo evento a los botones
$btnEnvio.addEventListener("click",(e)=>{
  calcularEnvio();
})

$btnBorrar.addEventListener("click",(e)=>{
  limpiarCarrito();
})

$btnVolver.addEventListener("click",(e)=>{
  if(location.pathname === "/carrito.html"){
    location.href = "index.html";
  }else{
    cerrarModal();
  }
})


//Función para calcular el envío, ejecuta el método del constructor y luego oculta el botón. Finalmente muestra el total con la suma del subtotal + envío
export async function calcularEnvio(){

  await carrito1.consultaEnvio();

  $btnEnvio.style.display = "none";
  $totalEnvio.innerHTML = "$"+carrito1.envio;

  //Muestro el total en pantalla
  carrito1.calcularTotal();
  $carritoTotal.innerHTML = "$"+carrito1.total;
}


//Función para eliminar los productos del carrito y del LocalStorage
export function limpiarCarrito(){
  Swal.fire({
      title: 'Carrito',
      text: "¿Desea quitar todos los productos del carrito?",
      icon: undefined,
      showCancelButton: true,
      confirmButtonColor: '#c04abc',
      cancelButtonColor: '#444',
      confirmButtonText: 'Si',
      cancelButtonText: "No"
  }).then((result) => {
    if (result.isConfirmed) {
      carrito1.limpiarCarrito();
      mostrarCarrito();
    }
  })
}
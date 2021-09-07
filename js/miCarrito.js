import { Carrito } from "./Carrito.js";
import { cerrarModal } from "./modal.js";

//Creación de nueva instancia de la clase Carrito
export const carrito1 = new Carrito();

//Variables del DOM para usar en las funciones de abajo
const $containerCarrito = document.querySelector(".container-carrito");
const $carritoTabla = document.querySelector(".carrito-container .carrito-tabla");
const $carritoMessage = document.querySelector(".carrito-container .message");
const $carritoProductos = document.querySelector(".carrito-container .carrito-productos");
const $carritoSubtotal = document.getElementById("subtotal");
const $btnEnvio = document.getElementById("btn-envio");
const $totalEnvio = document.getElementById("totalEnvio");
const $carritoTotal = document.getElementById("total");
const $btnVolver = document.querySelectorAll("#btn-volver");
const $btnBorrar = document.querySelector("#btn-borrar");
const $btnComprar = document.querySelector("#btn-comprar");
const $fragment = document.createDocumentFragment();
const $templateCarrito = document.getElementById("template-carrito").content;


//Creación de función para mostrar el carrito
export function mostrarCarrito(target){
  //Si no hay productos en el carrito se muestra un mensaje que invita a añadir productos al carrito
  if(carrito1.cantidadTotal > 0){
    if($containerCarrito){
      $containerCarrito.style.justifyContent = "start";
    }
    $carritoTabla.style.display = "grid";
    $carritoMessage.style.display = "none";
  }else{
    if($containerCarrito){
      $containerCarrito.style.justifyContent = "center";
    }
    $carritoTabla.style.display = "none";
    $carritoMessage.style.display = "block";
  }

  //Mostrar carrito en pantalla
  carrito1.productos.forEach(producto => {
    $templateCarrito.querySelector("img").src = producto.imagen[0];
    $templateCarrito.querySelector("img").alt = `${producto.nombre}`;
    $templateCarrito.querySelectorAll(".producto div")[1].innerHTML = `<a href="producto.html?id=${producto.id}">${producto.nombre} ${producto.color} - Talle ${producto.talle}</a>`;
    $templateCarrito.querySelectorAll(".producto div")[2].textContent = `$${producto.precio}`;
    $templateCarrito.querySelector("span").textContent = producto.cantidad;
    $templateCarrito.querySelectorAll(".producto div")[4].textContent = `$${producto.cantidad * producto.precio}`;
    $templateCarrito.querySelectorAll(".boton-cantidad")[0].dataset.id = producto.id;
    $templateCarrito.querySelectorAll(".boton-cantidad")[0].dataset.talle = producto.talle;
    $templateCarrito.querySelectorAll(".boton-cantidad")[1].dataset.id = producto.id;
    $templateCarrito.querySelectorAll(".boton-cantidad")[1].dataset.talle = producto.talle;

    //Según la cantidad disponible, habilitamos o deshabilitamos el boton
    if(producto.cantidadDisponible === producto.cantidad){
      $templateCarrito.querySelectorAll(".boton-cantidad")[1].style.opacity = 0.5;
      $templateCarrito.querySelectorAll(".boton-cantidad")[1].disabled = true;
      $templateCarrito.querySelectorAll(".boton-cantidad")[1].style.cursor = "default";
    }else{
      $templateCarrito.querySelectorAll(".boton-cantidad")[1].style.opacity = 1;
      $templateCarrito.querySelectorAll(".boton-cantidad")[1].disabled = false;
      $templateCarrito.querySelectorAll(".boton-cantidad")[1].style.cursor = "pointer";
    }

    const clone = $templateCarrito.cloneNode(true);

    $fragment.appendChild(clone);
  })

  //Reinicio el cuerpo del div contenedor de productos por si hubiera agregado algún producto al carrito, y luego inserto el fragment
  $carritoProductos.innerHTML = "";
  $carritoProductos.appendChild($fragment)

  //Calculo subtotal y total de productos y lo muestro
  carrito1.calcularSubtotal();
  carrito1.calcularTotal();
  $carritoSubtotal.textContent = "$"+carrito1.subTotal;
  $carritoTotal.textContent = "$"+carrito1.total;

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

//Funcion para actualizar indicador de cantidad en carrito flotante y menu
export function indicadorCarrito(){
  $(".carrito-span").each((i, span) => {
      span.innerHTML = carrito1.cantidadTotal;
  });
}

//Eventos de botones de aumentar y reducir cantidad
$carritoProductos.addEventListener("click", (e)=>{
  let id = e.target.dataset.id;
  let talle = e.target.dataset.talle;
  let producto = carrito1.productos.find(producto => producto.id === parseInt(id) && producto.talle === talle);

   //Boton restar cantidad
  if(e.target.textContent === "-"){
   
    if(producto.cantidad > 1){
      producto.cantidad--
      carrito1.calcularCantidad();
      mostrarCarrito();
      indicadorCarrito();
    }else{
      carrito1.productos = carrito1.productos.filter(product => product.id != id || product.talle != talle);
      carrito1.calcularCantidad();
      mostrarCarrito();
      indicadorCarrito();
    }
    
  }
  
  //Boton sumar cantidad
  if(e.target.textContent === "+"){
    if(producto.cantidad < producto.cantidadDisponible){
      producto.cantidad++
      carrito1.calcularCantidad();
      mostrarCarrito();
    }else if(producto.cantidad - 1 == producto.cantidadDisponible){
      producto.cantidad++
      carrito1.calcularCantidad();
      mostrarCarrito();
      console.log(e.target)
      console.log("Ultimo en stock")
    }else{
      console.log("No queda stock")
    }
  }
})

//Eventos de botones envio, limpiar y volver
$btnEnvio.addEventListener("click",()=>{
  calcularEnvio();
})

$btnBorrar.addEventListener("click",()=>{
  limpiarCarrito();
})

$btnVolver.forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(document.body.dataset.section === "carrito" || document.body.dataset.section === "producto"){
      location.href = "index.html";
    }else{
      cerrarModal();
    }
  })
})
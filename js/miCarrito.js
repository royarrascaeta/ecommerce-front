import { Carrito } from "./Carrito.js";
import { checkout } from "./checkout.js";
import { actualizarLocalStorage } from "./index.js";
import { cerrarModal } from "./modal.js";

//Creación de nueva instancia de la clase Carrito
export const carrito1 = new Carrito();

//Variables del DOM para usar en las funciones de abajo
const $containerCarrito = document.querySelector(".container-carrito");
const $carritoMessage = document.querySelector(".carrito-container .message");
const $carritoTabla = document.querySelector(".carrito-container .carrito-tabla");
const $carritoProductos = document.querySelector(".carrito-container .carrito-productos");
const $carritoSubtotal = document.getElementById("subtotal");
const $btnEnvio = document.getElementById("btn-envio");
const $totalEnvio = document.getElementById("totalEnvio");
const $carritoTotal = document.getElementById("total");
const $btnVolver = document.querySelectorAll("#btn-volver");
const $btnBorrar = document.getElementById("btn-borrar");
const $btnComprar = document.getElementById("btn-comprar");
const $templateCarrito = document.getElementById("template-carrito").content;
const $fragment = document.createDocumentFragment();

//Creación de función para mostrar el carrito
export function mostrarCarrito(){
  //Actualizo mi carrito según el carrito guardado en localStorage
  actualizarLocalStorage();

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

   //Verifico si se ha ejecutado anteriormente la función para calcular envío, si no es así muestro el botón para calcular el envío
  if(!carrito1.flagEnvio){
    $btnEnvio.style.display = "block";
    $totalEnvio.innerHTML = "";
    $carritoTotal.textContent = "";
  }else{
    $btnEnvio.style.display = "none";
    //Evaluo si se solicitó o no el envío
    if(carrito1.envio){
      if(carrito1.subTotal > 5000){
        carrito1.totalEnvio = 0;
        $totalEnvio.innerHTML = `<small><del>$650</del></small><b>$${carrito1.totalEnvio}</b>`;
      }else{
        carrito1.totalEnvio = 650;
        $totalEnvio.innerHTML = `<b>$${carrito1.totalEnvio}<b>`;
      }
  
    }else{
      $totalEnvio.innerHTML = `<b>$${carrito1.totalEnvio}<b>`;
    }
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
  $carritoSubtotal.innerHTML = `<b>$${carrito1.subTotal}</b>`;
  $carritoTotal.innerHTML = `<b>$${carrito1.total}</b>`;

 
}

//Función para calcular el envío, ejecuta el método del constructor y luego oculta el botón. Finalmente muestra el total con la suma del subtotal + envío
export async function calcularEnvio(){
  await carrito1.consultaEnvio();

  mostrarCarrito();
}


//Función para eliminar los productos del carrito y del LocalStorage
export function limpiarCarrito(confirm){
  if(confirm){
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
  }else{
    carrito1.limpiarCarrito();
    mostrarCarrito();
  }
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
    }
  }
})

//Eventos de botones envio, limpiar, volver y avanzar
document.addEventListener("click", (e)=>{
  if(e.target === $btnEnvio){
    calcularEnvio();
  }

  if(e.target === $btnBorrar){
    limpiarCarrito(true);
  }

  if(e.target === $btnVolver[0] || e.target === $btnVolver[1]){
    if(document.body.dataset.section === "carrito" || document.body.dataset.section === "producto"){
      location.href = "shop.html";
    }else{
      cerrarModal();
    }
  }

  if(e.target === $btnComprar){
    checkout(e,$carritoTabla,$containerCarrito);
  }
})
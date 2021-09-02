import { Carrito } from "./Carrito.js";
import { cerrarModal } from "./modal.js";

//Creación de nueva instancia de la clase Carrito
export const carrito1 = new Carrito();

//Variables del DOM para usar en las funciones de abajo
const $carritoTabla = document.querySelector(".carrito-container .carrito-tabla");
const $carritoMessage = document.querySelector(".carrito-container .message");
const $carritoProductos = document.querySelector(".carrito-container .carrito-productos");
const $carritoSubtotal = document.getElementById("subtotal");
const $btnEnvio = document.getElementById("btn-envio");
const $totalEnvio = document.getElementById("totalEnvio");
const $carritoTotal = document.getElementById("total");
const $btnVolver = document.querySelector("#btn-volver");
const $btnBorrar = document.querySelector("#btn-borrar");
const $btnComprar = document.querySelector("#btn-comprar");
const $fragment = document.createDocumentFragment();
const $templateCarrito = document.getElementById("template-carrito").content;


//Creación de función para mostrar el carrito
export function mostrarCarrito(target){
  //Si no hay productos en el carrito se muestra un mensaje que invita a añadir productos al carrito
  if(carrito1.cantidadTotal > 0){
    $carritoTabla.style.display = "grid";
    $carritoMessage.style.display = "none";
  }else{
    $carritoTabla.style.display = "none";
  }

  carrito1.productos.forEach(producto => {
    $templateCarrito.querySelector("img").src = producto.imagen;
    $templateCarrito.querySelector("img").alt = producto.nombre;
    $templateCarrito.querySelectorAll(".producto div")[1].textContent = producto.nombre;
    $templateCarrito.querySelectorAll(".producto div")[2].textContent = `$${producto.precio}`;
    $templateCarrito.querySelector("span").textContent = producto.cantidad;
    $templateCarrito.querySelectorAll(".producto div")[4].textContent = `$${producto.cantidad * producto.precio}`;
    $templateCarrito.querySelectorAll(".boton-cantidad")[0].dataset.id = producto.id;
    $templateCarrito.querySelectorAll(".boton-cantidad")[1].dataset.id = producto.id;

    const clone = $templateCarrito.cloneNode(true);

    $fragment.appendChild(clone)
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

//Botones cantidad
  $carritoProductos.addEventListener("click", (e)=>{
    if(e.target.textContent === "-"){
      let id = e.target.dataset.id;
      let producto = carrito1.productos.find(producto => producto.id === parseInt(id))

      if(producto.cantidad != 1){
        producto.cantidad--
        mostrarCarrito();
      }else{
        
      }

    }

    if(e.target.textContent === "+"){
      let id = e.target.dataset.id;
      let producto = carrito1.productos.find(producto => producto.id === parseInt(id))
      producto.cantidad++

      mostrarCarrito();
    }
  })

//Añadiendo evento a los botones
$btnEnvio.addEventListener("click",()=>{
  calcularEnvio();
})

$btnBorrar.addEventListener("click",()=>{
  limpiarCarrito();
})

$btnVolver.addEventListener("click",()=>{
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
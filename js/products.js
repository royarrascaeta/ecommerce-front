// import { mostrarCarrito, carrito1 } from "./miCarrito.js";
import { Product } from "./Product.js";
import { mostrarCategorias, ordenarProductos } from "./ordenaryFiltrar.js";
import { mostrarPaginacion } from "./paginacion.js";

//Creo array vacío para cargar productos
export const productos = [];

//Función que mediante ajax recoge los productos del archivo data.json y los guarda en la variable productos declarada arriba. Finalmente ejecuta la función mostrarProductos()
const URLJSON = "./data/data.json";


export function cargarProductos(callback) {
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      const db = respuesta;

      for (let product of db) {
        productos.push(new Product(product.id, product.nombre, product.categoria, product.precio, product.imagen, product.color, product.descripcion, product.stock))
      }
    }
  }).done(callback)
    .fail(function () {
      $(".products-container").append(`
    <p style="width: 100%; text-align: center;">Error al cargar los productos</p>`)
    })
}


//Funcion para mostrar los productos en el DOM con jQuery
export function mostrarProductos(productosSel = productos, start = 0, container = ".products-container") {
  //Convierto a número el valor start
  start = parseInt(start);

  $(container).empty().append(`
    <div class="loader-container">
      <img src="assets/loader.svg" alt="">
    </div>`);

  const fragment = document.createDocumentFragment();

  productosSel.slice(start, start + 8).forEach(producto => {
    fragment.appendChild(producto.mostrarProducto())
  })

  $(container)
    .append(fragment).children().hide();

  $(container).children().fadeIn("fast", function () {
    $(".loader-container").hide();
  });
}


// //Función para mostrar los productos en el DOM con Vanilla JS
// export const mostrarProductos = () =>{
//   const $productsContainer = document.querySelector(".products-container");

//   productos.forEach(producto => {
//     let $div = document.createElement("div");
//     $div.classList.add("product-card");
//     $div.innerHTML = `
//       <div class="img-container">
//         <img src="${producto.imagen}" alt="${producto.nombre}">
//       </div>
//       <h3>${producto.nombre}</h3>
//       <div class="precio">$${producto.precio}</div>
//       <div class="comprar">
//         <label for="cantidad">Cantidad:</label>
//         <input name="cantidad" type="number" value=1 min="1" max="10">
//         </div>
//       <button class="boton-principal hover">Agregar al Carrito</button>
//       <div class="message">Producto añadido al carrito</div>
//       `;
//     $productsContainer.appendChild($div);

//     //Declaración de variables DOM
//     const $btnComprar = $div.querySelector(".product-card .boton-principal");
//     const $inputCantidad = $div.querySelector(".product-card input[name='cantidad']");
//     const $message = $div.querySelector(".product-card .message");

//     //Asignación de evento en botón de producto
//     $btnComprar.addEventListener("click",(e)=>{

//       carrito1.agregarProducto(producto, parseInt($inputCantidad.value));

//       //Mostramos la cantidad en el indicador de carrito en el menú y carrito flotante
//       const $carritoIndex = document.querySelectorAll(".carrito-span");
//       $carritoIndex.forEach(span => span.innerHTML = carrito1.cantidadTotal);

//       //Actualizamos mostrar carrito
//       mostrarCarrito(e.target);

//       //Removemos temporalmente el efecto hover del botón y lo deshabilitamos
//       e.target.classList.remove("hover");
//       e.target.disabled = true;

//       //Reseteamos el input
//       $inputCantidad.value = 1;
//       $message.style.display = "block";

//       //Mostramos el msj de confirmación de añadir producto al carrito y luego de 2 segundos lo ocultamos
//       setTimeout(() => {
//         $message.style.display = "none";
//         e.target.classList.add("hover");
//         e.target.disabled = false;
//       }, 2000);
//     })
//   });
// }

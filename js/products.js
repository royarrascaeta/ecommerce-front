// import { mostrarCarrito, carrito1 } from "./miCarrito.js";
import { slider } from "./slider.js";
import { Product } from "./Product.js";
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
  })
  .done(callback)
  .fail(function () {
    $(".products-container").append(`
  <p style="width: 100%; text-align: center;">Error al cargar los productos</p>`)
  })
}


//Funcion para mostrar los productos en el DOM con jQuery
export function mostrarProductos(productosSel = productos, start = 0, end = 8, container = ".products-container", titulo = "Mostrando: Todos los productos") {
  //Convierto a número el valor start
  start = parseInt(start);
  end = parseInt(end);

  //Cambiamos dinámicamente el título
  const $h3 = document.querySelector("h3.resultados");
  if($h3){
    $h3.textContent = titulo;
  }

  //Vacío el contenedor y luego muestro productos
  $(container).empty().append(`
    <div class="loader-container">
      <img src="assets/loader.svg" alt="">
    </div>`);

  const fragment = document.createDocumentFragment();

  //Si no hay resultados, se muestra un mensaje
  if(productosSel.length === 0){
    console.log("Sin resultados");
    $h3.innerHTML += `<br><br><small>No se encontraron resultados.</small>`
  }

  productosSel.slice(start, start + end).forEach(producto => {
    fragment.appendChild(producto.mostrarProducto())
  })

  $(container)
    .append(fragment).children().hide();

  $(container).children().fadeIn("fast", function () {
    $(".loader-container").hide();
  });
}


//Funcion para mostrar los datos de un SOLO producto en la sección producto.html
export function mostrarProducto(id = parseInt(location.search.split("=")[1])){
  const producto = productos.find(producto=> producto.id === id)
  const talles = Object.keys(producto.stock);
  const $productCarrito = document.querySelector(".product-carrito");
  const $slides = document.querySelector(".slides");
  const $btnComprar = document.querySelector(".botones .boton-principal");
  const $colores = document.querySelector(".opciones .colores");
  const $inputTalles = document.getElementById("select-talles");
  const $inputCantidad = document.getElementById("select-cantidad");

  $colores.innerHTML = "";
  $inputTalles.innerHTML = `<option value="">Selecciona el talle</option>`;
  $inputCantidad.innerHTML = `<option value="">Elige primero el talle</option>`;

  //Carrusel de imagenes
  for(let imagen of producto.imagen){
    $slides.innerHTML += `<div class="image"><img src="${imagen}" alt="" ></div>`
  }

  slider(".slider-container");

  //Nombre, precio y detalle del producto
  $productCarrito.querySelector("h2").textContent = `${producto.nombre} ${producto.color}`;
  $productCarrito.querySelector("h3").textContent = "$"+ producto.precio;
  $productCarrito.querySelector("p").textContent = producto.descripcion;

  //Colores
  let mismoColor = productos.filter(product => product.nombre === producto.nombre);

  for(let producto of mismoColor){
    $colores.innerHTML += `<a class="hover" href="producto.html?id=${producto.id}"><img src="${producto.imagen[0]}" alt="${producto.nombre}"></a>`;
  }

  //Talle
  //Mostrar dinamicamente los talles con stock disponible
  for(let talle of talles){
    if(producto.stock[talle] != 0){
      $inputTalles.innerHTML += `<option value="${talle}">${talle}</option>`
    }
  }

  //Añadiendo evento al select
  $inputTalles.addEventListener("change", (e)=>{
    e.preventDefault();

    let talleElegido = e.target.value;

    if(talleElegido != ""){
      //Cantidad: Mostrando dinámicamente la cantidad disponible
      $inputTalles.options[0].style.display = "none";
      $inputCantidad.disabled = false;
      $inputCantidad.innerHTML = "";

      let cantidad = producto.stock[talleElegido];

      for(let i = 1; i <= cantidad; i++){
        $inputCantidad.innerHTML += `<option value="${i}">${i}</option>`
      }
    }else{
      $inputCantidad.disabled = true;
      $inputCantidad.innerHTML = `<option value="">Elige primero el talle</option>`;
    }
  })

  //Click agregar al carrito
  $btnComprar.addEventListener("click",(e)=>{
    e.preventDefault();

    //Obtengo valores de los input
    let talle = $inputTalles.value;
    let cantidad = $inputCantidad.value;
    //Creo una copia del producto de la base de datos, y modifico la propiedad stock para que solo tenga un objeto (con los valores talle y cantidad del input)
    let productoElegido = {...producto}
    productoElegido.cantidadDisponible = parseInt(productoElegido.stock[talle]);
    productoElegido.stock = {};
    productoElegido.stock[talle] = parseInt(cantidad);
    
    if($inputTalles.value !== ""){
      producto.agregarAlCarrito(e, productoElegido);
      $inputTalles.options[0].style.display = "block";
      $inputTalles.options[0].selected = true;
      $inputCantidad.disabled = true;
      $inputCantidad.innerHTML = `<option value="">Elige primero el talle</option>`;
    }else{
      Swal.fire({
        title: 'Atención!',
        text: "Primero debes elegir un talle",
        icon: undefined,
        showCancelButton: false,
        confirmButtonColor: '#c04abc',
        cancelButtonColor: '#444',
        confirmButtonText: 'Aceptar',
      })
      $inputTalles.focus();
    }

  })

  //Productos relacionados
  const $relContainer = document.querySelector(".products-container");
  const productosRel = productos.filter(product => product.categoria === producto.categoria && product.id != producto.id);

  //Si la cantidad de productos relacionados es menor a 6, relleno el array con productos aleatorios
  while(productosRel.length < 6){
    let i = Math.round(Math.random() * productos.length)
    productosRel.push(productos[i])
  }

  mostrarProductos(productosRel, 0, undefined, $relContainer)
}


//Funcion para reducir cantidad
export function reducirStock(producto){
  let id = producto.id;
  let talle = producto.talle ? producto.talle : Object.keys(producto.stock);
  let cantidad = producto.cantidad ? producto.cantidad : producto.stock[talle];
  let productoTarget = productos.find(product => product.id === id);

  productoTarget.stock[talle] -= cantidad;
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

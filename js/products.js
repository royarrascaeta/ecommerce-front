import { mostrarCarrito, carrito1 } from "./miCarrito.js";
import { Product } from "./Product.js";

//Creo array vacío para cargar productos
export const productos = [];

//Función que mediante ajax recoge los productos del archivo data.json y los guarda en la variable productos declarada arriba. Finalmente ejecuta la función mostrarProductos()
const URLJSON = "../data/data.json";


export function cargarProductos(){
  $.getJSON(URLJSON, function(respuesta, estado){
    if(estado === "success"){
      const db = respuesta;

      for(let product of db){
        productos.push(new Product(product.id, product.nombre, product.categoria, product.precio, product.imagen))
      }
    }
  })
  .done(function(){
    mostrarProductos();
    mostrarCategorias();
    $(".loader-container").hide();
  })
  .fail(function(){
    $(".products-container").append(`
    <p style="width: 100%; text-align: center;">Error al cargar los productos</p>`)
  })
}


//Funcion para mostrar los productos en el DOM con jQuery
export function mostrarProductos(productosSel = productos){
  $(".products-container").empty();
  productosSel.forEach(producto => {
    $(".products-container").append(`
      <div class="product-card">
        <div class="img-container">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <h3>${producto.nombre}</h3>
        <div class="precio">$${producto.precio}</div>
        <div class="comprar">
          <label for="cantidad">Cantidad:</label>
          <input name="cantidad" type="number" value=1 min="1" max="10">
        </div>
        <button data-id="${producto.id}" class="boton-principal hover"><i class="fas fa-shopping-cart"></i>Agregar al Carrito</button>
      </div>
    `).children().hide();
  })

  $(".products-container").children().fadeIn("fast");

  //Añado el evento al boton. Cada boton tiene un data-id con el id del producto, lo capturo y con el método find encuentro el producto elegido y lo guardo en la variable producto. La cantidad la recojo del input type number, a través del padre del boton $(this).parent() y con .children() llego a sus hijos
  $(".product-card .boton-principal").on("click",function(e){
    let producto = productosSel.find(producto => producto.id === parseInt(this.dataset.id));

    let $cantidad = $(this).parent().children(".comprar").children("input");
    let $message = $(".message-float");

    //Agregamos el producto al carrito con la cantidad indicada en el input
    carrito1.agregarProducto(producto, parseInt($cantidad.val()));

    //Actualizamos indicador de cantidad en boton flotante del carrito e indicador de cantidad en menú
    $(".carrito-span").each((i, span) => {
      span.innerHTML = carrito1.cantidadTotal;
    });

    //Actualizamos mostrar carrito, le pasamos como parámetro el botón
    mostrarCarrito(this);

    //Removemos temporalmente el efecto hover del botón y lo deshabilitamos
    $(this).removeClass("hover");
    $(this).prop("disabled", true);

    //Reseteamos el input
    $cantidad.val("1");


    //Mostramos el msj de confirmación de añadir producto al carrito. Luego de 1 segundo habilitamos el efecto hover del boton y lo habilitamos
    $message.slideToggle("fast");
    
    setTimeout(() => {
      $message.slideToggle("fast");
      $(this).addClass("hover");
      $(this).prop("disabled", false);
    }, 1500);

  })
  
}

//Categorias
function mostrarCategorias(){
const $btnCategorias = document.querySelector(".filters h3 i");
const $ulCategorias = document.querySelectorAll(".filters ul")

$btnCategorias.addEventListener("click",(e)=>{
  $($ulCategorias).slideToggle();
  $btnCategorias.classList.toggle("fa-chevron-up")
})

const todos = productos;
const remeras = productos.filter(producto => producto.categoria == "Remeras");
const camisas = productos.filter(producto => producto.categoria == "Camisas");
const jeans = productos.filter(producto => producto.categoria == "Jeans");
const camperas = productos.filter(producto => producto.categoria == "Camperas");
const buzos = productos.filter(producto => producto.categoria == "Buzos");
const accesorios = productos.filter(producto => producto.categoria == "Accesorios");

const $todos = document.querySelector(".filters ul li:nth-child(1)");
const $remeras = document.querySelector(".filters ul li:nth-child(2)")
const $camisas = document.querySelector(".filters ul li:nth-child(3)")
const $jeans = document.querySelector(".filters ul li:nth-child(4)")
const $camperas = document.querySelector(".filters ul li:nth-child(5)")
const $buzos = document.querySelector(".filters ul li:nth-child(6)")
const $accesorios = document.querySelector(".filters ul li:nth-child(7)")

$todos.innerHTML += `<span>(${todos.length})</span>`;
$remeras.innerHTML += `<span>(${remeras.length})</span>`;
$camisas.innerHTML += `<span>(${camisas.length})</span>`;
$jeans.innerHTML += `<span>(${jeans.length})</span>`;
$camperas.innerHTML += `<span>(${camperas.length})</span>`;
$buzos.innerHTML += `<span>(${buzos.length})</span>`;
$accesorios.innerHTML += `<span>(${accesorios.length})</span>`;

document.addEventListener("click",(e)=>{
  if(e.target == $todos){
    mostrarProductos()
  }

  if(e.target == $remeras){
    mostrarProductos(remeras)
  }

  if(e.target == $camisas){
    mostrarProductos(camisas)
  }

  if(e.target == $jeans){
    mostrarProductos(jeans)
  }

  if(e.target == $camperas){
    mostrarProductos(camperas)
  }
  
  if(e.target == $buzos){
    mostrarProductos(buzos)
  }
  
  if(e.target == $accesorios){
    mostrarProductos(accesorios)
  }
})

}




export function ordenarProductos(order){
  let orderBy = "";
  const $productos = document.querySelectorAll(".product-card");

  if(order === "pr-mintomax"){
    orderBy = productos.sort((a,b) => a.precio - b.precio);
  }else if(order === "pr-maxtomin"){
    orderBy = productos.sort((a,b) => b.precio - a.precio);
  }

  for(let producto of $productos){
    let nombre = producto.querySelector("h3").innerHTML;
    let indice = orderBy.findIndex(producto => producto.nombre == nombre);

    $(producto).fadeOut("fast", function(){
      producto.style.order = indice;
    }).delay(100).fadeIn("fast")
  }
}



// //Función para mostrar los productos en el DOM
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
import { mostrarCarrito, carrito1 } from "./miCarrito.js";
import { Product } from "./Product.js";

//Agrego los productos de la base de datos data.json al array productos
const db = JSON.parse(data);

export const productos = [];

for(let product of db){
  productos.push(new Product(product.id, product.nombre, product.precio, product.imagen))
}


//Funcion para mostrar los productos en el DOM con jQuery
export function mostrarProductos(){
  productos.forEach(producto => {
    $(".products-container").append(`
      <div class="product-card">
        <div class="img-container">
          <img src="${producto.imagen}" alt="${producto.nombre}">
        </div>
        <h3>${producto.nombre}</h3>
        <div class="comprar">
          <label for="cantidad">Cantidad:</label>
          <input name="cantidad" type="number" value=1 min="1" max="10">
        </div>
        <button data-id="${producto.id}" class="boton-principal hover">Agregar al Carrito</button>
        <div class="message">Producto añadido al carrito</div>
      </div>
    `)
    
  })

  //Añado el evento al boton. Cada boton tiene un data-id con el id del producto, lo capturo y con el método find encuentro el producto elegido y lo guardo en la variable producto. La cantidad la recojo del input type number, a través del padre del boton $(this).parent() y con .children() llego a sus hijos
  $(".product-card .boton-principal").on("click",function(e){
    let producto = productos.find(producto => producto.id === parseInt(this.dataset.id));

    let $cantidad = $(this).parent().children(".comprar").children("input");
    let $message = $(this).parent().children(".message");

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
    $message.css("display","block");
    
    //Mostramos el msj de confirmación de añadir producto al carrito y luego de 2 segundos lo ocultamos
    setTimeout(() => {
      $message.css("display","none");
      $(this).addClass("hover");
      $(this).prop("disabled", false);
    }, 2000);

  })
  
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
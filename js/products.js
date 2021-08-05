import { agregarAlCarrito } from "./miCarrito.js";
import { Product } from "./Product.js";

//Agrego los productos al array productos
export const productos = [];

function agregarProducto(id,nombre,precio,imagen){
  return productos.push(new Product(id,nombre,precio,imagen))
}

agregarProducto(1,"Buzo",1700,"/assets/products/buzo.jpeg")
agregarProducto(2,"Camisa",1800,"/assets/products/camisa.jpeg")
agregarProducto(3,"Pantalón",3500,"assets/products/pantalon.jpeg")
agregarProducto(4,"Campera",7300,"/assets/products/campera.jpeg")
agregarProducto(5,"Remera",1200,"/assets/products/remera.jpeg")
agregarProducto(6,"Gorra",800,"/assets/products/gorra.jpeg")


//Función para mostrar los productos en el DOM
export const mostrarProductos = (productos) =>{
  const $productsContainer = document.querySelector(".products-container");

  productos.forEach(producto => {
    let $div = document.createElement("div");
    $div.classList.add("product-card");
    $div.innerHTML = `
      <div class="img-container">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <h3>${producto.nombre}</h3>
      <div class="precio">$${producto.precio}</div>
      <div class="comprar">
        <label for="cantidad">Cantidad:</label>
        <input name="cantidad" type="number" value=1 min="1" max="10">
        </div>
      <button class="boton-principal hover">Agregar al Carrito</button>
      <div class="message">Producto añadido al carrito</div>
      `;
    $productsContainer.appendChild($div);

    //Declaración de variables DOM
    const $btnComprar = $div.querySelector(".product-card .boton-principal");
    const $inputCantidad = $div.querySelector(".product-card input[name='cantidad']");
    const $message = $div.querySelector(".product-card .message");

    $btnComprar.addEventListener("click",(e)=>{

      agregarAlCarrito(producto.id, parseInt($inputCantidad.value));

      //Removemos temporalmente el efecto hover del botón y lo deshabilitamos
      e.target.classList.remove("hover");
      e.target.disabled = true;

      //Reseteamos el input
      $inputCantidad.value = 1;
      $message.style.display = "block";
      
      //Mostramos el msj de confirmación de añadir producto al carrito y luego de 2 segundos lo ocultamos
      setTimeout(() => {
        $message.style.display = "none";
        e.target.classList.add("hover");
        e.target.disabled = false;
      }, 2000);
    })
  });
}
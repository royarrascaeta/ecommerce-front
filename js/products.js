import { agregarAlCarrito } from "./carrito.js";

//Base de datos simulada
export const productos = [
  {
    "id": 1,
    "nombre": "Buzo",
    "precio": 1700,
    "imagen": "/assets/products/buzo.jpeg"
  },
  {
    "id": 2,
    "nombre": "Camisa",
    "precio": 1800,
    "imagen": "/assets/products/camisa.jpeg"
  },
  {
    "id": 3,
    "nombre": "Pantalón",
    "precio": 3500,
    "imagen": "/assets/products/pantalon.jpeg"
  },
  {
    "id": 4,
    "nombre": "Campera",
    "precio": 7300,
    "imagen": "/assets/products/campera.jpeg"
  },
  {
    "id": 5,
    "nombre": "Remera",
    "precio": 1200,
    "imagen": "/assets/products/remera.jpeg"
  },
  {
    "id": 6,
    "nombre": "Gorra",
    "precio": 800,
    "imagen": "/assets/products/gorra.jpeg"
  }
]

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
      <button class="boton-comprar hover">Agregar al Carrito</button>
      <div class="message">Producto añadido al carrito</div>
      `;
    $productsContainer.appendChild($div);

    //Declaración de variables DOM
    const $btnComprar = $div.querySelector(".boton-comprar");
    const $inputCantidad = $div.querySelector("input[name='cantidad']");
    const $message = $div.querySelector(".message");

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
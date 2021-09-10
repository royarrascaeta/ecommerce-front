import { carrito1, mostrarCarrito, indicadorCarrito } from "./miCarrito.js";

//Clase constructora de productos
export class Product{
  constructor(id, nombre, categoria, precio, imagen, color, descripcion, stock){
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.iva = 0.21;
    this.precio = (precio + precio * this.iva).toFixed(0);
    this.imagen = imagen;
    this.color = color;
    this.descripcion = descripcion;
    this.stock = stock;
  }

  //Funcion para mostrar card de producto en el DOM
  mostrarProducto(){
    const $templateCard = document.getElementById("template-card").content;
    $templateCard.querySelector("img").src = this.imagen[0];
    $templateCard.querySelector("img").alt = this.nombre;
    $templateCard.querySelector("h3").innerText = `${this.nombre} ${this.color}`;
    $templateCard.querySelector(".precio").innerText = `$${this.precio}`;
        
    const clone = $templateCard.cloneNode(true)

    clone.querySelector(".product-card").addEventListener("click", (e)=>{
      location.href = `producto.html?id=${this.id}`;
    })

    return clone
  }

  //Funcion al hacer click en boton Agregar al carrito
  agregarAlCarrito(e, producto){
    let $message = $(".message-float");

    //Agregamos el producto al carrito
    carrito1.agregarProducto(producto);
    
    //Actualizamos indicador de cantidad en boton flotante del carrito e indicador de cantidad en menú
    indicadorCarrito();

    //Removemos temporalmente el efecto hover del botón y lo deshabilitamos
    $(e.target).removeClass("hover");
    $(e.target).prop("disabled", true);

    //Mostramos el msj de confirmación de añadir producto al carrito. Luego de 1 segundo habilitamos el efecto hover del boton y lo habilitamos
    $message.slideToggle("fast");
     setTimeout(() => {
      $message.slideToggle("fast");
      $(e.target).addClass("hover");
      $(e.target).prop("disabled", false);
    }, 3000);
  }
}
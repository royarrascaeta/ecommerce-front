import { carrito1, mostrarCarrito } from "./miCarrito.js";

//Clase constructora de productos
export class Product{
  constructor(id, nombre, categoria, precio, imagen){
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.iva = 0.21;
    this.precio = (precio + precio * this.iva).toFixed(0);
    this.imagen = imagen;
  }

  //Funcion para mostrar card de producto en el DOM
  mostrarProducto(){
    const $templateCard = document.getElementById("template-card").content;
    $templateCard.querySelector("img").src = this.imagen;
    $templateCard.querySelector("img").alt = this.nombre;
    $templateCard.querySelector("h3").innerText = this.nombre;
    $templateCard.querySelector(".precio").innerText = `$${this.precio}`;
        
    const clone = $templateCard.cloneNode(true)

    const $btn = clone.querySelector(".boton-principal");
    const $input = clone.querySelector(".comprar input");
    
    //Añado el evento del boton, y le envio el producto y la cantidad del input
    $btn.addEventListener("click",(e)=>{
      let producto = this;

      this.agregarAlCarrito(e, producto, $input);
    })

    return clone
  }

  //Funcion al hacer click en boton Agregar al carrito
  agregarAlCarrito(e, producto, input){
    let $message = $(".message-float");

    //Agregamos el producto al carrito con la cantidad indicada en el input, luego reseteamos el input
    carrito1.agregarProducto(producto, parseInt(input.value));
    input.value = 1;

    //Actualizamos indicador de cantidad en boton flotante del carrito e indicador de cantidad en menú
    $(".carrito-span").each((i, span) => {
      span.innerHTML = carrito1.cantidadTotal;
    });

    //Actualizamos mostrar carrito, le pasamos como parámetro el botón
    mostrarCarrito(e.target);

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
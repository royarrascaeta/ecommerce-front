import {productos, cargarProductos, mostrarProductos, mostrarProducto, reducirStock} from "./products.js";
import {mobileMenu} from "./mobilemenu.js";
import {modal} from "./modal.js";
import {carrito1, mostrarCarrito} from "./miCarrito.js";
import {mostrarCategorias, ordenarProductos} from "./ordenaryFiltrar.js";
import {mostrarPaginacion} from "./paginacion.js";
import { buscador } from "./buscador.js";
import { slider } from "./slider.js";

//Ejecuto los scripts necesarios a la carga del DOM
document.addEventListener("DOMContentLoaded", ()=>{
  mobileMenu();
  cargarProductos(function(){
    //Callbacks
    actualizarLocalStorage();

    //Si estamos en la seccion index
    if(document.body.dataset.section === "index"){
      modal();
      slider(".slider-container",true);
      const $contenedorDestacados = document.querySelector(".featured");
      mostrarProductos(productos, 0, 6, $contenedorDestacados)
    }

    //Si estamos en la seccion shop
    if(document.body.dataset.section === "shop"){
      mostrarProductos();
      mostrarCategorias();
      mostrarPaginacion();
      ordenarProductos(productos);
      buscador();
      modal();
    }

    //Si estamos en la seccion producto
    if(document.body.dataset.section === "producto"){
      mostrarProducto()
      modal();
    }

    //Si estamos en la seccion carrito
    if(document.body.dataset.section === "carrito"){
      mostrarCarrito();
    }
  })
});


//Funcion localStorage
export function actualizarLocalStorage(){
  //Creamos variable en localStorage y actualizamos nuestro carrito tomando los valores almacenados en localStorage
  if(!localStorage.carritoLocal){
    localStorage.setItem("carritoLocal",JSON.stringify(carrito1));
  }
  
  const carritoLocal = JSON.parse(localStorage.carritoLocal);
  carrito1.productos = carritoLocal.productos;
  carrito1.flagEnvio = carritoLocal.flagEnvio;
  carrito1.totalEnvio = carritoLocal.totalEnvio;
  carrito1.envio = carritoLocal.envio;
  carrito1.calcularCantidad();
  carrito1.calcularSubtotal();
  carrito1.calcularTotal();

  //Actualizamos stock de productos
  carrito1.productos.forEach(product => {
    reducirStock(product)
  })
  
  //Actualizo y muestro el índice indicador de productos en el carrito
  const $carritoIndex = document.querySelectorAll(".carrito-span");
  $carritoIndex.forEach(span => span.innerHTML = carrito1.cantidadTotal);
  
  //Imprimimos en pantalla los datos del carrito
  // mostrarCarrito();
}
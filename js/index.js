import {productos, cargarProductos, mostrarProductos, mostrarProducto} from "./products.js";
import {mobileMenu} from "./mobilemenu.js";
import {modal} from "./modal.js";
import {carrito1, mostrarCarrito} from "./miCarrito.js";
import {mostrarCategorias, ordenarProductos} from "./ordenaryFiltrar.js";
import {mostrarPaginacion} from "./paginacion.js";

//Ejecuto los scripts necesarios a la carga del DOM
document.addEventListener("DOMContentLoaded", ()=>{
  mobileMenu();
  cargarProductos(function(){
    //Callbacks
    //Si estamos en la seccion index
    if(document.body.dataset.section === "index"){
      mostrarProductos();
      mostrarCategorias();
      mostrarPaginacion();
      ordenarProductos(productos);
    }

    //Si estamos en la seccion producto
    if(document.body.dataset.section === "producto"){
      mostrarProducto()
    }
  })

  if(document.body.dataset.section !== "carrito"){
    modal();
  }

  //Creamos variable en localStorage y actualizamos nuestro carrito tomando los valores almacenados en localStorage
  if(!localStorage.carritoLocal){
    localStorage.setItem("carritoLocal",JSON.stringify(carrito1));
  }
  
  const carritoLocal = JSON.parse(localStorage.carritoLocal);
  carrito1.productos = carritoLocal.productos;
  carrito1.flagEnvio = carritoLocal.flagEnvio;
  carrito1.envio = carritoLocal.envio;
  carrito1.calcularCantidad();
  
  //Actualizo y muestro el índice indicador de productos en el carrito
  const $carritoIndex = document.querySelectorAll(".carrito-span");
  $carritoIndex.forEach(span => span.innerHTML = carrito1.cantidadTotal);
  
  //Imprimimos en pantalla los datos del carrito
  mostrarCarrito();
});
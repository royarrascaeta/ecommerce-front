import {productos, mostrarProductos} from "./products.js";
import {mobileMenu} from "./mobilemenu.js";
import {modal} from "./modal.js";
import {carrito1, mostrarCarrito} from "./miCarrito.js";

//Ejecuto los scripts necesarios a la carga del DOM
document.addEventListener("DOMContentLoaded",()=>{
  mobileMenu();

  if(location.pathname === "/index.html"){
    mostrarProductos();
  }

  modal();

  if(!localStorage.carritoLocal){
    localStorage.setItem("carritoLocal",JSON.stringify(carrito1));
  }
    const carritoLocal = JSON.parse(localStorage.carritoLocal);
    carrito1.productos = carritoLocal.productos;
    carrito1.flagEnvio = carritoLocal.flagEnvio;
    carrito1.calcularCantidad();
    const $carritoIndex = document.querySelectorAll(".carrito-span");
    $carritoIndex.forEach(span => span.innerHTML = carrito1.cantidadTotal);
    mostrarCarrito();
});
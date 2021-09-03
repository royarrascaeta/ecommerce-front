import {productos, cargarProductos, mostrarProductos} from "./products.js";
import {mobileMenu} from "./mobilemenu.js";
import {modal} from "./modal.js";
import {carrito1, mostrarCarrito} from "./miCarrito.js";
import {mostrarCategorias, ordenarProductos} from "./ordenaryFiltrar.js";
import {mostrarPaginacion} from "./paginacion.js";
import {slider} from "./slider.js";

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
      const id = parseInt(location.search.split("=")[1]);
      const producto = productos.find(producto=> producto.id === id)
      const $productCarrito = document.querySelector(".product-carrito");
      const $carrouselContainer = document.querySelector(".carrousel-container");
      const $btnComprar = document.querySelector(".botones .boton-principal");
      const $inputCantidad = document.getElementById("select-cantidad");

      $productCarrito.querySelector("h2").textContent = producto.nombre;
      $productCarrito.querySelector("h3").textContent = "$"+ producto.precio;

      for(let imagen of producto.imagen){
        $carrouselContainer.innerHTML += `<div><img src="${imagen}" alt="" ></div>`
      }

      slider();

      //Click agregar al carrito
      $btnComprar.addEventListener("click",(e)=>{
        producto.agregarAlCarrito(e, producto, $inputCantidad);
      })

      //Productos relacionados
      const $productosRelacionados = document.querySelector(".products-container");
      const relacionados = productos.filter(product => product.categoria === producto.categoria && product.id != producto.id);

      mostrarProductos(relacionados, 0, $productosRelacionados)
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
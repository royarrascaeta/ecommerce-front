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
      const talles = Object.keys(producto.stock);
      const $productCarrito = document.querySelector(".product-carrito");
      const $carrouselContainer = document.querySelector(".carrousel-container");
      const $btnComprar = document.querySelector(".botones .boton-principal");
      const $inputTalles = document.getElementById("select-talles");
      const $inputCantidad = document.getElementById("select-cantidad");

      $productCarrito.querySelector("h2").textContent = producto.nombre;
      $productCarrito.querySelector("h3").textContent = "$"+ producto.precio;
      $productCarrito.querySelector("p").textContent = producto.descripcion;

      //Talle
      //Mostrar dinamicamente los talles con stock disponible
      for(let talle of talles){
        if(producto.stock[talle] != 0){
          $inputTalles.innerHTML += `<option value="${talle}">${talle}</option>`
        }
      }

      //Añadiendo evento
      $inputTalles.addEventListener("change", (e)=>{
        let talleElegido = e.target.value;
        
        if(talleElegido != ""){
          //Cantidad
          //Mostrando dinamicamente la cantidad disponible
          $inputTalles.options[0].style.display = "none";
          $inputCantidad.disabled = false;
          $inputCantidad.innerHTML = "";

          let cantidad = producto.stock[talleElegido];

          for(let i = 1; i <= cantidad; i++){
            $inputCantidad.innerHTML += `<option value="${i}">${i}</option>`
          }
        }else{
          $inputCantidad.disabled = true;
          $inputCantidad.innerHTML = `<option value="">Elige primero el talle</option>`;
        }
      })

      //Imagen
      for(let imagen of producto.imagen){
        $carrouselContainer.innerHTML += `<div><img src="${imagen}" alt="" ></div>`
      }

      slider();

      //Click agregar al carrito
      $btnComprar.addEventListener("click",(e)=>{
        let talle = $inputTalles.value;
        let cantidad = $inputCantidad.value;
        let productoElegido = {...producto}
        productoElegido.stock = {};
        productoElegido.stock[talle] = parseInt(cantidad);

        producto.agregarAlCarrito(e, productoElegido);
        $inputTalles.options[0].style.display = "block";
        $inputTalles.options[0].selected = true;
        $inputCantidad.disabled = true;
        $inputCantidad.innerHTML = `<option value="">Elige primero el talle</option>`;
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
import { mostrarCarrito } from "./miCarrito.js";

const $modal = document.querySelector(".modal");

export function modal(){
  const $btnModal = document.querySelector("header a[href='#micarrito']");
  const $btnModalFloat = document.querySelector(".carrito-float *")
  const $btnCloseModal = document.querySelector(".modal .close > *");

  document.addEventListener("click",e=>{
    if(e.target == $modal || e.target == $btnCloseModal){
      cerrarModal();
    }

    if(e.target == $btnModal || e.target == $btnModalFloat){
      abrirModal();
    }
  })
}

function abrirModal(){
  console.log("Ejecutando funcion abrirModal")
  $modal.style.display = "flex";
}

function cerrarModal(){
  console.log("Ejecutando funcion cerrarModal")
  $modal.style.display = "none";
}
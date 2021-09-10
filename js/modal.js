import { mostrarCarrito } from "./miCarrito.js";

const $modal = document.querySelector(".modal");

export function modal(){
  const $btnModal = document.querySelectorAll("header a[href='#micarrito']");
  const $btnModalFloat = document.querySelector(".carrito-float")
  const $btnCloseModal = document.querySelector(".modal .close > *");

  document.addEventListener("click",e=>{
    if(e.target == $modal || e.target == $btnCloseModal){
      cerrarModal();
    }
    
    if(e.target == $btnModal[0] || e.target == $btnModal[1]  || e.target == $btnModalFloat){
      abrirModal();
    }
  })
}

export function abrirModal(){
  mostrarCarrito();
  $($modal)
    .css({"opacity":0, "display": "flex"})
    .animate({opacity: 1},200)
}

export function cerrarModal(){
  $($modal)
  .animate({opacity: 0},200, function(){
    $(this).css("display", "none")
  })
}
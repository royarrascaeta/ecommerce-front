import { productos, mostrarProductos } from "./products.js";

export function paginacion(products = productos){
  const $pagination = document.querySelector(".pagination");
  let totalPages = Math.ceil(products.length / 8);
  let start = 0;
  
  //Reseteo la paginacion
  $pagination.innerHTML = "";

  //Genero botones
  for(let i = 0; i < totalPages; i++){
    let $btn = document.createElement("button");
    $btn.innerText = i + 1;
    $btn.dataset.start = parseInt(start);

    if(i == 0){
      $btn.classList.add("boton-principal","hover")
    }else{
      $btn.classList.add("boton-principal","boton-principal-alt","hover");
    }

    $btn.addEventListener("click",(e)=>{
      mostrarProductos(products, e.target.dataset.start);

      window.scrollTo(0,0)

      let $otherBtns = e.target.parentNode.querySelectorAll("button");

      $otherBtns.forEach(btn => {
        btn.classList.add("boton-principal-alt")
      });
      
      e.target.classList.remove("boton-principal-alt");
      e.target.classList.add("boton-principal");
    })

    $pagination.appendChild($btn)

    start += 9;
  }
}
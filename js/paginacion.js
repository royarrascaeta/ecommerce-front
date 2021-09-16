import { productos, mostrarProductos } from "./products.js";

export function mostrarPaginacion(products = productos){
  const $pagination = document.querySelector(".pagination");
  let totalPages = Math.ceil(products.length / 8);
  let start = 0;
  
  //Reseteo la paginacion
  $pagination.innerHTML = "";

  if(totalPages > 1){
    //Genero botones
    for(let i = 0; i < totalPages; i++){
      let $btn = document.createElement("button");
      $btn.innerText = i + 1;
      $btn.dataset.start = parseInt(start);

      //Si no hay paginación deshabilito el boton
      if(i == 0){
        $btn.classList.add("boton-principal")
        $btn.disabled = true;
        $btn.style.cursor = "default";
      }else{
        $btn.classList.add("boton-principal","boton-principal-alt","hover");
      }

      $btn.addEventListener("click",(e)=>{
        mostrarProductos(products, e.target.dataset.start);

        //Desplazamiento hacia arriba
        window.scrollTo(0,0)

        //Selecciono los otros botones para aplicarle estilos
        let $otherBtns = e.target.parentNode.querySelectorAll("button");

        //Habilito todos los botones y les añado el cursor pointer
        $otherBtns.forEach(btn => {
          btn.classList.add("boton-principal-alt","hover")
          btn.disabled = false;
          btn.style.cursor = "pointer";
        });
        
        //Cambio estilos para el boton que ha sido clickeado
        e.target.classList.remove("boton-principal-alt","hover");
        e.target.classList.add("boton-principal");
        e.target.disabled = true;
        e.target.style.cursor = "default";
      })

      $pagination.appendChild($btn)

      start += 9;
    }
  }
}
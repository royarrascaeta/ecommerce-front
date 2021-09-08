import { productos, mostrarProductos } from "./products.js";
import { mostrarPaginacion } from "./paginacion.js";

const $orderSelect = document.querySelector("#order");

//Función para ordenar productos
export function ordenarProductos(products){

  $orderSelect.addEventListener("change",(e)=>{
    let index = e.target.selectedIndex;
    let value = e.target.options[index].value;
    let productosOrdenados = "";

    if(value == "pr-mintomax"){
      productosOrdenados = products.sort((a,b) => a.precio - b.precio);
    }else if(value == "pr-maxtomin"){
      productosOrdenados = products.sort((a,b) => b.precio - a.precio);
    }else{
      return;
    }
       
    mostrarProductos(productosOrdenados)
  })
}


//Categorias
export function mostrarCategorias(){
  //Boton para desplegar categorias
  const $btnCategorias = document.getElementById("btn-categorias");
  const $ulCategorias = document.querySelector(".filters ul")

  const categorias = ["Todos"];

  productos.forEach(producto => {
    let categoria = producto.categoria;

    if(!categorias.includes(categoria)){
      categorias.push(categoria)
    }
  })

  categorias.forEach((categoria) =>{
    let $li = document.createElement("li");
    let filter = categoria == "Todos" ? productos : productos.filter(producto => producto.categoria == categoria);
    $li.innerHTML = `${categoria} <span>(${filter.length})</span>`;

    $li.addEventListener("click",(e)=>{
      mostrarProductos(filter,undefined,undefined,`Mostrando: categoría ${categoria}`);
      mostrarPaginacion(filter);
      ordenarProductos(filter)

      //Reseteo el select
      $orderSelect.options[0].selected = true;

      //Selecciono los otros botones para aplicarle estilos
      let $otherLi = e.target.parentNode.querySelectorAll("li");

      //Modifico los botones
      $otherLi.forEach(li => {
        li.style.opacity = 0.8;
        li.style.fontWeight = 500;
      });

      //Aplico estilos al boton seleccionado
      e.target.style.opacity = 1;
      e.target.style.fontWeight = "bold";
    })

    $ulCategorias.appendChild($li);
  })

  $btnCategorias.addEventListener("click",(e)=>{
    $($ulCategorias).slideToggle();
    $btnCategorias.querySelector("i").classList.toggle("fa-chevron-up")
  })
}
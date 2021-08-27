import { productos, mostrarProductos } from "./products.js";
import { paginacion } from "./paginacion.js";

//Función para ordenar productos
export function ordenarProductos(products){
  const $orderSelect = document.querySelector("#order");

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
    console.log(categoria)
    let $li = document.createElement("li");
    let filter = categoria == "Todos" ? productos : productos.filter(producto => producto.categoria == categoria);
    $li.innerHTML = `<li>${categoria} <span>(${filter.length})</span></li>`;

    $li.addEventListener("click",(e)=>{
      mostrarProductos(filter);
      paginacion(filter);
      ordenarProductos(filter)
    })

    $ulCategorias.appendChild($li);
  })

  $btnCategorias.addEventListener("click",(e)=>{
    $($ulCategorias).slideToggle();
    $btnCategorias.querySelector("i").classList.toggle("fa-chevron-up")
  })
}
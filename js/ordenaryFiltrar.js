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
  const $btnCategorias = document.querySelector(".filters h3 i");
  const $ulCategorias = document.querySelectorAll(".filters ul")

  $btnCategorias.addEventListener("click",(e)=>{
    $($ulCategorias).slideToggle();
    $btnCategorias.classList.toggle("fa-chevron-up")
  })

  //Asignación de cantidad y evento click
  const todos = productos;
  const remeras = productos.filter(producto => producto.categoria == "Remeras");
  const camisas = productos.filter(producto => producto.categoria == "Camisas");
  const jeans = productos.filter(producto => producto.categoria == "Jeans");
  const camperas = productos.filter(producto => producto.categoria == "Camperas");
  const buzos = productos.filter(producto => producto.categoria == "Buzos");
  const accesorios = productos.filter(producto => producto.categoria == "Accesorios");

  const $todos = document.querySelector(".filters ul li:nth-child(1)");
  const $remeras = document.querySelector(".filters ul li:nth-child(2)")
  const $camisas = document.querySelector(".filters ul li:nth-child(3)")
  const $jeans = document.querySelector(".filters ul li:nth-child(4)")
  const $camperas = document.querySelector(".filters ul li:nth-child(5)")
  const $buzos = document.querySelector(".filters ul li:nth-child(6)")
  const $accesorios = document.querySelector(".filters ul li:nth-child(7)")

  $todos.innerHTML += `<span>(${todos.length})</span>`;
  $remeras.innerHTML += `<span>(${remeras.length})</span>`;
  $camisas.innerHTML += `<span>(${camisas.length})</span>`;
  $jeans.innerHTML += `<span>(${jeans.length})</span>`;
  $camperas.innerHTML += `<span>(${camperas.length})</span>`;
  $buzos.innerHTML += `<span>(${buzos.length})</span>`;
  $accesorios.innerHTML += `<span>(${accesorios.length})</span>`;

  document.addEventListener("click",(e)=>{
    if(e.target == $todos){
      mostrarProductos()
      paginacion(todos);
      ordenarProductos(todos)
    }

    if(e.target == $remeras){
      mostrarProductos(remeras)
      paginacion(remeras)
      ordenarProductos(remeras)
    }
    
    if(e.target == $camisas){
      mostrarProductos(camisas)
      paginacion(camisas)
      ordenarProductos(camisas)
    }
    
    if(e.target == $jeans){
      mostrarProductos(jeans)
      paginacion(jeans)
      ordenarProductos(jeans)
    }
    
    if(e.target == $camperas){
      mostrarProductos(camperas)
      paginacion(camperas)
      ordenarProductos(camperas)
    }
    
    if(e.target == $buzos){
      mostrarProductos(buzos)
      paginacion(buzos)
      ordenarProductos(buzos)
    }
    
    if(e.target == $accesorios){
      mostrarProductos(accesorios)
      paginacion(accesorios)
      ordenarProductos(accesorios)
    }
  })
}
import { mostrarProductos, productos } from "./products.js";
import { mostrarPaginacion } from "./paginacion.js";
import { ordenarProductos } from "./ordenaryFiltrar.js";

export function buscador(){
    const $input = document.getElementById("buscador");
    const $btn = document.querySelector(".buscador i");

    const buscar = () =>{
        let busqueda = $input.value.toLowerCase();
        let resultados = productos.filter(product => (product.nombre).toLowerCase().includes(busqueda) || (product.categoria).toLowerCase().includes(busqueda) || (product.color).toLowerCase().includes(busqueda) || (product.descripcion).toLowerCase().includes(busqueda));
        mostrarProductos(resultados,undefined,undefined,undefined,`Mostrando resultados para: "${busqueda}"`);
        mostrarPaginacion(resultados);
        ordenarProductos(resultados);
    }

    $input.addEventListener("keyup", (e)=>{
        if(e.code === "Enter" || e.code === "NumpadEnter"){
            buscar();
        }
    })    

    $btn.addEventListener("click", (e)=>{
        buscar();
    })
}
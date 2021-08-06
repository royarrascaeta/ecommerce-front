import {productos, mostrarProductos} from "./products.js";
import {mobileMenu} from "./mobilemenu.js";
import {modal} from "./modal.js";

document.addEventListener("DOMContentLoaded",()=>{
  mobileMenu();
  mostrarProductos(productos);
  modal();
});





import {productos, mostrarProductos} from "./products.js";
import {carrito1, agregarAlCarrito} from "./carrito.js";
import {mobileMenu} from "./mobilemenu.js";

document.addEventListener("DOMContentLoadead",mostrarProductos(productos));
document.addEventListener("DOMContentLoaded",mobileMenu());

// // Ejecución del programa
// // Está dentro de un setTimeOut para que pueda cargar el contenido visual antes de que aparezca el primer alert
// setTimeout(() => {
//   alert("Bienvenido/a a la tienda!");
  
//   agregarAlCarrito();
  
//   //Llamada a métodos de la clase una vez que no se añaden más productos al carrito
//   carrito1.calcularSubtotal();
//   carrito1.calcularIVA();
//   carrito1.consultaEnvio();
//   carrito1.calcularTotal();
  
//   //Muestra de los datos en pantalla
//   alert(`
//   Detalle del pedido: \n ${carrito1.mostrarProductos()}
//   ----------
//   - Subtotal: $${carrito1.subTotal}
//   ----------
//   - IVA 21%: $${carrito1.calcularIVA()}
//   - Costo de envío: $${carrito1.envio}
//   ========
//   - TOTAL = $${carrito1.total}
//   `);
// }, 1000);

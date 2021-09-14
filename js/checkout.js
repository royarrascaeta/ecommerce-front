import { carrito1, limpiarCarrito } from "./miCarrito.js";

//Función para generar el checkout y finalizar la compra
export function checkout(e, tabla, container){
  e.preventDefault();

  //Si se ejecuta desde el modal de carrito, redirige a la sección carrito.
  if(document.body.dataset.section === "index" || document.body.dataset.section === "producto"){
      location.href = "carrito.html";
  }else{
    //Verificamos que se haya calculado el envío
    if(!carrito1.flagEnvio){
      Swal.fire({
        title: 'Envio',
        text: "Primero debes calcular el envío",
        icon: undefined,
        showCancelButton: false,
        confirmButtonColor: '#c04abc',
        cancelButtonColor: '#444',
        confirmButtonText: 'Aceptar',
      })
    }else{
      //Animaciones de ocultar y mostrar contenedores
      $(tabla.children[0]).slideUp("slow");
      $(tabla.children[1]).slideUp("slow");
      $(tabla.children[2]).fadeIn("slow");
      $(tabla.children[3]).fadeIn(0, function(){
        $(this).css("display","flex");
        window.scrollTo(0,0);
      });
      

      //Muestro el detalle final
      const $finalProductos = document.querySelectorAll(".carrito-final > div")[0];
      const $finalTotal = document.querySelectorAll(".carrito-final > div")[1];

      $finalProductos.innerHTML = "";
      carrito1.productos.forEach(product => {
        $finalProductos.innerHTML += `
          <img src="${product.imagen[0]}" alt="${product.nombre}">
          <div><b>${product.nombre} ${product.color}</b> ${product.talle} x${product.cantidad}</div>
          <div>$${product.cantidad * product.precio}</div>
        `
      })

      $finalTotal.innerHTML = `
        <div>Envío:</div>
        <div>$${carrito1.totalEnvio}</div>
        <div>Total:</div>
        <div>$${carrito1.total}</div>
      `;

      //Programo botones de finalizar compra o volver
      const $btnCheckoutVolver = document.getElementById("btn-checkout-volver");
      const $form = document.getElementById("form-checkout");

      document.addEventListener("click", (e)=>{
        if(e.target === $btnCheckoutVolver){
          e.preventDefault();
          $(tabla.children[2]).fadeOut("slow");
          $(tabla.children[3]).fadeOut("slow");
          $(tabla.children[0]).slideDown("slow");
          $(tabla.children[1]).slideDown("slow");
        }
      });

      $form.addEventListener("submit", e=>{
        e.preventDefault();

        let numPedido = Math.ceil(Math.random() * 123456789,0);

        $(tabla.children[2]).slideUp("slow");
        window.scrollTo(0,0);
        $(tabla.children[3]).slideUp("slow", function(){
          document.querySelector(".carrito-container").innerHTML = "";

          container.innerHTML += `
            <div class="checkout-message">
              <h2>Su compra se procesó correctamente.</h2>
              <p>Su número de pedido es: <strong>${numPedido}</strong></p>
              <div></div>
            </div>
          `;

          const $btnLimpiarCarrito = document.createElement("button");
          $btnLimpiarCarrito.textContent = "Volver";
          $btnLimpiarCarrito.classList.add("boton-principal","hover");
          $btnLimpiarCarrito.setAttribute("id","btn-limpiar-carrito");
          
          $btnLimpiarCarrito.addEventListener("click", (e)=>{
            limpiarCarrito();
            location = "index.html";
          })

          container.querySelector(".checkout-message div").appendChild($btnLimpiarCarrito);

        });
      });
    }
  }

  
}

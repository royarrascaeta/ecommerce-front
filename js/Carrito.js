import { reducirStock, mostrarProducto } from "./products.js";
import { mostrarCarrito } from "./miCarrito.js";

//Clase constructora del carrito y sus métodos
export class Carrito{
  constructor(){
    this.productos = [],
    this.cantidadTotal = 0,
    this.flagEnvio = false,
    this.envio = false,
    this.totalEnvio = 0,
    this.subTotal = 0,
    this.total = 0;
  }

  agregarProducto(producto){
    //Creo una variable y mediante findIndex determino la ubicación del producto elegido, para averiguar si ya existe en el arreglo productos o no
    let talle = Object.keys(producto.stock)[0];
    let indice = this.productos.findIndex(el=>el.nombre == producto.nombre && el.talle == talle && el.id == producto.id);

    //Si el producto existe, aumento la propiedad 'cantidad', caso contrario añado el nuevo producto al arreglo
    if(indice != -1){
      this.productos[indice].cantidad += producto.stock[talle];
    }else{
      this.productos.push({"id": producto.id, "nombre": producto.nombre, "imagen": producto.imagen, "color": producto.color, "precio": parseInt(producto.precio), "talle": talle, "cantidad":producto.stock[talle], "cantidadDisponible":producto.cantidadDisponible});
    }

    //Reducimos stock y actualizamos la pantalla
    reducirStock(producto);
    mostrarProducto(producto.id);

    //Ejecuto la función calcularCantidad() para que se actualice el valor de cantidadTotal
    this.calcularCantidad();

    //Creo o actualizo la variable carritoLocal en localStorage y le paso todo el objeto
    localStorage.setItem("carritoLocal",JSON.stringify(this))
  }

  indicadorCarrito(){
    $(".carrito-span").each((i, span) => {
        span.innerHTML = this.cantidadTotal;
    });
  }

  calcularCantidad(){
    this.cantidadTotal = 0;
    for(let producto of this.productos){
      this.cantidadTotal += producto.cantidad;
    }
    localStorage.setItem("carritoLocal",JSON.stringify(this))
  };

  calcularSubtotal(){
    this.subTotal = 0;
    for(let producto of this.productos){
      this.subTotal += producto.precio * producto.cantidad;
    }
    localStorage.setItem("carritoLocal",JSON.stringify(this))
  };
  
  consultaEnvio(){
    this.flagEnvio = true;

    //Actualizo la variable carritoLocal en localStorage y le paso todo el objeto
    localStorage.setItem("carritoLocal",JSON.stringify(this));
    
    return Swal.fire({
      title: 'Envío',
      text: "¿Desea que le enviemos el producto a domicilio?",
      icon: undefined,
      showCancelButton: true,
      confirmButtonColor: '#c04abc',
      cancelButtonColor: '#444',
      confirmButtonText: 'Si!',
      cancelButtonText: "No, gracias."
    }).then((result) => {
      if (result.isConfirmed) {
        this.calcularEnvio();
      }else{
        this.totalEnvio = 0;
      }
    })
  };
  
  calcularEnvio(){
    this.envio = true;

    if(this.subTotal > 5000){

      Swal.fire({
        title: 'Envío',
        text: "Felicitaciones! Superaste los $5000 y tu envío ahora es GRATIS!",
        icon: undefined,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#c04abc'
      })
      this.totalEnvio = 0;
    }else{
      this.totalEnvio = 650;
    }

    //Actualizo la variable carritoLocal en localStorage y le paso todo el objeto
    localStorage.setItem("carritoLocal",JSON.stringify(this))
  };

  calcularTotal(){
    this.total = this.subTotal + this.totalEnvio;

    localStorage.setItem("carritoLocal",JSON.stringify(this))
  };

  limpiarCarrito(confirm, reload){
    if(confirm){
      Swal.fire({
          title: 'Carrito',
          text: "¿Desea quitar todos los productos del carrito?",
          icon: undefined,
          showCancelButton: true,
          confirmButtonColor: '#c04abc',
          cancelButtonColor: '#444',
          confirmButtonText: 'Si',
          cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Confirmacion aceptada")
          this.productos = [],
          this.cantidadTotal = 0;
          this.totalEnvio = 0,
          this.envio = false,
          this.subTotal = 0,
          this.total = 0
          this.flagEnvio = false;

          this.indicadorCarrito();

          localStorage.removeItem("carritoLocal");

          mostrarCarrito();

          if(reload){
            location.reload();
          }
        }
      })
    }else{
      this.indicadorCarrito();
      localStorage.removeItem("carritoLocal");
    }
  }
}
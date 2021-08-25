//Clase constructora del carrito y sus métodos
export class Carrito{
  constructor(){
    this.productos = [],
    this.cantidadTotal = 0;
    this.envio = 0,
    this.subTotal = 0,
    this.total = 0,
    this.flagEnvio = false;
  }

  agregarProducto(producto, cantidad){
    //Creo una variable y mediante findIndex determino la ubicación del producto elegido, para averiguar si ya existe en el arreglo productos o no
    let indice = this.productos.findIndex(el=>el.nombre == producto.nombre);

    //Si el producto existe, aumento la propiedad 'cantidad', caso contrario añado el nuevo producto al arreglo
    if(indice != -1){
      this.productos[indice].cantidad += cantidad
    }else{
      this.productos.push({"id-producto": producto.id, "nombre": producto.nombre, "imagen": producto.imagen, "precio": producto.precio, "cantidad":cantidad});
    }

    //Ejecuto la función calcularCantidad() para que se actualice el valor de cantidadTotal
    this.calcularCantidad();

    //Creo o actualizo la variable carritoLocal en localStorage y le paso todo el objeto
    localStorage.setItem("carritoLocal",JSON.stringify(this))
  }

  calcularCantidad(){
    this.cantidadTotal = 0;
    for(let producto of this.productos){
      this.cantidadTotal += producto.cantidad;
    }
  };

  calcularSubtotal(){
    this.subTotal = 0;
    for(let producto of this.productos){
      this.subTotal += producto.precio * producto.cantidad;
    }
  };
  
  consultaEnvio(){
    this.flagEnvio = true;

    console.log(this)

    //Actualizo la variable carritoLocal en localStorage y le paso todo el objeto
    localStorage.setItem("carritoLocal",JSON.stringify(this))
    
    // return confirm("¿Desea que le enviemos el producto a domicilio?") ? this.calcularEnvio() : this.envio = 0;

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
        this.calcularEnvio()
        console.log(this)
      }else{
        this.envio = 0;
      }
    })
  };
  
  calcularEnvio(){
    if(this.subTotal >= 5000){

      Swal.fire({
        title: 'Envío',
        text: "Si! Superaste los $5000 y tu envío ahora es GRATIS!",
        icon: undefined,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#c04abc'
      })

      // alert("Felicitaciones!\nSu compra supera los $5000 y por ello tenes el envío bonificado!")
      this.envio = 0;
    }else{
      this.envio = 650;
    }

    //Actualizo la variable carritoLocal en localStorage y le paso todo el objeto
    localStorage.setItem("carritoLocal",JSON.stringify(this))
  };

  calcularTotal(){
    this.total = this.subTotal + this.envio;
  };

  limpiarCarrito(){
    this.productos = [],
    this.cantidadTotal = 0;
    this.envio = 0,
    this.subTotal = 0,
    this.total = 0
    this.flagEnvio = false;

    localStorage.removeItem("carritoLocal");
    location.reload();
  }
}
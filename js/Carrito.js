//Clase constructora del carrito y sus métodos
export class Carrito{
  constructor(){
    this.productos = [],
    this.cantidadTotal = 0;
    this.envio = 0,
    this.subTotal = 0,
    this.total = 0
    this.flagEnvio = false;
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
    return confirm("¿Desea que le enviemos el producto a domicilio?") ? this.calcularEnvio() : this.envio = 0;
  };
  
  calcularEnvio(){
    this.flagEnvio = true;
    if(this.subTotal >= 5000){
      alert("Felicitaciones!\nSu compra supera los $5000 y por ello tenes el envío bonificado!")
      this.envio = 0;
    }else{
      this.envio = 650;
    }
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

    localStorage.clear();
    location.reload();
  }
}
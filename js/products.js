//Base de datos simulada
export const productos = [
  {
    "id": 1,
    "nombre": "Buzo",
    "precio": 1700,
    "imagen": "/assets/products/buzo.jpeg"
  },
  {
    "id": 2,
    "nombre": "Camisa",
    "precio": 1800,
    "imagen": "/assets/products/camisa.jpeg"
  },
  {
    "id": 3,
    "nombre": "Pantalón",
    "precio": 3500,
    "imagen": "/assets/products/pantalon.jpeg"
  },
  {
    "id": 4,
    "nombre": "Campera",
    "precio": 7300,
    "imagen": "/assets/products/campera.jpeg"
  },
  {
    "id": 5,
    "nombre": "Remera",
    "precio": 1200,
    "imagen": "/assets/products/remera.jpeg"
  },
  {
    "id": 6,
    "nombre": "Gorra",
    "precio": 800,
    "imagen": "/assets/products/gorra.jpeg"
  }
]

export const mostrarProductos = (productos) =>{
  const $productsContainer = document.querySelector(".products-container");

  productos.forEach(producto => {
    let $div = document.createElement("div");
    $div.classList.add("product-card");
    $div.innerHTML = `
      <div class="img-container">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <h3>${producto.nombre}</h3>
      <div class="precio">$${producto.precio}</div>
      <div class="comprar">
        <label for="cantidad">Cantidad:</label>
        <input name="cantidad" type="number" value="1" min="1" max="10">
        <button class="boton-comprar">Comprar</button>
      </div>`;
    $productsContainer.appendChild($div);
  });
}
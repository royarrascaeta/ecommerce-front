## :shirt: E-commerce front (simulador)

### :mag_right: Descripcion y características

- Proyecto final del curso de Javascript de Coderhouse.
- Tienda virtual con temática de ropa de hombre.
- Los productos están almacenados en una base de datos local (data/data.json).
- Las imágenes y nombres de productos son propiedad de la tienda [Loned](https://www.loned.com.ar).
- Posee filtrado de productos por categoría, y ordenamiento por precio (de menor a mayor y viceversa), También posee un buscador, el cual acepta palabras incluidas en el título, categoría, color o descripción del producto y botones de paginación dinámica.
- Funcionalidad de limitar la cantidad de productos que el cliente puede añadir en base al stock disponible (en el lado del cliente).
- Funcionalidad para añadir o eliminar productos del carrito.
- Funcionalidad para calcular envío en base al monto de la compra.
- Diseño responsive desarrollado con Sass y CSS puro, basado en grid.
- Secciones del sitio:
  - Index/Home: Presenta un slider con algunas categorías destacadas y un botón para acceder a ellas (filtrado). Una sección de productos destacados con un enlace para visitar toda la tienda y na sección donde ese muestran las categorías principales.
  - Shop: Consiste en la tienda virtual en sí misma, se muestra a la izquierda (o arriba si es en version mobile) la seccion de filtros, buscador y categorías, y a la derecha (o abajo en version mobile) los productos y al final de todo la paginación dinámica.
  - Producto: En esta sección se muestra en detalle cada producto, se muestran fotos y variaciones de colores. Desde aquí se añaden al carrito previamente seleccionando talle y cantidad. Debajo de todo se muestran productos relacionados.
  - Carrito: Aqui se muestran los productos añadidos, con posibilidad de aumentar o reducir la cantidad (eliminando el producto al llegar a 0) o visitar de nuevo la página de cada producto. A la derecha (o abajo en la version mobile) se muestra el detalle de la compra, con un boton para calcular el envío (se bonifica si la compra supera los AR$5000) y otro para finalizar la compra. Al finalizar la compra se despliega un formulario para introducir los datos y finalmente se procesa el pedido devolviendo al usuario un número de pedido.

### :hammer_and_wrench: Lenguajes utilizados y herramientas (frameworks, librerías)

- HTML
- CSS
- Javascript Vanilla
- Sass
- Jquery
- Sweetalert 2

### :earth_americas: Link del proyecto en GithubPages

- [Roy ecommerce](https://roy-ecommerce.netlify.app/ "E-commerce front")

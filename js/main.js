// 1. DATOS BASE Y PERSISTENCIA (Storage)
const productos = [
  { id: 1, nombre: "Remera", precio: 15000 },
  { id: 2, nombre: "Pantalón", precio: 35000 },
  { id: 3, nombre: "Zapatillas", precio: 60000 }
];

// Operadores modernos: Nullish Coalescing (??) para arrancar vacíos si no hay nada en Storage
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];

// Elementos del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("contenedor-carrito");
const totalSpan = document.getElementById("total");
const btnVaciar = document.getElementById("btn-vaciar");

// 2. MOSTRAR PRODUCTOS EN PANTALLA
function mostrarProductos() {
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    // Destructuring: extraemos propiedades directamente
    const { id, nombre, precio } = producto;

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${nombre}</h3>
      <p>Precio: $${precio}</p>
      <button onclick="agregarAlCarrito(${id})">Agregar al Carrito</button>
    `;
    contenedorProductos.appendChild(div);
  });
}

// 3. MOSTRAR CARRITO Y RE-RENDERIZAR
function mostrarCarrito() {
  contenedorCarrito.innerHTML = "";

  // Operador ternario simple
  carrito.length === 0
    ? (contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>")
    : carrito.forEach((item) => {
        // Destructuring del ítem
        const { id, nombre, precio } = item;

        const div = document.createElement("div");
        div.className = "item-carrito";
        div.innerHTML = `
          <span>${nombre} - $${precio}</span>
          <button onclick="eliminarDelCarrito(${id})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(div);
      });

  actualizarTotal();
}

// 4. FUNCIONES DEL CARRITO Y SINCRONIZACIÓN
function agregarAlCarrito(idProducto) {
  const productoElegido = productos.find((prod) => prod.id === idProducto);
  carrito.push(productoElegido);
  sincronizar();
}

function eliminarDelCarrito(idProducto) {
  // Buscamos el índice para eliminar solo un elemento en vez de todos
  const indice = carrito.findIndex((item) => item.id === idProducto);
  if (indice !== -1) {
    carrito.splice(indice, 1);
  }
  sincronizar();
}

btnVaciar.addEventListener("click", () => {
  carrito = [];
  sincronizar();
});

function actualizarTotal() {
  const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  totalSpan.innerText = total;
}

// Guarda en Storage y vuelve a pintar la vista
function sincronizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

// Carga inicial
mostrarProductos();
mostrarCarrito();
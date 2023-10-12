document.addEventListener("DOMContentLoaded", function () {
    const productos = document.querySelectorAll("#productos li");
    const carrito = document.querySelector("#carrito");
    const totalElement = document.querySelector("#total");
    const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

    // Define los precios de los productos aquí
    const preciosProductos = {
        1: 10,
        2: 20,
        3: 30
    };

    // Inicializar el carrito desde localStorage si existe
    let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];

    // Función para renderizar el carrito
    function renderCarrito() {
        carrito.innerHTML = "";
        let total = 0;

        carritoItems.forEach((item, index) => {
            const li = document.createElement("li");

            const precioUnitario = preciosProductos[item.id];
            const precioTotal = precioUnitario * item.cantidad;

            li.textContent = `Producto ${item.id} - Cantidad: ${item.cantidad}, Precio: $${precioTotal}`;

            // Agregar un botón de eliminar
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.addEventListener("click", () => {
                // Eliminar el elemento del carritoItems y actualizar localStorage
                carritoItems.splice(index, 1);
                localStorage.setItem("carrito", JSON.stringify(carritoItems));
                renderCarrito(); // Renderizar el carrito nuevamente
            });

            li.appendChild(botonEliminar);
            carrito.appendChild(li);
            total += precioTotal;
        });

        totalElement.textContent = total;
    }

    // Manejar el evento de agregar al carrito
    productos.forEach((producto, index) => {
        const botonAgregar = producto.querySelector(".agregar");
        const cantidadInput = producto.querySelector("input[type='number']");

        botonAgregar.addEventListener("click", function () {
            const id = producto.getAttribute("data-id");
            const cantidad = parseInt(cantidadInput.value);

            if (cantidad > 0 && preciosProductos.hasOwnProperty(id)) {
                const item = {
                    id: id,
                    cantidad: cantidad
                };

                carritoItems.push(item);

                // Guardar en localStorage
                localStorage.setItem("carrito", JSON.stringify(carritoItems));

                // Actualizar el carrito en la página
                renderCarrito();
            }
        });
    });

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        carritoItems = [];
        localStorage.removeItem("carrito");
        renderCarrito();
    });

    // Renderizar el carrito inicialmente
    renderCarrito();
});

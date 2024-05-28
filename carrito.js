let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('.formulario');
    if (formulario) {
        formulario.addEventListener('submit', agregarProducto);
    }
    mostrarCarrito();
});

function agregarProducto(e) {
    e.preventDefault();

    const talla = document.querySelector('.formulario__campo').value;
    const cantidad = parseInt(document.querySelector('input[type="number"]').value);

    if (!talla || !cantidad) {
        alert('Todos los campos son obligatorios');
        return;
    }

    if (isNaN(cantidad) || cantidad < 1 || cantidad > 10) {
        alert('La cantidad debe ser un número entre 1 y 10');
        return;
    }

    const producto = {
        id: Date.now(),
        nombre: document.querySelector('h1').textContent,
        talla,
        cantidad,
        precio: document.querySelector('.producto__precio').textContent
    };

    const existe = carrito.find(item => item.nombre === producto.nombre && item.talla === producto.talla);

    if (existe) {
        existe.cantidad += cantidad;
        if (existe.cantidad > 10) existe.cantidad = 10;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoContainer = document.querySelector('.carrito');
    if (carritoContainer) {
        carritoContainer.innerHTML = '';

        carrito.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('carrito-item');
            div.innerHTML = `
                <p>${item.nombre} - Talla: ${item.talla} - Cantidad: ${item.cantidad} - Precio: ${item.precio}</p>
                <button class="eliminar" data-id="${item.id}">Eliminar</button>
            `;
            carritoContainer.appendChild(div);
        });

        document.querySelectorAll('.eliminar').forEach(btn => {
            btn.addEventListener('click', eliminarProducto);
        });
    }
}

function eliminarProducto(e) {
    const id = parseInt(e.target.dataset.id);
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

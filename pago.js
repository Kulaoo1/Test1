document.addEventListener('DOMContentLoaded', () => {
    const pagarButton = document.getElementById('pagarButton');
    const paymentForm = document.getElementById('paymentForm');

    if (pagarButton) {
        pagarButton.addEventListener('click', mostrarFormularioPago);
    }

    if (paymentForm) {
        paymentForm.addEventListener('submit', validarFormularioPago);
    }
});

function mostrarFormularioPago() {
    const formularioPago = document.getElementById('formularioPago');
    formularioPago.style.display = 'block';
}

function validarFormularioPago(event) {
    event.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expiryDate = document.getElementById('expiryDate').value.trim();
    const cvc = document.getElementById('cvc').value.trim();

    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Número de tarjeta inválido');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate) || !validarFechaVencimiento(expiryDate)) {
        alert('Fecha de vencimiento inválida');
        return;
    }

    if (!/^\d{3}$/.test(cvc)) {
        alert('CVC inválido');
        return;
    }

    alert('Pago realizado con éxito');
}

function validarFechaVencimiento(fecha) {
    const [mes, año] = fecha.split('/').map(Number);
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear() % 100;
    const mesActual = fechaActual.getMonth() + 1;

    if (año < añoActual || (año === añoActual && mes < mesActual)) {
        return false;
    }

    return mes >= 1 && mes <= 12;
}

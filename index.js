

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const mensajeBienvenida = document.getElementById('mensajeBienvenida');
    const logoutButton = document.getElementById('logoutButton');

    if (currentUser) {
        if (mensajeBienvenida) {
            mensajeBienvenida.innerHTML = `<h2>Bienvenido, ${currentUser.nombre} ${currentUser.apellido}</h2>`;
        }
        if (logoutButton) {
            logoutButton.style.display = 'block';
            logoutButton.addEventListener('click', logoutUser);
        }
    }
});

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

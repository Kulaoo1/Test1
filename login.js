document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const mensajeErrorLogin = document.getElementById('mensajeErrorLogin');
    const mensajeErrorRegistro = document.getElementById('mensajeErrorRegistro');

    // Manejar el formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;
            loginUser(email, password);
        });
    }

    // Manejar el formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const nombre = registerForm.querySelector('#nombre').value;
            const apellido = registerForm.querySelector('#apellido').value;
            const email = registerForm.querySelector('#registerEmail').value;
            const password = registerForm.querySelector('#registerPassword').value;
            registerUser(nombre, apellido, email, password);
        });
    }
});

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        document.getElementById('mensajeErrorLogin').textContent = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
    }
}

function registerUser(nombre, apellido, email, password) {
    if (!validatePassword(password)) {
        document.getElementById('mensajeErrorRegistro').textContent = 'CONTRASEÑA NO CUMPLE REQUISITOS';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        document.getElementById('mensajeErrorRegistro').textContent = 'El correo ya está registrado.';
        return;
    }

    const newUser = { nombre, apellido, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Usuario registrado exitosamente');
    document.getElementById('registerForm').reset();
}

function validatePassword(password) {
    const regex = /^(?=.*[0-9]).{6,}$/;
    return regex.test(password);
}


// ============================================
// API КЛИЕНТ
// ============================================

const API_URL = 'http://localhost:3000/api';

async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (data) options.body = JSON.stringify(data);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return { success: false, message: '❌ Ошибка соединения с сервером! Запусти server.js' };
    }
}

// ============================================
// DOM
// ============================================

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');

const loginInput = document.getElementById('loginInput');
const passwordInput = document.getElementById('passwordInput');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');

const regLoginInput = document.getElementById('regLoginInput');
const regPasswordInput = document.getElementById('regPasswordInput');
const regPasswordConfirm = document.getElementById('regPasswordConfirm');
const regErrorMessage = document.getElementById('regErrorMessage');
const regSuccessMessage = document.getElementById('regSuccessMessage');
const passwordHint = document.getElementById('passwordHint');

// ============================================
// ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
// ============================================

function switchTab(tab) {
    if (tab === 'login') {
        loginForm.classList.remove('form-hidden');
        registerForm.classList.add('form-hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        document.querySelectorAll('.error-message, .success-message').forEach(el => el.classList.remove('show'));
    } else {
        loginForm.classList.add('form-hidden');
        registerForm.classList.remove('form-hidden');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        document.querySelectorAll('.error-message, .success-message').forEach(el => el.classList.remove('show'));
    }
}

loginTab.addEventListener('click', () => switchTab('login'));
registerTab.addEventListener('click', () => switchTab('register'));

// ============================================
// ВХОД
// ============================================

async function handleLogin(e) {
    e.preventDefault();
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();

    if (!login || !password) {
        errorMessage.textContent = '❌ Заполните все поля!';
        errorMessage.classList.add('show');
        return;
    }

    const btn = loginForm.querySelector('.login-btn');
    btn.textContent = '⏳ Проверка...';
    btn.disabled = true;

    const result = await apiRequest('/login', 'POST', { login, password });

    btn.textContent = '🔑 ВОЙТИ';
    btn.disabled = false;

    if (result.success) {
        errorMessage.classList.remove('show');
        successMessage.textContent = `✅ Добро пожаловать, ${result.user.name}!`;
        successMessage.classList.add('show');

        localStorage.setItem('currentUser', JSON.stringify({
            id: result.user.id,
            login: result.user.login,
            name: result.user.name,
            isLoggedIn: true
        }));

        setTimeout(() => window.location.href = 'index.html', 800);
    } else {
        errorMessage.textContent = '❌ ' + (result.message || 'Ошибка входа!');
        errorMessage.classList.add('show');
        successMessage.classList.remove('show');
    }
}

loginForm.addEventListener('submit', handleLogin);

// ============================================
// РЕГИСТРАЦИЯ
// ============================================

regPasswordInput.addEventListener('input', () => {
    const pass = regPasswordInput.value;
    const confirm = regPasswordConfirm.value;
    if (pass.length === 0) {
        passwordHint.textContent = 'Пароль должен быть минимум 6 символов';
        passwordHint.className = 'password-hint';
        return;
    }
    if (pass.length < 6) {
        passwordHint.textContent = '❌ Слишком короткий (минимум 6 символов)';
        passwordHint.className = 'password-hint invalid';
        return;
    }
    if (confirm && pass !== confirm) {
        passwordHint.textContent = '❌ Пароли не совпадают!';
        passwordHint.className = 'password-hint invalid';
        return;
    }
    passwordHint.textContent = '✅ Хороший пароль!';
    passwordHint.className = 'password-hint valid';
});

regPasswordConfirm.addEventListener('input', () => {
    const pass = regPasswordInput.value;
    const confirm = regPasswordConfirm.value;
    if (!pass || pass.length < 6) {
        passwordHint.textContent = 'Сначала введите пароль';
        passwordHint.className = 'password-hint';
        return;
    }
    if (pass !== confirm) {
        passwordHint.textContent = '❌ Пароли не совпадают!';
        passwordHint.className = 'password-hint invalid';
    } else {
        passwordHint.textContent = '✅ Пароли совпадают!';
        passwordHint.className = 'password-hint valid';
    }
});

async function handleRegister(e) {
    e.preventDefault();

    const login = regLoginInput.value.trim();
    const password = regPasswordInput.value;
    const confirm = regPasswordConfirm.value;

    if (!login || !password || !confirm) {
        regErrorMessage.textContent = '❌ Заполните все поля!';
        regErrorMessage.classList.add('show');
        return;
    }

    if (login.length < 3) {
        regErrorMessage.textContent = '❌ Логин должен быть минимум 3 символа!';
        regErrorMessage.classList.add('show');
        return;
    }

    if (password.length < 6) {
        regErrorMessage.textContent = '❌ Пароль должен быть минимум 6 символов!';
        regErrorMessage.classList.add('show');
        return;
    }

    if (password !== confirm) {
        regErrorMessage.textContent = '❌ Пароли не совпадают!';
        regErrorMessage.classList.add('show');
        return;
    }

    const btn = registerForm.querySelector('.login-btn');
    btn.textContent = '⏳ Регистрация...';
    btn.disabled = true;

    const result = await apiRequest('/register', 'POST', { login, password });

    btn.textContent = '📝 ЗАРЕГИСТРИРОВАТЬСЯ';
    btn.disabled = false;

    if (result.success) {
        regErrorMessage.classList.remove('show');
        regSuccessMessage.textContent = '✅ Регистрация успешна! Теперь войдите.';
        regSuccessMessage.classList.add('show');

        regLoginInput.value = '';
        regPasswordInput.value = '';
        regPasswordConfirm.value = '';

        setTimeout(() => {
            switchTab('login');
            loginInput.value = login;
            passwordInput.value = '';
            loginInput.focus();
        }, 1500);
    } else {
        regErrorMessage.textContent = '❌ ' + (result.message || 'Ошибка регистрации!');
        regErrorMessage.classList.add('show');
        regSuccessMessage.classList.remove('show');
    }
}

registerForm.addEventListener('submit', handleRegister);

// ============================================
// ПРОВЕРКА СЕССИИ
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        try {
            const user = JSON.parse(currentUser);
            if (user.isLoggedIn) {
                window.location.href = 'index.html';
            }
        } catch (e) {
            localStorage.removeItem('currentUser');
        }
    }
});
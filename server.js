const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// РАЗДАЕМ ВСЕ ФАЙЛЫ ИЗ ПАПКИ public
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// БАЗА ДАННЫХ
// ============================================

const DB_PATH = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(DB_PATH);

// Создание таблиц
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Добавляем админа
    db.get('SELECT * FROM users WHERE login = ?', ['admin'], (err, row) => {
        if (!row) {
            const hashedPassword = bcrypt.hashSync('admin123', 10);
            db.run(
                'INSERT INTO users (login, password, name) VALUES (?, ?, ?)',
                ['admin', hashedPassword, 'Администратор']
            );
            console.log('✅ Админ создан: admin/admin123');
        }
    });
});

// ============================================
// API
// ============================================

// Регистрация
app.post('/api/register', (req, res) => {
    const { login, password, name } = req.body;

    if (!login || !password) {
        return res.status(400).json({ success: false, message: 'Заполните все поля!' });
    }
    if (login.length < 3) {
        return res.status(400).json({ success: false, message: 'Логин минимум 3 символа!' });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Пароль минимум 6 символов!' });
    }

    db.get('SELECT * FROM users WHERE login = ?', [login], (err, row) => {
        if (row) {
            return res.status(400).json({ success: false, message: 'Пользователь уже существует!' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        db.run(
            'INSERT INTO users (login, password, name) VALUES (?, ?, ?)',
            [login, hashedPassword, name || login],
            function(err) {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Ошибка регистрации!' });
                }
                res.json({ success: true, message: 'Регистрация успешна!' });
            }
        );
    });
});

// Вход
app.post('/api/login', (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ success: false, message: 'Заполните все поля!' });
    }

    db.get('SELECT * FROM users WHERE login = ?', [login], (err, user) => {
        if (!user) {
            return res.status(401).json({ success: false, message: 'Неверный логин или пароль!' });
        }

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Неверный логин или пароль!' });
        }

        res.json({
            success: true,
            message: 'Вход выполнен!',
            user: { id: user.id, login: user.login, name: user.name }
        });
    });
});

// ============================================
// СТРАНИЦЫ
// ============================================

// Главная - login.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================
// ЗАПУСК
// ============================================

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
    console.log(`📁 Папка: ${__dirname}`);
    console.log(`📁 Public: ${path.join(__dirname, 'public')}`);
    console.log(`📄 Файлы: login.html, index.html`);
});
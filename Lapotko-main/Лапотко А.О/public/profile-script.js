document.addEventListener('DOMContentLoaded', () => {
    const userNav = document.getElementById('user-nav');
    const userInfo = document.getElementById('user-info');
    const logoutBtn = document.getElementById('logout-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    const savedUserData = JSON.parse(localStorage.getItem('user'));

    if (savedUserData) {
        showUserInfo(savedUserData);
    } else {
        showLoginForm();
    }

    function showLoginForm() {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }

    function showRegisterForm() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }

    function showUserInfo(user) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        userInfo.style.display = 'inline';
        logoutBtn.style.display = 'inline';

        userInfo.textContent = `Добро пожаловать, ${user.firstName} ${user.lastName} (${user.username})`;
    }

    function logout() {
        localStorage.removeItem('user');
        userInfo.style.display = 'none';
        logoutBtn.style.display = 'none';
        showLoginForm();
    }

    loginBtn.addEventListener('click', () => {
        const username = document.getElementById('username').value;

        const user = { username: username }; 
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            showUserInfo(user);
        }
    });

   /* registerBtn.addEventListener('click', () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const newUsername = document.getElementById('newUsername').value;

        const newUser = { firstName, lastName, age, email, username: newUsername };
        localStorage.setItem('user', JSON.stringify(newUser));
        showUserInfo(newUser);
    });*/

    logoutBtn.addEventListener('click', logout);


    registerBtn.addEventListener('click', async () => {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const newUsername = document.getElementById('newUsername').value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, age, email, username: newUsername }),
            });

            if (response.ok) {
                const newUser = await response.json();
                localStorage.setItem('user', JSON.stringify(newUser));
                showUserInfo(newUser);
            } else {
                const errorData = await response.json();
                alert(`Ошибка регистрации: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    });
});

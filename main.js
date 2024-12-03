(function () {
    
    var registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.onsubmit = function (e) {
            e.preventDefault();

            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Invalid email format.");
                return;
            }

            var users = JSON.parse(localStorage.getItem('users')) || [];
            var isEmailTaken = users.some(function (user) {
                return user.email === email;
            });

            if (isEmailTaken) {
                alert("Email is already registered. Please use a different email.");
                return;
            }

            users.push({ username: username, email: email, password: password });
            localStorage.setItem('users', JSON.stringify(users));

            alert("Registration successful!");
            window.location.href = "login.html";
        };
    }
    
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();

            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            var users = JSON.parse(localStorage.getItem('users')) || [];
            var validUser = users.find(function (user) {
                return user.email === email && user.password === password;
            });

            if (validUser) {
                localStorage.setItem('currentUser', JSON.stringify(validUser));
                window.location.href = "home.html";
            } else {
                alert("Invalid email or password.");
            }
        };
    }

    // Home Page
    if (window.location.pathname.includes('home.html')) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert("Please log in first.");
            window.location.href = "login.html";
        } else {
            document.getElementById('usernameDisplay').textContent = currentUser.username;
            document.getElementById('logoutBtn').onclick = function () {
                localStorage.removeItem('currentUser');
                window.location.href = "login.html";
            };
        }
    }
})();

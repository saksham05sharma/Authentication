document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const fname = document.getElementById('fname').value;
            const lname = document.getElementById('lname').value;
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fname, lname, username, email, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                window.location.href = '/login.html';
            } else {
                alert(result.message);
            }
        });
    }
});

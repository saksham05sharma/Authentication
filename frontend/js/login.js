document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
            localStorage.setItem('token', result.token);

            alert('Login successful');
            window.location.href = 'tasks.html'; // Redirect to tasks page
        } else {
            alert(result.message);
        }
    });
});

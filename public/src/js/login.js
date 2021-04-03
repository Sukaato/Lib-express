const modal = document.querySelector('#login');

const loginForm = modal.querySelector('[data-login]');
const loginConfirm = loginForm.querySelector('[confirm]');

loginConfirm.addEventListener('click', () => {
    const loginForm_Name = loginForm.querySelector('input#login_login');
    const loginForm_pswd = loginForm.querySelector('input#password_login');

    const request = {
        body: JSON.stringify({
            login: loginForm_Name.value,
            password: loginForm_pswd.value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('/login', request)
        .then(async (result) => {
            console.log(result);
            
        }).catch((err) => {
            console.log(err);
            
        });
});





















const singupForm = modal.querySelector('[data-singup]');
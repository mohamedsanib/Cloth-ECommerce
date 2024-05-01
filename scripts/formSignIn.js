const signInBtn = document.querySelector('.sign-in');
signInBtn.addEventListener('click', ()=>{
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    signIn(email, password);
})

const signIn = async (email, password) => {
    await fetch("https://cloth-ecommerce-backend.onrender.com/user/signIn", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.msg === true) {
                localStorage.setItem("token", data.token);
                location.replace("../index.html");
            }
            else {
                document.querySelector('.backend-alert').innerHTML = data.msg;
            }
        });
}
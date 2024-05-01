const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", () => {
    validateFormInputes();
});


const signUp = async (username, email, password) => {
    await fetch("https://cloth-ecommerce-backend.onrender.com/user/signUp", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: username,
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

const password = document.querySelector('#password');
password.addEventListener('keydown', () => {
    const pass = password.value;
    const alertPassword = validatePassword(pass);
    const passAlertBox = document.querySelector('.alert-password');
    requiredAlert(passAlertBox, alertPassword);
})

const requiredAlert = (element, message) => {
    element.innerText = message;
    if (message === "strong password") {
        element.style.color = "green";
    } else {
        element.style.color = "red";
    }
    element.style.display = "block";
};

const clearAlert = () => {
    document.querySelectorAll(".alert").forEach((item) => {
        item.style.display = "none";
    });
};

const validateFormInputes = () => {
    let flag = true;
    clearAlert();

    const username = document.querySelector("#username").value;
    const alertUsername = validateNameInp(username);
    if (alertUsername !== "") {
        flag = false;
        const element = document.querySelector(".alert-name");
        requiredAlert(element, alertUsername);
    }

    const email = document.querySelector('#email').value;
    const alertEmail = validateEmailInp(email);
    if (alertEmail !== "") {
        flag = false;
        const element = document.querySelector(".alert-email");
        requiredAlert(element, alertEmail);
    }

    const password = document.querySelector('#password').value;
    const alertPass = valiadtePassEmpty(password);
    if (alertPass !== "") {
        flag = false;
        const passAlertBox = document.querySelector('.alert-password');
        requiredAlert(passAlertBox, alertPass);
    }

    const conformPass = document.querySelector('#ConformPassword').value;
    const alertConformPass = validateConformPass(password, conformPass);
    if (alertConformPass !== "") {
        flag = false;
        const confPassAlertBox = document.querySelector('.alert-conform-password');
        requiredAlert(confPassAlertBox, alertConformPass);
    }

    if (flag) {
        console.log("sucess", username, email, password);
        document.querySelectorAll('input').forEach((inp) => {
            inp.value = "";
        })
        signUp(username, email, password);
    }
    else {
        console.log("failed");
    }
};

const validateNameInp = (username) => {
    let message = "";
    if (username.length === 0) {
        message = "*username required";
    } else if (username.length < 3) {
        message = "*minimum 3 character required";
    }
    return message;
};

const validateEmailInp = (email) => {
    let message = "";
    if (email.length === 0) {
        message = "*Email required";
        return message;
    }

    if (email.length < 3) {
        message = "*Invalid email";
    }


    let Symbol = false;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === '@') {
            Symbol = true;
            break;
        }
    }
    if (!Symbol) {
        message = "*Invalid email";
    }

    return message;
};

const validatePassword = (password) => {
    let message = "";
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,15}$/;

    if (!regex.test(password)) {
        message = "weak password \nit should contain atleast 8 characters including a capital letter, small letter, digit, special character"
    }
    else {
        message = "strong password"
    }

    return message;
}

const valiadtePassEmpty = (pass) => {
    let message = "";
    if (pass.length === 0) {
        message = "*password required";
        return message;
    }

    if (validatePassword(pass) !== "strong password") {
        message = "weak password \nit should contain atleast 8 characters including a capital letter, small letter, digit, special character"
    }
    return message;
}

const validateConformPass = (pass, confpass) => {
    let message = "";
    if (confpass !== "" && confpass !== pass) {
        message = "*password must be same"
    }
    return message;
}
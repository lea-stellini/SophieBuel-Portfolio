import { displayNavbar } from "./navbar.js";
import { globalConfig } from "../config.js";

//Récupération des éléments du DOM
const loginForm = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const invalidSpan = document.getElementById("invalidSpan")
const labelEmail = document.getElementById("labelEmail");
const labelPwd = document.getElementById("labelPwd");
const missingEl = document.getElementById("missingEl");
const invalidEmail = document.getElementById("invalidEmail");

let email;
let password;

// stock le token dans le local storage
const getToken = (parseResponse) => {
    localStorage.setItem("token", parseResponse.token)
}

// Redirecation vers page édition
const goToAdminPage = (response) => {
    if(response.status === 200){
        window.location = "index.html";
    } else if (response.status === 401 || response.status === 404 ){
       emailInput.classList.remove("borderInput");
       passwordInput.classList.remove("borderInput")
       emailInput.classList = "redBorder";
       passwordInput.classList = "redBorder";
       invalidSpan.classList = "redWarning";
       invalidSpan.classList = "redWarning";
       labelEmail.classList = "errorMessage";
       labelPwd.classList = "errorMessage";
    } else {
       emailInput.classList ="borderInput";
       passwordInput.classList ="borderInput";
       emailInput.classList.remove("redBorder");
       passwordInput.classList.remove("redBorder");
       invalidSpan.classList.remove("redWarning");
       invalidSpan.classList.remove("redWarning");
       labelEmail.classList.remove("errorMessage");
       labelPwd.classList.remove("errorMessage");
       alert('Désolé, il semble que le serveur a un problème...')
    }
}

// Envoi des informations de login
const postLogin = async (data) => {
    let response = await fetch(`${globalConfig.url}users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data) 
    }); 
    const parseResponse = await response.json()
   
    getToken(parseResponse)
    goToAdminPage(response)
}

const validateFormLogin = () => {
    invalidSpan.classList.add("invalid");
    invalidEmail.classList.add("invalid");
    missingEl.classList.add("invalid");
        
    let hasError = false;

    if(email === null || password === null){
        hasError = true;
        missingEl.classList.add("redWarning")
    }

    return hasError;
}

const initEventListeners = () => {
    // récupération de l'email
    emailInput.addEventListener("change", (event) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        email = event.target.value;

        if(!regex.test(email)){
            invalidEmail.classList="redWarning"
        }
    })

    // récupération du mot de passe
    passwordInput.addEventListener("change", (event) => {
        password = event.target.value;
    })

    // se déclanche lors du clique sur se connecter
    loginForm.onsubmit = (event) => {
        event.preventDefault();
       
        const hasError = validateFormLogin();

        if(hasError){
            return;
        }
        
        let data = {
            email: email,
            password: password,
        }
        
        postLogin(data)
    }
}

displayNavbar();
initEventListeners();

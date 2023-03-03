import { navbar } from "./navbar.js";
import { globalConfig } from "../config.js";

//Récupération des éléments du DOM
const loginForm = document.getElementById('loginForm')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const labelEmail = document.getElementById('labelEmail')
const labelPwd = document.getElementById('labelPwd')
const invalidEmail = document.getElementById('invalidEmail')
const invalidPwd = document.getElementById('invalidPwd');

// stock le token dans le local storage
const getToken = (parseResponse) => {
    localStorage.setItem('token', parseResponse.token)
}

// Redirecation vers page édition
const goToAdminPage = (response) => {

     if(response.status === 200){
        window.location = "index.html";
    } else if (response.status === 401){
       emailInput.classList.remove("borderInput");
       passwordInput.classList.remove("borderInput")
       emailInput.classList = "redBorder";
       passwordInput.classList = "redBorder";
       labelEmail.classList = 'labelColor';
       labelPwd.classList = 'labelColor';
       invalidEmail.classList = 'errorMessage';
       invalidPwd.classList = 'errorMessage';
    } else {
        alert('Désolé, il semble que le serveur a un problème...')
    }
}

// Envoi des informations de login
const postLogin = async (data) => {
    let response = await fetch(`${globalConfig.url}users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data) 
    }); 
    const parseResponse = await response.json()
   
    getToken(parseResponse)
    goToAdminPage(response)
}
// récupération de l'email
let email;
emailInput.addEventListener('change', (event) => {
    email = event.target.value;
})

// récupération du mot de passe
let password;
passwordInput.addEventListener('change', (event) => {
    password = event.target.value;
 })

// se déclanche lors du clique sur se connecter
loginForm.addEventListener('submit', event => {
    event.preventDefault();
    
    let data = {
        email: email,
        password: password,
    }
    postLogin(data)
})

navbar();


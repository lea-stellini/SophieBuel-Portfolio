import { navbar } from "./navbar.js";

navbar();

const loginForm = document.getElementById('loginForm')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')


let email = emailInput.addEventListener('change', (event) => {
    const email = event.target.value;
    return email
})


let password = passwordInput.addEventListener('change', (event) => {
   const password = event.target.value;
   return password
})

const postLogin = async (data) => {
    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data) 
    }); 

    
    
   

    if(response.status === 200){
       // window.location = "http://127.0.0.1:5500/index.html"

        const login = document.getElementById("loginNav");
        console.log(login);
        const logout = document.getElementById("logoutNav"); 
        login.className = "edit";
        logout.className = "noedit";
    }else if(response.status === 404){
        alert('Votre identifiant ou mot de passe ne sont pas valides')
    }else if(response.status === 500){
        alert('Désolé, il semblerait que notre service ait un problème...')
    }

    console.log(response);
   // let result = await response.json(email, password);  
}

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    
    let data = {
        "email": "sophie.bluel@test.tld",
        "password": "S0phie",
    }

    postLogin(data)
})




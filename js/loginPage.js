import { navbar } from "./navbar.js";


navbar();

const postLogin = async (data) => {

    let response = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data) 
    });

    let result = await response.json(email, password);
    console.log(result)
    
   // const expected = 
    console.log(expected)

    if(result = expected){
        // window.location 
        console.log("Ok")
    }else{
        console.log('404')
    }
}

function login() {

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

let data = {
    "email": email,
    "password": password,
}

if(email == "" || password == ""){
    alert('noooo')
    return false
}else{
    true;
}

console.log(data);

postLogin(data);

}

login()


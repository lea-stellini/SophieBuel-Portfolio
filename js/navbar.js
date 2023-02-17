const loginNav = document.getElementById('loginNav');
const projetsNav = document.getElementById('projetsNav');
const introduction = document.getElementById('introduction');
const loginPage = document.getElementById('loginPage');

const url = "index.html#contact"; 

export const navbar = () => {
    
    if(introduction){
        projetsNav.className = 'bold';
    }else if(loginPage){
        loginNav.className = 'bold';
    }
   
}


// récupération de l'élément du DOM qui aura les différents travaux
const portfolio = document.getElementById('#portfolio')
const gallery = document.getElementsByClassName('.gallery');
gallery.innerText= "Hello!"

// récupére les éléments de l'api
const url = 'http://localhost:5678/api/works';

const work = async () => {
   const data = await fetch(url).then(response => response.json());
   console.log(data)
   for(let i = 0; i < data.length; i++){
    const titles = data[i].title;
    console.log(titles);
    const images = data[i].imageUrl;
    console.log(images)
   }
}
work()


// creation balises
const figure = document.createElement("figure");
figure.innerText = "Hello world";
const img = document.createElement("img");
// img.src = ;
// img.alt = ;
const figcaption = document.createElement("figcaption");
figcaption.innerText = "Hello world"

portfolio.appendChild(gallery);
// figure.appendChild(img);
// figure.appendChild(figcaption);
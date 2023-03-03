import { navbar } from "./navbar.js";
import { globalConfig } from "../config.js";

// récupération de l'élément du DOM qui aura les différents travaux
const gallery = document.getElementById('gallery');

// récupére les éléments de l'api
const work = async () => {
   const data = await fetch(`${globalConfig.url}works`).then(response => response.json());
   return data;
}

// affiche les éléments
const displayInfos = (infos) => {

  document.getElementById('gallery').innerHTML = "";

  for(let i = 0; i < infos.length; i++){

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = infos[i].imageUrl;
    img.alt = infos[i].title;
    img.crossOrigin = "anonymous";
    figure.className = infos[i].categoryId;

    const figcaption = document.createElement("figcaption");
    figcaption.innerText = infos[i].title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  } 
}

// filtre les éléments
const main = async () => {
  const infos = await work();

  displayInfos(infos);

  const filterAll = document.getElementById('all');
    filterAll.addEventListener('click', () => {
      displayInfos(infos);
    })

  const filterObjects = document.getElementById('objects');
  filterObjects.addEventListener('click', () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 1 
    })
    displayInfos(objectsFilter);
  })

  const filterApartments = document.getElementById('apartments');
  filterApartments.addEventListener('click', () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 2
    })
    displayInfos(objectsFilter);
  })

  const filterHotels = document.getElementById('hotels');
  filterHotels.addEventListener('click', () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 3 
    })
    displayInfos(objectsFilter);
  })
}

navbar();
main()

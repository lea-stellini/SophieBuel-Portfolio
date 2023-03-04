import { navbar } from "./navbar.js";
import { globalConfig } from "../config.js";


// récupération des éléments du DOM 
const gallery = document.getElementById('gallery');
const galleryEdit = document.getElementById('galleryEdit')
const login = document.getElementById("loginNav");
const logout = document.getElementById("logoutNav"); 
const editBar = document.getElementById("edit");
const editImg = document.getElementById("editImg");
const editArticle = document.getElementById("editArticle");
const editWorks = document.getElementById("editWorks");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

// récupére les éléments de l'api
const work = async () => {
   const data = await fetch(`${globalConfig.url}works`).then(response => response.json());
   return data;
}

// affiche les éléments sur la page projets
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

// affiche les éléments sur la galerie photo
const displayPhoto = (infos) => {
  document.getElementById('galleryEdit').innerHTML = "";

  for(let i = 0; i < infos.length; i++){
    const div = document.createElement("div");
    const button = document.createElement("button");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const icon = document.createElement('img');

    img.src = infos[i].imageUrl;
    img.alt = infos[i].title;
    img.crossOrigin = "anonymous";
    img.className = 
    p.innerText = "éditer";
    icon.src = "../assets/icons/delete.svg";
    button.className = 'btnIcon';
    div.className = 'card';

    button.appendChild(icon)
    div.appendChild(img);
    div.appendChild(button)
    div.appendChild(p);
    galleryEdit.appendChild(div);
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

// Afficher les projets dans la galerie photo

const mainModal = async () => {
  const infos = await work();

  displayPhoto(infos);
}

// se déconnecter 
logout.addEventListener('click', () => {
  localStorage.clear()
})

// Accès page Admin
if(localStorage.getItem("token")){
    
    login.classList.remove("edit");
    login.classList.add("noedit");
    logout.classList.remove("noedit");
    editBar.classList.remove("noedit");
    editBar.classList.add("flex");
    editImg.classList.remove("noedit");
    editArticle.classList.remove("noedit");
    editWorks.classList.remove("noedit");
}

// affichage de la modale
editWorks.addEventListener('click', () => {
  modal.classList.remove("noedit");
  modal.classList.add("edit");
  modal.classList.add("flex");
})

// fermer la modale
closeBtn.addEventListener('click', () => {
  modal.classList.remove("edit");
  modal.classList.remove("flex");
  modal.classList.add("noedit");
})



        

navbar();
main();
mainModal();

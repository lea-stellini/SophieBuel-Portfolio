import { displayNavbar } from "./navbar.js";
import { globalConfig } from "../config.js";


// récupération des éléments du DOM 
const body = document.getElementById("body");
const gallery = document.getElementById("gallery");
const galleryEdit = document.getElementById("galleryEdit")
const login = document.getElementById("loginNav");
const logout = document.getElementById("logoutNav"); 
const editBar = document.getElementById("edit");
const editImg = document.getElementById("editImg");
const editArticle = document.getElementById("editArticle");
const editWorks = document.getElementById("editWorks");
const close = document.getElementById("close");
const addWork = document.getElementById("addWork");
const back = document.getElementById("back");
const addElements = document.getElementById("addElements");
const titleModal = document.getElementById("titlemodal");
const addWorkForm = document.getElementById("form");
const deleteGallery = document.getElementById("deleteGallery");
const photoInput = document.getElementById("photo");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const searchPicture = document.getElementById("searchPicture");
const divider = document.getElementById("divider");
const photoFile = document.getElementById("photoFile");
const inputPhoto = document.getElementById("inputPhoto");
const form = document.getElementById("form");



// récupére les éléments de l'api
const work = async () => {
   const data = await fetch(`${globalConfig.url}works`).then(response => response.json());
   return data;
}

// affiche les éléments sur la page projets
const displayInfos = (infos) => {

  document.getElementById("gallery").innerHTML = "";

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
  document.getElementById("galleryEdit").innerHTML = "";

  for(let i = 0; i < infos.length; i++){
    const div = document.createElement("div");
    const button = document.createElement("button");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const icon = document.createElement("img");

    img.src = infos[i].imageUrl;
    img.alt = infos[i].title;
    img.crossOrigin = "anonymous";
    p.innerText = "éditer";
    icon.src = "../assets/icons/delete.svg";
    icon.className = "deleteBtn";
    button.className = "btnIcon";
    div.className = "card";
    div.id = infos[i].id;

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

  console.log(infos)

  displayInfos(infos);

  const filterAll = document.getElementById("all");
    filterAll.addEventListener("click", () => {
      displayInfos(infos);
    })

  const filterObjects = document.getElementById("objects");
  filterObjects.addEventListener("click", () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 1 
    })
    displayInfos(objectsFilter);
  })

  const filterApartments = document.getElementById("apartments");
  filterApartments.addEventListener("click", () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 2
    })
    displayInfos(objectsFilter);
  })

  const filterHotels = document.getElementById("hotels");
  filterHotels.addEventListener("click", () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 3 
    })
    displayInfos(objectsFilter);
  })
}

// Afficher les projets dans la galerie photo
const displayModal = async () => {
  const infos = await work();

  displayPhoto(infos);
}

// se déconnecter 
logout.addEventListener("click", () => {
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

// supprimer un projet

const deleteWork = async (id) =>  {
  let response = await fetch (`${globalConfig.url}works/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });

  console.log(response)
}

// test pour récupérer id de l'élément parent
console.log(searchPicture.parentNode.id)

let btnIcon = [document.getElementsByClassName("btnIcon")];
console.log(btnIcon);
btnIcon.forEach(btn => {
  console.log(btn)
  btn.addEventListener("click", () => {
    console.log(btn.parentNode.id)
  })
 })
 


let modal = null;

// affichage de la modale
const openModal = event => {
  const target = document.querySelector(event.target.getAttribute("href"))
  target.style.display = "flex";
  target.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-modal", "true");
  modal = target;
  close.addEventListener("click", closeModal);
  back.addEventListener("click", backModal);
}

// fermer la modale avec la croix
const closeModal = () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-modal", "false");
  modal = null;
}

//fermer modale quand clique extérieur de la modale
body.addEventListener("click", (event) => {
  let modalId = event.target.id
  
  if(modalId === "modal"){
    closeModal();
  }
})

// retour en arrière
const backModal = () => {
  galleryEdit.classList.remove("noedit");
  galleryEdit.style.display = "grid";
  addElements.classList.add("noedit");
  deleteGallery.classList.remove("noedit");
  addWork.classList.remove("noedit");
  divider.classList.remove("noedit");
  back.classList.add("noedit");
  titleModal.innerText = "Galerie Photo";
}
  
document.querySelectorAll(".allmodal").forEach(a => {
  a.addEventListener("click", openModal)
})

addWork.addEventListener("click", () =>{
  galleryEdit.classList.add("noedit");
  galleryEdit.style.display = "none";
  addElements.classList.remove("noedit");
  deleteGallery.classList.add("noedit");
  addWork.classList.add("noedit");
  divider.classList.add("noedit");
  back.classList.remove("noedit");
  titleModal.innerText = "Ajout Photo";
})

let photo;
photoInput.addEventListener('change', (event) => {
  photo = event.target.files[0]
 
  if(photo){
    const reader = new FileReader();

    reader.onload = function(event) {
      photoFile.src = event.target.result
    }

    reader.readAsDataURL(photo)

    photoFile.classList.remove("noedit");
    inputPhoto.classList.add("noedit");
    inputPhoto.classList.remove("flex")
  }
})

let title;
titleInput.addEventListener('change', (event) => {
  title = event.target.value;
})

let category;
categoryInput.addEventListener('change', (event) => {
  category = event.target.value;
})

addWorkForm.addEventListener("submit", (event) => {
 event.preventDefault()
  let newWork = {
    image : photo,
    title : title,
    category : category,
  }

  if(title === null || photo === null || category === " "){
    titleInput.classList.remove("borderInput");
    categoryInput.classList.remove("borderInput")
    titleInput.classList.add("redBorder");
    categoryInput.classList.add("redBorder");
    searchPicture.classList.add("redBorder");
  }else{
    titleInput.classList.add("borderInput");
    categoryInput.classList.add("borderInput")
    titleInput.classList.remove("redBorder");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");
   //postNewWork(newWork)
  }
})

// ajout d'un nouveau projet 
form.onsubmit = async (event) => {

  event.preventDefault();

  const body = new FormData();

  body.append("image", photo);
  body.append("title", title);
  body.append("category", category); 

  let response = await fetch(`${globalConfig.url}works`, {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: body
  });

  let result = await response.json();

  alert(result.message);

}

displayNavbar();
main();
displayModal();

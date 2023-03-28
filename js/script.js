import { displayNavbar } from "./navbar.js";
import { work, postWork } from "../config.js";
import { initDeleteBtn } from "./modal.js";
import { displayInfos, displayPhoto } from "./display.js";

// récupération des éléments du DOM 
const body = document.getElementById("body");
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
//const addWorkForm = document.getElementById("form");
const deleteGallery = document.getElementById("deleteGallery");
const photoInput = document.getElementById("photo");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const searchPicture = document.getElementById("searchPicture");
const divider = document.getElementById("divider");
const photoFile = document.getElementById("photoFile");
const inputPhoto = document.getElementById("inputPhoto");
const form = document.getElementById("form");

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
  initDeleteBtn();
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
    backModal();
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

// addWorkForm.addEventListener("submit", (event) => {
//  event.preventDefault()
//   let newWork = {
//     image : photo,
//     title : title,
//     category : category,
//   }

// 
// })

// ajout d'un nouveau projet 
form.onsubmit = async (event) => {
  event.preventDefault()

  if(photo === undefined){
    searchPicture.classList.add("redBorder");
  }else if(title === undefined){
   titleInput.classList.remove("borderInput");
    titleInput.classList.add("redBorder");
  }else if(category === undefined){
    categoryInput.classList.remove("borderInput");
    categoryInput.classList.add("redBorder");
  }else{
    titleInput.classList.add("borderInput");
    categoryInput.classList.add("borderInput")
    titleInput.classList.remove("redBorder");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");
   
    const body = new FormData();

    body.append("image", photo);
    body.append("title", title);
    body.append("category", category); 

    postWork(body);
    backModal();
    closeModal();

      }
}

displayNavbar();
main();
displayModal();

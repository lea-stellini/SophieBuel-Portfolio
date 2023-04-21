import { getWorks, apiDeleteWork, postWork } from "./api.js";
import { displayInfos, displayPhoto } from "./display.js";

const galleryEdit = document.getElementById("galleryEdit")
const close = document.getElementById("close");
const addWork = document.getElementById("addWork");
const back = document.getElementById("back");
const addElements = document.getElementById("addElements");
const titleModal = document.getElementById("titlemodal");
const deleteGallery = document.getElementById("deleteGallery");
const photoInput = document.getElementById("photo");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const searchPicture = document.getElementById("searchPicture");
const divider = document.getElementById("divider");
const photoFile = document.getElementById("photoFile");
const inputPhoto = document.getElementById("inputPhoto");
const form = document.getElementById("form");

let modal = null;
let photo;
let title = "";
let category = "0";

// Afficher les projets dans la galerie photo
const displayModal = async () => {
    const infos = await getWorks();
  
    displayPhoto(infos);
}

// supprimer un projet
const deleteWork = async (id) =>  {
    
    apiDeleteWork(id)
    
    const infos = await getWorks();
     
    displayPhoto(infos);
    displayInfos(infos)

    initDeleteBtn();
}

const initDeleteBtn = () => {
    let btnIcon = [...document.getElementsByClassName("btnIcon")];

    btnIcon.forEach(btn => {
        btn.addEventListener("click", () => {
            
            deleteWork(btn.parentNode.id)
        })
    })
}

// affichage de la modale
export const openModal = async event => {
    const target = document.querySelector(event.target.getAttribute("href"))
    target.style.display = "flex";
    target.setAttribute("aria-hidden", "false");
    target.setAttribute("aria-modal", "true");
    modal = target;
    close.addEventListener("click", closeModal);
    back.addEventListener("click", backModal);
    await displayModal()
    initDeleteBtn();
}

// retour en arrière
export const backModal = () => {
    galleryEdit.classList.remove("noedit");
    galleryEdit.style.display = "grid";
    addElements.classList.add("noedit");
    deleteGallery.classList.remove("noedit");
    addWork.classList.remove("noedit");
    divider.classList.remove("noedit");
    back.classList.add("noedit");
    titleModal.innerText = "Galerie Photo";
    photoFile.classList.add("noedit");
    inputPhoto.classList.remove("noedit");
    inputPhoto.classList.add("flex");
    titleInput.classList.add("borderInput");
    categoryInput.classList.add("borderInput");
    titleInput.classList.remove("redBorder");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");
    form.reset()
}

// fermer la modale avec la croix
export const closeModal = () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");
    modal = null;
    backModal();
}
  
// validation formulaire ajout projet
const validateForm = () => {
    let hasError = false;
  
    titleInput.classList.add("borderInput");
    categoryInput.classList.add("borderInput");
    titleInput.classList.remove("redBorder");
    categoryInput.classList.remove("redBorder");
    searchPicture.classList.remove("redBorder");
  
    if(photo === undefined){
      hasError = true
      searchPicture.classList.add("redBorder");
    }
    if(title === ""){
      hasError = true
      titleInput.classList.remove("borderInput");
      titleInput.classList.add("redBorder");
    }
    if(category === "0"){
      hasError = true
      categoryInput.classList.remove("borderInput");
      categoryInput.classList.add("redBorder");
    }
  
    return hasError
}

const handleForm = async () => {

    const hasError = validateForm();
    
    if(hasError){
    return;
    }

    const body = new FormData();
    
    body.append("image", photo);
    body.append("title", title);
    body.append("category", category); 
    
    await postWork(body);
        
    const infos = await getWorks();

    displayInfos(infos)
    displayPhoto(infos)
    backModal();
    closeModal();     
}

const initEventListeners = () => {
    // affichage modale ajout projet
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

    // récupère la photo du projet
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

    // récupère la titre du projet
    titleInput.addEventListener('change', (event) => {
    title = event.target.value;
    })

    // récupère la catégorie du projet
    categoryInput.addEventListener('change', (event) => {
    category = event.target.value;
    })

    // ajout d'un nouveau projet 
    form.addEventListener( "submit", (event) => {
        event.preventDefault()
    
        handleForm()    
    })
}

initEventListeners();


  
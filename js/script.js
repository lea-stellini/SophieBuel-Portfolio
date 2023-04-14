import { displayNavbar } from "./navbar.js";
import { getWorks } from "./api.js";
import { displayInfos } from "./display.js";
import { openModal, backModal, closeModal } from "./modal.js";

// récupération des éléments du DOM 
const body = document.getElementById("body");
const login = document.getElementById("loginNav");
const logout = document.getElementById("logoutNav"); 
const editBar = document.getElementById("edit");
const editImg = document.getElementById("editImg");
const editArticle = document.getElementById("editArticle");
const editWorks = document.getElementById("editWorks");
const filterAll = document.getElementById("all");
const filterObjects = document.getElementById("objects");
const filterApartments = document.getElementById("apartments");
const filterHotels = document.getElementById("hotels");

// filtre les éléments
const main = async () => {
  const infos = await getWorks();

  displayInfos(infos);

  filterAll.addEventListener("click", () => {
    displayInfos(infos);
  })

  filterObjects.addEventListener("click", () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 1 
    })
    displayInfos(objectsFilter);
  })

  filterApartments.addEventListener("click", () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 2
    })
    displayInfos(objectsFilter);
  })

  filterHotels.addEventListener("click", () => {
    const objectsFilter = infos.filter( info => {
      return info.categoryId === 3 
    })
    displayInfos(objectsFilter);
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
}

const initEventListeners = () => {
  // se déconnecter 
  logout.addEventListener("click", () => {
    localStorage.clear()
  })

  document.querySelectorAll(".allmodal").forEach(a => {
    a.addEventListener("click", openModal)
  })

  //fermer modale quand clique extérieur de la modale
  body.addEventListener("click", (event) => {
    let modalId = event.target.id
    
    if(modalId === "modal"){
      backModal();
      closeModal();
    }
  })
}

displayNavbar();
main();
initEventListeners();
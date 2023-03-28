import { work, apiDeleteWork } from "../config.js";
import { displayPhoto } from "./display.js";
// supprimer un projet

const deleteWork = async (id) =>  {
    
    apiDeleteWork(id)
    
    const infos = await work();
     
    displayPhoto(infos);
  }

export const initDeleteBtn = () => {
    let btnIcon = [...document.getElementsByClassName("btnIcon")];

    btnIcon.forEach(btn => {
        btn.addEventListener("click", () => {
            deleteWork(btn.parentNode.id)
        })
    })
}





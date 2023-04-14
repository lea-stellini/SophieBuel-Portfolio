import { globalConfig } from "../config.js";

// récupére les éléments de l'api
export const getWorks = async () => {
    const response  = await fetch(`${globalConfig.url}works`)
    const data = await response.json();
    return data;
  }
  
  // envoie éléments à l'api
  export const postWork = async (body) => {
    let response = await fetch(`${globalConfig.url}works`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: body
    });
    return response
  }
  
  // supprime éléments de l'api
  export const apiDeleteWork  = async (id) => {
    let response = await fetch(`${globalConfig.url}works/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });     
    return response
  }
  
  // Envoie les informations de login
  export const postLoginInfo = async (data) => {
    let response = await fetch(`${globalConfig.url}users/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data) 
  }); 
  return response
  }
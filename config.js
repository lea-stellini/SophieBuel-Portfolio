export const globalConfig = {
    url : 'http://localhost:5678/api/',
}

// récupére les éléments de l'api
export const work = async () => {
    const data = await fetch(`${globalConfig.url}works`).then(response => response.json());
    return data;
 }


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

export const apiDeleteWork  = async (id) => {
    let response = await fetch(`${globalConfig.url}works/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

   
}

 


// récupération de l'élément du DOM qui aura les différents travaux
const gallery = document.getElementById('gallery');

// récupére les éléments de l'api
const url = 'http://localhost:5678/api/works';

const work = async () => {
   const data = await fetch(url).then(response => response.json());
   return data;
}

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


const main = async () => {
  const infos = await work();

  displayInfos(infos);

  const filtreTous = document.getElementById('tous');

    filtreTous.addEventListener('click', () => {
      displayInfos(infos)
    })

  const filtreObjets = document.getElementById('objets');

  filtreObjets.addEventListener('click', () => {
    const objetsFiltrees = infos.filter( info => {
      return info.categoryId === 1 
    })
    displayInfos(objetsFiltrees);
    console.log(objetsFiltrees)
  })

  const filtreAppartements = document.getElementById('appartements');
  filtreAppartements.addEventListener('click', () => {
    const objetsFiltrees = infos.filter( info => {
      return info.categoryId === 2
    })

    displayInfos(objetsFiltrees);
    console.log(objetsFiltrees)
  })

  const filtreHotels = document.getElementById('hotels');
  filtreHotels.addEventListener('click', () => {
    const objetsFiltrees = infos.filter( info => {
      return info.categoryId === 3 
    })

    displayInfos(objetsFiltrees);
    console.log(objetsFiltrees)
  })
  } 
  

main()





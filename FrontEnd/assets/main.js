import {addElementToIndex} from "./common.js"

// Sélectionner le conteneur HTML avec la classe 'gallery'
const container = document.querySelector('.gallery');
let projetsData;

// Fonction pour générer et ajouter un projet au conteneur
function genererProjet(projet) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = projet.imageUrl;
  img.alt = projet.title;
  const figcaption = document.createElement('figcaption');
  figcaption.textContent = projet.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  container.appendChild(figure);
}

// Fonction pour récupérer les données des projets depuis l'API
const fetchProjetsData = async () => {
  try {
    const response = await fetch('http://localhost:5678/api/works');
    projetsData = await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des projets depuis l\'API:', error.message);
  }
}

// Fonction pour afficher les projets filtrés dans le conteneur
const afficherProjets = (projetsFiltres) => {
  container.innerHTML = ''; // Vider le contenu du conteneur

  projetsFiltres.forEach(projet => {
    genererProjet(projet);
  });
}

// Fonction d'initialisation, appelée au chargement de la page
const filtre = async () => {
    await fetchProjetsData();
    afficherProjets(projetsData); // Afficher tous les projets
  
    // Ajouter des écouteurs d'événements aux boutons
    const btnTous = document.querySelector('.btn-tous');
    btnTous.addEventListener('click', () => {
      const projetsTous = projetsData;
      afficherProjets(projetsTous);
    });

    const btnObjets = document.querySelector('.btn-objets');
    btnObjets.addEventListener('click', () => {
      const projetObjets = projetsData.filter(projet => projet.categoryId == 1);
      afficherProjets(projetObjets);
    });
  
    const btnAppartement = document.querySelector('.btn-appartement');
    btnAppartement.addEventListener('click', () => {
      const projetAppartement = projetsData.filter(projet => projet.categoryId == 2);
      afficherProjets(projetAppartement);
    });

    const btnHotel = document.querySelector('.btn-hotel');
    btnHotel.addEventListener('click', () => {
      const projetHotel = projetsData.filter(projet => projet.categoryId == 3);
      afficherProjets(projetHotel);
    });
  }

// Appeler la fonction d'initialisation
filtre();




//  document.addEventListener('DOMContentLoaded', function() {
//       addElementToIndex();
//     });

function addElementEdition(){
    const token = localStorage.getItem('accessToken');
    if (token) {
        addElementToIndex();
        
        const btnLogout = document.getElementById('btnLogout');

        btnLogout.addEventListener('click', function(event) {
            localStorage.removeItem('accessToken');
            console.log('User logged out.');
            event.target.textContent = 'Login';
            event.target.className = 'btnLogin';
        });

    }
}

addElementEdition();  


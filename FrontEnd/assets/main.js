'use strict';

import {addElementToIndex} from "./common.js"

// Récupérer les données des projets depuis le stockage local s'ils existent, sinon les récupérer depuis l'API
let projetsData = window.localStorage.getItem('projetsData');

if(projetsData === null){
    fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      projetsData = data;
      const valeurProjetsData = JSON.stringify(projetsData);
      window.localStorage.setItem("projetsData", valeurProjetsData);
  })
  .catch(error => console.error('Erreur lors de la récupération des pièces depuis l\'API:', error));
} else {
    projetsData = JSON.parse(projetsData);
}


// Fonction pour générer et ajouter un projet au conteneur
const containerGalley = document.querySelector('.gallery');


function genererProjet (projetsData)  {
    
  
    for (let i = 0; i < projetsData.length; i++) {
    
    const projetElement = projetsData[i];
    
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    figure.id = projetElement.id;
    
    img.src = projetElement.imageUrl;
    img.alt = projetElement.title;
   figcaption.textContent = projetElement.title;
  
    figure.appendChild(img);
    figure.appendChild(figcaption);
    containerGalley.appendChild(figure);
  }
 
}

genererProjet(projetsData);

 

    const btnTous = document.querySelector('.btn-tous');
    btnTous.addEventListener('click', () => {
      containerGalley.innerHTML = '';
      genererProjet(projetsData);
    });
    
    const btnObjets = document.querySelector('.btn-objets');
    btnObjets.addEventListener('click', () => {
      const projetObjets = projetsData.filter(projet => projet.categoryId == 1);
      console.log(projetObjets);
      containerGalley.innerHTML = '';
      genererProjet(projetObjets);
    });

    const btnAppartement = document.querySelector('.btn-appartement');
    btnAppartement.addEventListener('click', () => {
      const projetAppartement = projetsData.filter(projet => projet.categoryId == 2);
      containerGalley.innerHTML = '';
      genererProjet(projetAppartement);
    });

const btnHotel = document.querySelector('.btn-hotel');
btnHotel.addEventListener('click', () => {
      const projetHotel = projetsData.filter(projet => projet.categoryId == 3);
      containerGalley.innerHTML = '';
      genererProjet(projetHotel);
    });



function addElementEdition(){
    const token = localStorage.getItem('accessToken');
    if (token) {
        addElementToIndex();
        const btnLogout = document.getElementById('btnLogout');
        btnLogout.addEventListener('click', function(event) {
            localStorage.removeItem('accessToken');
            console.log('User logged out.');
            event.target.textContent = 'login';
            event.target.className = 'btnLogin';
        });
        const filtre = document.querySelector('.filtres');
        filtre.innerHTML = '';
    }
}

addElementEdition();  


const containerGalleyModal = document.querySelector('.gallery-modal');

function genererGalleyModal(projetsData) {
  for (let i = 0; i < projetsData.length; i++) {
  
  const projetElement = projetsData[i];



  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const div = document.createElement('div');
  figure.className ='projet-modal';
  div.className ='remove-projet';
  img.src = projetElement.imageUrl;
  img.alt = projetElement.title;
  div.innerHTML = '<i class="fa-solid fa-trash-can fa-xs" style="color: #ffffff;"></i>';
  div.id = projetElement.id;
  div.addEventListener('click', function() {
    handleClick(this);
  });
 

  figure.appendChild(img);
  figure.appendChild(div);
  containerGalleyModal.appendChild(figure);
}}

genererGalleyModal(projetsData);

function fetchDataAndRender() {
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(data => {
      projetsData = data;
      const valeurProjetsData = JSON.stringify(projetsData);
      window.localStorage.setItem("projetsData", valeurProjetsData);
      containerGalley.innerHTML = '';
      containerGalleyModal.innerHTML ='';
      genererProjet(projetsData);
      genererGalleyModal(projetsData);
    })
    .catch(error => console.error('Erreur lors de la récupération des pièces depuis l\'API:', error));
}


function handleClick(clickedElement) {
  const elementId = clickedElement.id;
  const token = localStorage.getItem('accessToken');
  console.log(elementId);
  if (elementId) {
    const confirmation = confirm(`Voulez-vous supprimer ce projet ?`);

    if (confirmation) {
      // L'utilisateur a cliqué sur OK. Poursuite de l'action...
      console.log("L'utilisateur a cliqué sur OK. Poursuite de l'action...");

      // Envoi de la requête DELETE
      fetch(`http://localhost:5678/api/works/${elementId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('La réponse du réseau n\'était pas valide');
        }
        console.log('Requête DELETE réussie');
        // Traitement supplémentaire ici
        fetchDataAndRender();
      }).catch(error => {
        console.error('Problème avec la requête DELETE :', error);
      });
    } else {
      // L'utilisateur a cliqué sur Annuler. Action annulée.
      console.log("L'utilisateur a cliqué sur Annuler. Action annulée.");
    }
  }
}


const openModal = document.getElementById('openModalBtn');
const closeModal = document.getElementById('closeModalBtn') 
const modal = document.getElementById('modalEdition');

openModal.addEventListener('click', () => {
  modal.style.display = 'block';
})


closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
})


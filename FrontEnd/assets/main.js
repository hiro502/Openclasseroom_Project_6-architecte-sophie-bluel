'use strict';

const apiEndpoint = 'http://localhost:5678/api/';
const token = localStorage.getItem('accessToken');


// Récupérer les données des projets depuis le stockage local s'ils existent, sinon les récupérer depuis l'API

let projetsData = window.localStorage.getItem('projetsData');

if(projetsData === null){
    fetch(`${apiEndpoint}works`)
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


// -------Affichage des projets---------
const containerGalley = document.querySelector('.gallery');

function createProjectElement(projetElement) {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  const figcaption = document.createElement('figcaption');

  figure.id = projetElement.id;
  img.src = projetElement.imageUrl;
  img.alt = projetElement.title;
  figcaption.textContent = projetElement.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}

function genererProjet(projetsData) {
  containerGalley.innerHTML = '';

  for (let i = 0; i < projetsData.length; i++) {
    const projetElement = projetsData[i];
    const projectFigure = createProjectElement(projetElement);
    containerGalley.appendChild(projectFigure);
  }
}

genererProjet(projetsData);

//------Filtre des projets---------

function filtrerProjets(categoryId) {
  const projetFiltre = projetsData.filter(projet => projet.categoryId == categoryId);
  containerGalley.innerHTML = '';
  genererProjet(projetFiltre);
}

function setupButtonClickEvent(button, categoryId) {
  button.addEventListener('click', () => {
    filtrerProjets(categoryId);
  });
}

const btnTous = document.querySelector('.btn-tous');
const btnObjets = document.querySelector('.btn-objets');
const btnAppartement = document.querySelector('.btn-appartement');
const btnHotel = document.querySelector('.btn-hotel');


btnTous.addEventListener('click', () => {
  containerGalley.innerHTML = '';
  genererProjet(projetsData);
});

setupButtonClickEvent(btnObjets, 1);
setupButtonClickEvent(btnAppartement, 2);
setupButtonClickEvent(btnHotel, 3);


//--------Page d'accueil connexion------------


function addElementToIndex() {
    
    //Changement de bouton "Login" - "Logout"
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.textContent ='logout';
    btnLogin.id = 'btnLogout';
    btnLogin.href ='./index.html';

    //Header pour mode  edition
    const newDiv = document.createElement('div');
    newDiv.className = 'header-edition';
    newDiv.innerHTML = '<p>Mode édition</p>';
  
    const body = document.querySelector('body');
    body.prepend(newDiv);

    //Bouton "modifier" pour la modale
    const newBtn = document.createElement('button');
    newBtn.innerText = 'modifier';
    newBtn.className = 'btn-modifier';
    newBtn.id ='openModalBtn'; 
    
    const modeModifier = document.querySelector('.mode-edition');
    modeModifier.appendChild(newBtn);

}


//Ajouter des elements de la page connexion
function addElementEdition(){
    if (token) {
        addElementToIndex();

        //Bouton logout
        const btnLogout = document.getElementById('btnLogout');
        btnLogout.addEventListener('click', function(event) {
            localStorage.removeItem('accessToken');
            console.log('User logged out.');
            event.target.textContent = 'login';
            event.target.className = 'btnLogin';
        });

        //Cacher le bar de filtre
        const filtre = document.querySelector('.filtres');
        filtre.innerHTML = '';
    }
}

addElementEdition();  


// ------comportement des bouton de la fenetre modale--------------
const containerGalleyModal = document.querySelector('.gallery-modal');
const openModal = document.getElementById('openModalBtn'); //btn "modifier"
const closeModal = document.getElementById('closeModalBtn') //btn croix
const modal = document.getElementById('modal'); // la fenetre modale
const btnBack = document.getElementById('btn-back'); // btn retour
const formContainer = document.querySelector('.form-container') // form d'enregtrement de photo
const btnAjout = document.getElementById('btnAjout');  //  btn "ajouter une photo"
const submitBtn = document.getElementById('submitBtn');  //btn d'envoie
const titleModal = document.getElementById('title-modal'); // title de form
const category = document.getElementById('category');
const title = document.getElementById('title');

btnBack.style.display = 'none';
formContainer.style.display = 'none';
submitBtn.style.display = 'none';

//initialiser form
function initialisationForm () {
  title.value='';           
  category.selectedIndex = 0;
  photoUploader.style.display ='block';
  imageChange.style.display ='none'
  imageUpload.value = '';
}


function btnCloseAndBack(){
  containerGalleyModal.style.display = 'grid';
  formContainer.style.display = 'none';
  btnBack.style.display = 'none';
  submitBtn.style.display = 'none';
  btnAjout.style.display ='block';
  titleModal.innerText='Galerie photo'; 

}


//clique en dehors de la modal
modal.addEventListener('click', (event) =>{
  if(event.target.closest('#modal-container') === null){
    modal.style.display = 'none';
    btnCloseAndBack();
    initialisationForm();
  }
})

//fonction btn "modifier"
openModal.addEventListener('click', () => {
  modal.style.display = 'block';
});

//btn croix
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  btnCloseAndBack();
  initialisationForm();

});

//cliquer de btn retourner
btnBack.addEventListener('click',()=>{
 
  btnCloseAndBack();
  initialisationForm();
})

//btn""ajouter une photo"
btnAjout.addEventListener('click', () =>{
  containerGalleyModal.style.display = 'none';
  btnAjout.style.display = 'none';
  formContainer.style.display = 'block';
  btnBack.style.display = 'block';
  submitBtn.style.display = 'block';
  titleModal.innerText='Ajout photo';
})


//--------------Galarie photos dans la modale-------------------
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
  div.addEventListener('click', () => handleClick(projetElement.id));
 

  figure.appendChild(img);
  figure.appendChild(div);
  containerGalleyModal.appendChild(figure);
}}

genererGalleyModal(projetsData);




//------------------Suppression des photos---------------------------

//recuperer des donnes apres la suppression
function fetchDataAndRender() {
  fetch(`${apiEndpoint}works`)
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

//supprimer des photos 
function handleClick(elementId) {
  console.log(elementId);
  if (elementId) {
    const confirmation = confirm(`Voulez-vous supprimer ce projet ?`);

    if (confirmation) {
    
      // Envoi de la requête DELETE
      fetch(`${apiEndpoint}works/${elementId}`, {
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


document.getElementById('home').addEventListener('click', fetchDataAndRender);  //home reload

// ------------------modal form-------------------------
let imageChange = document.getElementById('imageChange'); // label pour changer d'image
let imageUpload = document.getElementById('imageUpload'); 
let photoUploader = document.getElementById('photoUploader');
let image = document.getElementById('imgPreview');
imageChange.style.display ='none'


//Affichage de la vignette de photo
function previewImage() {
    if(photoUploader.style.display ='block',imageChange.style.display ='none'){
      photoUploader.style.display ='none',
      imageChange.style.display ='block'
    }
    if (imageUpload.files && imageUpload.files[0]) {
        let reader = new FileReader();

        reader.onload = function (event) {
            
            image.src = event.target.result; 

            console.log('Fichier chargé avec succès');
            console.log(imageUpload.files)
        };

        reader.readAsDataURL(imageUpload.files[0]); 
    }
 }


imageUpload.addEventListener('change',  previewImage);


//envoie des donnees et photo
function submitForm() {
  let title = document.getElementById('title').value;
  let category = document.getElementById('category').value;
  let imageUpload = document.getElementById('imageUpload');
 
  // Activer le bouton de soumission uniquement si le formulaire est entièrement rempli
  if (title && category && imageUpload.files.length > 0) {
      
      // Créer un objet FormData
      const formData = new FormData();
      formData.append('image', imageUpload.files[0]);
      formData.append('title', title);
      formData.append('category', category);
      

      // Si le formulaire est entièrement rempli, exécutez la requête fetch
      fetch(`${apiEndpoint}works`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`,
          },
          body: formData,
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('La réponse du réseau n\'était pas valide');
              }
              fetchDataAndRender();
              console.log('Requête POST réussie');
              alert('Votre photo a été ajoutée avec succès!');
              
          })
          .catch(error => {
              console.error('Problème avec la requête POST:', error);
          });
  } else {
 // lorsque le formulaire n'est pas entièrement rempli
   alert('Veuillez remplir tous les champs.');
  }
}


submitBtn.addEventListener('click',  submitForm);


// Surveiller si tous les éléments sont saisis et activer/désactiver le bouton d'envoie

let elements = document.querySelectorAll('.form-info-photo input, .form-info-photo select');
elements.forEach(function (element) {
    element.addEventListener('input', function () {
        let title = document.getElementById('title').value;
        let category = document.getElementById('category').value;
        let imageUpload = document.getElementById('imageUpload');

        if(title && category && imageUpload.files.length > 0){
            document.getElementById('submitBtn').style.backgroundColor ='#1D6154';
        }else{document.getElementById('submitBtn').style.backgroundColor ='#A7A7A7';}
    });
});

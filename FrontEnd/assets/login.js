import {addElementToIndex} from "./common.js"


'use strict';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const apiEndpoint = 'http://localhost:5678/api/users/login';
  
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Échec de l\'authentification');
      }
      return response.json();
    })
    .then(data => {
      const token = data.token;
      localStorage.setItem('accessToken', token);

      console.log('Authentification réussie :', data);


      window.location.href = './index.html';
    })
    .catch(error => {
      console.error('Échec de l\'authentification :', error);
      alert('L\'authentification a échoué. Veuillez vérifier votre adresse e-mail et votre mot de passe.');
    });
  });
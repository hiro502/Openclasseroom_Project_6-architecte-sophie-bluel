export function addElementToIndex() {
    
  const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('Token not found. Skipping addElementToIndex.');
      return;
    }
  
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.textContent ='Logout';
    btnLogin.id = 'btnLogout';
    btnLogin.href ='./index.html';

    const newDiv = document.createElement('div');
    newDiv.className = 'header-edition';
    newDiv.innerHTML = '<p><a href="">Mode édition</a></p>';
  
    const body = document.querySelector('body');
    body.prepend(newDiv);


    const newP = document.createElement('p');
    newP.innerHTML = '<a href="">modifier</a>';
    
    const modeModifier = document.querySelector('.mode-modifier');
    modeModifier.appendChild(newP);

}



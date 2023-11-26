export function addElementToIndex() {
    
  const token = localStorage.getItem('accessToken');
    if (!token) {
      console.log('Token non trouvé. Ignorer addElementToIndex.');
      return;
    }
  
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.textContent ='logout';
    btnLogin.id = 'btnLogout';
    btnLogin.href ='./index.html';

    const newDiv = document.createElement('div');
    newDiv.className = 'header-edition';
    newDiv.innerHTML = '<p>Mode édition</p>';
  
    const body = document.querySelector('body');
    body.prepend(newDiv);


    const newBtn = document.createElement('button');
    newBtn.innerText = 'modifier';
    newBtn.className = 'btn-modifier';
    newBtn.id ='openModalBtn'; 
    
    const modeModifier = document.querySelector('.mode-edition');
    modeModifier.appendChild(newBtn);

}



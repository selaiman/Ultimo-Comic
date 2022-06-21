const mockApiURL = "https://62a42be947e6e400638d7100.mockapi.io/api/usuarios";

const cajaPrincipal = document.getElementById("cajaPrincipal");
const btnMenu = document.querySelector("#btnMenu");
const menuList = document.querySelector("#menuList");
const inputUser = document.getElementById("InputUser");
const InputEmail = document.getElementById("InputEmail");
const InputPassword = document.getElementById("InputPassword");
const btnSubmit = document.getElementById("btnSubmit");

btnMenu.addEventListener('click', () => menuList.classList.toggle("hidden-menu"));

async function getUsers() {
  const response = await fetch(mockApiURL);
  let data = await response.json();

  return data;
}

function createCards(name, avatar, Descripcion, precio) {
//CREACION
 let card = document.createElement('div');
 let img = document.createElement('img');
 let cardBody = document.createElement('div');
 let title = document.createElement('h5');
 let description = document.createElement('p');
 let price = document.createElement('p');
 let btnBuy = document.createElement('button');
//CLASEO
card.className = 'card mx-4 px-0';
img.className = 'card-img-top';
cardBody.className = 'card-body';
title.className = 'card-title';
description.className = 'card-text';
btnBuy.className = 'btn btn-carrito';
//TEXTEO
img.setAttribute('src', avatar);
title.textContent = name;
description.textContent = Descripcion;
price.textContent = precio;
btnBuy.textContent = 'Comprar';
//APENDEO
cardBody.append(title);
cardBody.append(description);
cardBody.append(price);
cardBody.append(btnBuy);
card.append(img);
card.append(cardBody);
document.getElementById('cajaPrincipal').append(card);

return card;
}

function loadUsers() {
  let usuarios = getUsers();

  usuarios.then((respuesta) => {
    respuesta.forEach((usuario) => {
      createCards(usuario.nombre, usuario.foto, usuario.descripcion, usuario.precio);
    });
  });
}

loadUsers();

// const inputUser = document.getElementById("InputUser");
// const InputEmail = document.getElementById("InputEmail");
// const InputPassword = document.getElementById("InputPassword");
// const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.addEventListener("click", (e)=>{
  // e.preventDefault();
  console.log('me hicite cli');
  if (inputUser.value === "MessiD10S" && InputEmail.value === "leo10@gmail.com" && InputPassword.value === "maracana"){
    window.location.replace("http://127.0.0.1:5500/admin.html");
  }
})

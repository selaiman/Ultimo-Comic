const mockApiURL = "https://62a42be947e6e400638d7100.mockapi.io/api/usuarios";
let cajaPrincipal = document.getElementById("cajaPrincipal");

async function getUsers() {
  const response = await fetch(mockApiURL);
  let data = await response.json();

  return data;
}

function createCards(name, avatar) {
  let newCard = document.createElement("div");
  let img = document.createElement("img");
  let cardBody = document.createElement("div");
  let title = document.createElement("h5");

  newCard.className = "card";
  img.className = "card-img-top";
  cardBody.className = "card-body";
  title.className = "card-title";

  title.append(name);
  img.setAttribute("src", avatar);
  cardBody.append(title);
  newCard.append(img);
  newCard.append(cardBody);
  document.getElementById("cajaPrincipal").append(newCard);
  return newCard;
}

function loadUsers() {
  let usuarios = getUsers();

  usuarios.then((respuesta) => {
    respuesta.forEach((usuario) => {
      createCards(usuario.nombre, usuario.foto, usuario.id);
    });
  });
}

loadUsers();

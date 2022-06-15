// const jugadore = [
//   {
//     nombre: 'Leonel',
//     apellido: 'Messi',
//     id: 10
//   },
//   {
//     nombre: 'Cristiano',
//     apellido: 'Ronaldo',
//     id: 7
//   },
//   {
//     nombre: 'Kylian',
//     apellido: 'Mbappe',
//     id: 11
//   }
// ];

// function buscaId(id){
//   jugadore.find(jugador => jugador.id === id);
// }

// function buscarHeroe(id){
//   return new Promise ((resolve, reject)=>{
//     setTimeout(()=>{
//       const jugador = buscaId(id);
//       if(jugador){
//         resolve(jugador);
//       } else {
//         reject('No se encontro ese jugador');
//       }
//     },3000);
//   });
// }

// buscarHeroe(7)
// .then((respuesta)=> console.log('jugador: ',respuesta))
// .catch((error)=>console.warn(error));

// const promesa = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Se ha resolvido la promesa");
//   }, 3000);
// });

// promesa.then((respuesta) => {
//   console.log(respuesta);
// });

// const algoPasara = () => {
//   return new Promise((resolve,reject)=>{
//     setTimeout(()=>{if (true) {
//       resolve('Hey :D');
//     } else {
//       reject('Whoops!');
//     };},4000);
//   });
// };

// algoPasara().then(respuesta=>console.log(respuesta)).catch(error=>console.log(error))

// let compras = "Carrito = ";

// console.log(compras);

// function hacerLaCompra(callback){
// setTimeout(()=>{
//   compras+='Producto ';
//   callback();
// },3000);
// }

// hacerLaCompra(()=>{
//   console.log(compras)
//   hacerLaCompra(()=>{
//     console.log(compras)

//   });
// });

// const numero = 1;
// const desarrollo = new Promise(function(resolve,reject) {
//   setTimeout(()=>{
//     if (numero > 10){
//       resolve('el numero es mayor que 10');
//     } else {
//       reject('el numero es menor o igual que 10');
//     }
//   },2000);
// });

// desarrollo.then(res=>console.log(res)).catch(err=>console.warn(err))

// function temporizar(tiempo){
//   return new Promise((resolve)=>{
//     setTimeout(()=>{resolve()},tiempo);
//   })
// }

// temporizar(5000).then(()=>console.log('FIN'))

// document.getElementById('promesoide').innerHTML = 'inactivo';

// const cambioEstado = new Promise ((res)=>{
//   setTimeout(() => {
//     res('activo')
//   }, 2000);
// });

// cambioEstado.then((res)=>{document.getElementById('promesoide').innerHTML = res})

// console.log(cambioEstado);

//   fetch("https://62a42be947e6e400638d7100.mockapi.io/api/usuarios/2")
//     .then((res) => res.json())
//     .then((data) => console.log(data))
// }

// traerUsuario();

const mockApiURL = "https://62a42be947e6e400638d7100.mockapi.io/api/usuarios";


let cajaPrincipal = document.getElementById('cajaPrincipal');
let newUserName = document.getElementById('newUserName');
let newUserURL = document.getElementById('newUserURL');
let newUserForm = document.getElementById('newUserForm');
let newUserDescription = document.getElementById('newUserDescription');
let newUserPrice = document.getElementById('newUserPrice');

newUserForm.addEventListener('click',(e)=>{e.preventDefault();});

async function getUsers() {
  const response = await fetch(mockApiURL);
  let data = await response.json();

  return data;
}

// SUBO USUARIO 
async function postUser(user)
{
  const response = await fetch(mockApiURL,{
    method : 'POST',
    body : JSON.stringify(user),
    headers : {
      'Content-type': 'application/json; charset=UTF-8' ,},
    }) .then((response) => response.json())
    .then((json) => console.log(json))
}

function btnCreate(){
  let newUser = createUser();
  postUser(newUser).then(()=>{
    clearForm();
    clearGrid();
    loadUsers();
  });
}

function clearForm(){
  newUserForm.reset();
}

function clearGrid(){
  cajaPrincipal.innerHTML = ' ';
} 

function loadUsers(){
  let usuarios = getUsers();

usuarios.then((respuesta) => {
  respuesta.forEach((usuario) => {
    createCards(usuario.nombre, usuario.foto, usuario.id, usuario.descripcion, usuario.precio);
  });
});
}

function createUser(){
  let newUser = {
    nombre : newUserName.value ,
    foto : newUserURL.value,
    descripcion: newUserDescription.value,
    precio: newUserPrice.value
  }
  return newUser;
}

//ACTUALIZO USUARIO

async function updateUser(user,id)
{
  const response = await fetch(mockApiURL + '/' + id,{
    method : 'PUT',
    body : JSON.stringify(user),
    headers : {
      'Content-type': 'application/json; charset=UTF-8' ,},
    }) .then((response) => response.json())
    .then((json) => console.log(json))
}

function editUser(id){
  let edicion = createUser();
  updateUser(edicion,id).then(() => {
    clearForm();
    clearGrid();
    loadUsers();
  })

}

// BORRO USUARIO

async function deleteUser(id)
{
  const response = await fetch(mockApiURL + '/' + id,{
    method : 'DELETE',
    });
    return response;
}

function btnDelete(id){
  deleteUser(id).then(()=>{
    clearForm();
    clearGrid();
    loadUsers();
  });
}

//CREO TARJETA

function createCards(name, avatar, id, Descripcion, precio) {
  let newCard = document.createElement("div");
  let img = document.createElement("img");
  let cardBody = document.createElement("div");
  let descripcion = document.createElement("div");
  let buttonPrice = document.createElement('button');
  let title = document.createElement("h5");
  let buttonEdit = document.createElement("button");
  let buttonDelete = document.createElement("button");

  descripcion.className = 'p'
  newCard.className = "card";
  img.className = "card-img-top";
  cardBody.className = "card-body";
  title.className = "card-title";
  buttonPrice.className = "btn btn-primary";
  buttonEdit.className = "btn btn-success";
  buttonDelete.className = "btn btn-danger";
  buttonEdit.textContent = "Editar";
  buttonDelete.textContent = "Borrar"; 
  buttonPrice.textContent = precio;
  descripcion.textContent = Descripcion;

  buttonEdit.addEventListener("click", () => {
    editUser(id);
  });

  buttonDelete.addEventListener("click", () => {
    btnDelete(id);
  });

  title.append(name);
  img.setAttribute("src", avatar);
  cardBody.append(title);
  cardBody.append(descripcion);
  cardBody.append(buttonPrice);
  cardBody.append(buttonEdit);
  cardBody.append(buttonDelete);
  newCard.append(img);
  newCard.append(cardBody);
  document.getElementById("cajaPrincipal").append(newCard);
  return newCard;
}

// carga inicial

loadUsers();
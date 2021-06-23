// varibales 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets =[];


//event Listener
eventListeners();

function eventListeners(){
formulario.addEventListener('submit',agregarTweet);

document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse ( localStorage.getItem('tweets')) || [];
    console.log(tweets);
    crearHTML();
});
}


//funciones
function agregarTweet(e){
    e.preventDefault();
  // textarea 
  const tweet = document.querySelector('#tweet').value;

  if (tweet===''){
    mostrarError('Este Campo no puede ir vacio')
      return;
  }

  const tweetObj ={
      id:Date.now(),
     tweet

  }


     // Añadirlo a mis tweets
     tweets = [...tweets, tweetObj];
     
     // Una vez agregado, mandamos renderizar nuestro HTML
     crearHTML();

     // Reiniciar el formulario
     formulario.reset();

}

//mostrar el mensaje de error 
function mostrarError(error){
const mensajeEerror= document.createElement('p');
mensajeEerror.textContent=error;
mensajeEerror.classList.add('error');

const contenido= document.querySelector('#contenido');
contenido.appendChild(mensajeEerror);
setTimeout(() => {
    mensajeEerror.remove();
}, 3000);


}

function crearHTML(){
    limpiarHTML();
    if (tweets.length > 0){
        tweets.forEach( tweet => {
            // BOTON DE ELIMINAR
            const btnElimiar = document.createElement('a');
            btnElimiar.classList.add('borrar-tweet');
            btnElimiar.innerText= 'X';
            // funcion de eliminar
            btnElimiar.onclick= ()=> {
                borrarTweet(tweet.id);
            }

            const li = document.createElement('li');
            li.innerText = tweet.tweet;
            li.appendChild(btnElimiar);

            listaTweets.appendChild(li);


        });
    }
sincronizarStorage();
}
// mantiene lo que hemos agregado 
function sincronizarStorage (){
    localStorage.setItem('tweets',JSON.stringify(tweets));


}


function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id );
   crearHTML();
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);

    }
}
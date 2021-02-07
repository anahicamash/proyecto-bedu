//HTML GUIA

/* <div id="contenido">
        <div class="container">

            <h1>Local Storage</h1>
            <div class="row">
                <div class="six columns">
                    <label for="tweet">Tweet:</label>
                    <form action="#" id="formulario">
                            <label for="tweet"></label>
                            <textarea id="tweet" class="u-full-width"></textarea>
                            <input type="submit" class="button u-full-width button-primary" value="Agregar">
                    </form>
                </div>
                <div class="six columns">
                    <h2>Mis Tweets</h2>
                    <div id="lista-tweets"></div>
                </div>
            </div>

        </div>
    </div> <!--#contenido--> */


    function createNode(type) {
        var node = document.createElement(type);
        return node;
    }
    var contenido = createNode('div');
    contenido.id = "contenido";

    var container = createNode('div');
    container.className = "container";
    contenido.appendChild(container);

    var h1 =  createNode('h1');
    var text = document.createTextNode("Todo APP");
    container.appendChild(h1);
    h1.appendChild(text);

    var row = createNode('div');
    row.className = "row";
    container.appendChild(row);

    var sixcolumns = createNode('div');
    sixcolumns.className = "six columns";
    row.appendChild(sixcolumns);

    var tweet = createNode('label');
    var text = document.createTextNode("Tweet:");
    tweet.className = "tweet";
    sixcolumns.appendChild(tweet);
    tweet.appendChild(text);
    

    var form = createNode('form');
    form.id = "formulario";
    form.action = "#";
    sixcolumns.appendChild(form);

    var textarea = createNode('textarea');
    textarea.className = "u-full-width";
    textarea.id = "tweet";
    form.appendChild(textarea);

    var input = createNode('input');
    input.className = "button u-full-width button-primary";
    input.type = "submit"
    input.value = "Agregar"
    form.appendChild(input);

    var sixcolumns2 = createNode('div');
    sixcolumns2.className = "six columns";
    row.appendChild(sixcolumns2);

    var h2 =  createNode('h2');
    var text = document.createTextNode("Mis tweets");
    sixcolumns2.appendChild(h2);
    h2.appendChild(text);

    var lista =  createNode('div');
    lista.id = "lista-tweets";
    sixcolumns2.appendChild(lista);


    document.body.appendChild(contenido);
    console.log(contenido)
    





//las variables
const listaTweets = document.getElementById('lista-tweets');

///los event listeners
eventListeners();

function eventListeners() {
    //cuando se envia el formuladio
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);
    //borrar tweets
    listaTweets.addEventListener('click', borrarTweet);
    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}

//funciones

//añadir tweet del formulario

function agregarTweet(e) {
    e.preventDefault();
    //leer el valor del text area
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'x';
    //crear un elemento y añadir el elemento a la lsita
    const li = document.createElement('li');
    li.innerText = tweet;
    //añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    //agregar a local
    agregarTweetLocalStorage(tweet);
}
//elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.textContent);

        //alert('Tweet eliminado')
    }

}

//mostrar datos de localStorage en la lista
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet) {

        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'x';
        //crear un elemento y añadir el elemento a la lsita
        const li = document.createElement('li');
        li.innerText = tweet;
        //añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);

    })
}

// agrega a el local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet que es un areglo
    tweets.push(tweet);
    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// se encarga de comprovar qeu se tengan elementos en localStorage
// y retorna un areglo
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valoes de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//eliminar tweet de local storage

function borrarTweetLocalStorage(tweet) {
    let tweets, tweetsBorrar;
    //parte que se encarga de seleccionar todo a partir de
    //un areglo y posterior mente elimina el ultimo caracter
    // en este caso la x
    tweetsBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index) {
        if (tweetsBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    //esto lo vuelve un string
    localStorage.setItem('tweets', JSON.stringify(tweets))
}
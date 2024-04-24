// Elementos del Dom
let $divPersonajes = document.getElementById('personajes');
let $botonAllFiltro = document.getElementById('all');
let $botonFemaleFiltro = document.getElementById('female');
let $botonMaleFiltro = document.getElementById('male');
let $botonUnknownFiltro = document.getElementById('unknown');
let $botonGenderlessFiltro = document.getElementById('genderless');
let $botonPrimeraPagina = document.getElementById('primeraPag');
let $botonAnteriorPagina = document.getElementById('anterior');
let $botonSiguientePagina = document.getElementById('siguiente');
let $botonUltimaPagina = document.getElementById('ultimaPag');


// Variables
let personajes;
let info = {};
let paginaActual=1;

function show (personajes) {
    $divPersonajes.innerHTML='';
    if (personajes.length === 0) {
        $divPersonajes.innerHTML='<p id="parrafo">There is no that genre on this page.</p>'
    }
    for(let personaje of personajes) {
        $divPersonajes.innerHTML+=`<div class="personaje">
                                        <img src="${personaje.image}">
                                        <h2>${personaje.name}</h2>
                                        <p>Gender: ${personaje.gender}</p>
                                        <p>Species: ${personaje.species}</p>
                                        <p>Status: ${personaje.status}</p>
                                    </div>`
    }
}

function controlBotones (pagina) {
if(pagina==1){
    $botonAnteriorPagina.disabled=true;
    $botonPrimeraPagina.disabled=true;
    $botonSiguientePagina.disabled=false;
    $botonUltimaPagina.disabled=false;
} else if (pagina==42){
    $botonAnteriorPagina.disabled=false;
    $botonPrimeraPagina.disabled=false;
    $botonSiguientePagina.disabled=true;
    $botonUltimaPagina.disabled=true;
} else {
    $botonSiguientePagina.disabled=false;
    $botonUltimaPagina.disabled=false;
    $botonAnteriorPagina.disabled=false;
    $botonPrimeraPagina.disabled=false;
}
}
$botonAnteriorPagina.disabled=true
// Función fetch
function pedidofetch (pagina) {
    controlBotones(pagina)
    fetch("https://rickandmortyapi.com/api/character/?page="+pagina)
    .then((data)=>{
        return data.json();
    })
    .then((data)=>{
        personajes = data.results;
        info = data.info;
        show(personajes)
    })
}

pedidofetch(paginaActual);

// Filtros

function allFunction () {
    show(personajes);
};

function femaleFunction () {
    let filtro = personajes.filter((personita)=>{
        return personita.gender === 'Female';
    })
    show(filtro);
};

function maleFunction () {
    let filtro = personajes.filter((personita)=>{
        return personita.gender === 'Male';
    })
    show(filtro);
};

function unknownFunction () {
    let filtro = personajes.filter((personita)=>{
        return personita.gender === 'unknown';
    })
    show(filtro);
};

function genderlessFunction () {
    let filtro = personajes.filter((personita)=>{
        return personita.gender === 'genderless';
    })
    show(filtro);
};

$botonAllFiltro.addEventListener('click',allFunction);
$botonFemaleFiltro.addEventListener('click', femaleFunction);
$botonMaleFiltro.addEventListener('click',maleFunction);
$botonUnknownFiltro.addEventListener('click',unknownFunction);
$botonGenderlessFiltro.addEventListener('click',genderlessFunction);

// Paginado

function primeraPagFuncion () {
    pedidofetch(1);
    paginaActual=1;
};

function ultimaPagPagFuncion () {
    pedidofetch(42);
    paginaActual=42;
};

function siguientePagPagFuncion () {
    paginaActual++;
    pedidofetch(paginaActual);
};

function anteriorPagPagFuncion () {
    paginaActual--;
    pedidofetch(paginaActual);
};

$botonAnteriorPagina.addEventListener('click',anteriorPagPagFuncion);
$botonPrimeraPagina.addEventListener('click',primeraPagFuncion);
$botonUltimaPagina.addEventListener('click',ultimaPagPagFuncion);
$botonSiguientePagina.addEventListener('click',siguientePagPagFuncion);
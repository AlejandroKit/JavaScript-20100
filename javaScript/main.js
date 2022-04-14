let respuesta; //variable para confirmar si el usuario ingresó una variable valida
validarStorage = () => {
    if (localStorage.getItem('eventos') != null) {
        eventosDeStorage = JSON.parse(localStorage.getItem('eventos'));
        return eventosDeStorage;
    } else {
        return [];
    }
};
let listaEventos = validarStorage(); //array de los Eventos (objetos) con toda su información
fetch('./javaScript/data/data.json')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        data.forEach((evento) => {
            listaEventos.push(evento);
        });
    });
const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

//referencias de tiempo para todo lo relacionado con fechas
let fechaReferencia = new Date();
let diaActual = fechaReferencia.getDate();
let mesActual = fechaReferencia.getMonth();
let mesActualAux = fechaReferencia.getMonth(); //solo sirve para que no se marque el mismo dia de hoy con otro color distinto en todos los meses
let añoActual = fechaReferencia.getFullYear();
let añoActualAux = fechaReferencia.getFullYear(); //solo sirve para que no se marque el mismo dia de hoy con otro color distinto en todos los años

//seleccion de botones en el DOM para cambiar de un mes a otro
let prevMesActualButton = document.getElementById('prev-month');
let nextMesActualButton = document.getElementById('next-month');

//asignando los eventos a los botones flecha para poder cambiar de mes (adelanto del desafio: incorporar eventos)
prevMesActualButton.addEventListener('click', () => ultimoMes());
nextMesActualButton.addEventListener('click', () => siguienteMes());

//seleccion de div en el DOM correspondientes a las sig. ID's
let dias = document.getElementById('dias');
let mes = document.getElementById('mes');
let año = document.getElementById('año');

//asignación del mes y año en el DOM para que el usuario navegue entre estos
mes.textContent = nombresMeses[mesActual];
año.textContent = añoActual.toString();

//función para saber en que día de la semana empieza el mes a elección
const comienzoDeMes = () => {
    let primerDia = new Date(añoActual, mesActual, 1);
    return primerDia.getDay();
};

//función para saber si el año es bisiesto o no
const añoBisiesto = () => {
    return (añoActual % 100 !== 0 && añoActual % 4 === 0) || añoActual % 400 === 0;
};

//función para saber cuantos meses tiene el mes
const cuantosDias = (mes) => {
    if (mes == 0 || mes == 2 || mes == 4 || mes == 6 || mes == 7 || mes == 9 || mes == 11) {
        return 31;
    } else if (mes == 3 || mes == 5 || mes == 8 || mes == 10) {
        return 30;
    } else {
        return añoBisiesto() ? 29 : 28;
    }
};

const agregarAlCalendario = (evento) => {
    let casilla = document.getElementById(`${evento.dia}/${evento.mes}`);
    casilla.innerHTML += `<p>${evento.titulo}</p>`;
};

//función para imprimir los dias del mes correspondiente empezando por el día de la semana en la que empieza el mes elegido
const escribirMes = (mes) => {
    //el primer ciclo es para imprimir los ultimos dias del mes pasado
    for (let i = comienzoDeMes(); i > 0; i--) {
        dias.innerHTML += ` <div class="calendario__dia calendario__item calendario__diasMesPasado">
            ${cuantosDias(mesActual - 1) - (i - 1)}
        </div>`;
    }

    //este ciclo es para escribir los dias del mes que aparesca en pantalla, marcando el día actual para diferenciarlo
    for (let i = 1; i <= cuantosDias(mes); i++) {
        if ((i === diaActual) & (mes === mesActualAux) & (añoActual === añoActualAux)) {
            dias.innerHTML += `<div id="${i}/${mes + 1}" class="calendario__dia calendario__item calendario__hoy">
            ${i}
            <div class="dia__eventos" id="${i}/${mes + 1}_eventos"></div>
            </div>`;
        } else {
            dias.innerHTML += `<div id="${i}/${mes + 1}" class="calendario__dia calendario__item">
            ${i}
            <div class="dia__eventos" id="${i}/${mes + 1}_eventos"></div>
            </div>`;
        }
    }

    // llamo a agregar al DOM todos los eventos del mes para que se impriman cada que aparece el mes
    listaEventos.forEach((evento) => {
        evento.mes == mes + 1 && agregarAlCalendario(evento);
    });
};
escribirMes(mesActual);

//actualizar los valores de mes y año para cambiarlos en el DOM
const setearNuevaFecha = () => {
    fechaReferencia.setFullYear(añoActual, mesActual, diaActual);
    mes.textContent = nombresMeses[mesActual];
    año.textContent = añoActual.toString();
    dias.textContent = '';
    escribirMes(mesActual);
};

//Función para ver el mes anterior
const ultimoMes = () => {
    if (mesActual !== 0) {
        mesActual--;
    } else {
        mesActual = 11;
        añoActual--;
    }

    setearNuevaFecha();
};

//Función para ver el mes siguiente
const siguienteMes = () => {
    if (mesActual !== 11) {
        mesActual++;
    } else {
        mesActual = 0;
        añoActual++;
    }

    setearNuevaFecha();
};

//clase para eventos con sus atributos y metodos
class evento {
    constructor(titulo, mes, dia, descripcion) {
        this.mes = mes;
        this.dia = dia;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

//Aqui selecciono el modal que quiero usar como formulario emergente para agendar el evento y el boton que lo va a "llamar a hacer pop-up" y aparecer
let formContainer = document.getElementById('formContainer'); //container del formulario emergente
let btn_form = document.getElementById('openForm'); //boton de open para que emerga el formulario
btn_form.addEventListener('click', () => {
    //en esta funcion agrego la clase "show" al container para que le agregue opacity:1 y que se vea (visitar _header.scss para verlo)
    formContainer.classList.add('show');
    document.getElementById('mes_inp').focus();
});

let cerrarVentana = document.getElementById('closeForm'); //selecciono la "X" del formulario para poder quitarle la clase "show" al container y que se vuelva invicible de nuevo
cerrarVentana.addEventListener('click', () => {
    formContainer.classList.remove('show');
});

const ordenarDias = (a, b) => {
    if (a.dia < b.dia) {
        return -1;
    } else if (a.dia > b.dia) {
        return 1;
    } else {
        return 0;
    }
};

const ordenar = (a, b) => {
    if (a.mes < b.mes) {
        return -1;
    } else if (a.mes > b.mes) {
        return 1;
    } else {
        return 0;
    }
};

//función para crear y agendar eventos
let btn_agendar = document.getElementById('btnAgendar');
btn_agendar.addEventListener('click', () => {
    let nuevoEventoMes;

    do {
        nuevoEventoMes = document.getElementById('mes_inp').value;
        if (1 <= nuevoEventoMes && nuevoEventoMes <= 12) {
            respuesta = true;
        } else {
            document.getElementById('mes_inp').value = '1';
            respuesta = false;
        }
    } while (respuesta == false);
    let cantDiasDelMes = cuantosDias(nuevoEventoMes);
    let nuevoEventoDia;
    do {
        nuevoEventoDia = document.getElementById('dia_inp').value;
        if (0 < nuevoEventoDia && nuevoEventoDia <= cantDiasDelMes) {
            respuesta = true;
        } else {
            // alert('Maestro, no hay tantos dias en ese mes');
            respuesta = false;
        }
    } while (respuesta == false);

    //tomo los valores de los inputs de titulo y desc
    let nuevoEventoTitulo = document.getElementById('titulo_inp').value;
    let nuevoEventoDescr = document.getElementById('desc_inp').value;

    //agendo el evento nuevo en la lista con toda la info del form
    const eventoNuevo = new evento(nuevoEventoTitulo, nuevoEventoMes, nuevoEventoDia, nuevoEventoDescr);
    listaEventos.push(eventoNuevo);
    listaEventos.sort(ordenarDias);
    listaEventos.sort(ordenar);

    //guardo la lista de eventos en el local storage
    const eventosJSON = JSON.stringify(listaEventos);
    localStorage.setItem('eventos', eventosJSON);

    //este pequeño if es para que al agendar eventos en otro mes no vuelva a agregar al calendario eventos del mes que se esté viendo
    nuevoEventoMes == mesActual + 1 && agregarAlCalendario(eventoNuevo);

    //limpio los inputs para que al agendar y volver a abrir el formulario esten todos los inputs vacios
    document.getElementById('mes_inp').value = '';
    document.getElementById('dia_inp').value = '';
    document.getElementById('titulo_inp').value = '';
    document.getElementById('desc_inp').value = '';
    //esto es para que al agendar evento tambien desaparezca el formulario
    formContainer.classList.remove('show');

    Toastify({
        text: `Evento ${nuevoEventoTitulo} agendado`,
        gravity: 'top',
        position: 'right',
        style: {
            background: 'linear-gradient(45deg, #f1f, #a15)',
        },
    }).showToast();
});

let listContainer = document.getElementById('eventListContainer');
let btn_list = document.getElementById('openList');
btn_list.addEventListener('click', () => {
    listContainer.classList.add('show');

    let listaFechasTitulos = document.getElementById('listaFechasTitulos');
    listaEventos.forEach((evento) => {
        listaFechasTitulos.innerHTML += `<li>${evento.dia}/${evento.mes}:${evento.titulo}</li>`;
    });

    let closeList = document.getElementById('closeList');
    closeList.addEventListener('click', () => {
        listContainer.classList.remove('show');
        listaFechasTitulos.innerHTML = '<button id="closeList" type="button">X</button>';
    });
});

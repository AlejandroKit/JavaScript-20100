// funcion que retorna un array de eventos en el session storage
validarStorage = () => {
    if (localStorage.getItem('eventos') != null) {
        eventosDeStorage = JSON.parse(localStorage.getItem('eventos'));
        return eventosDeStorage;
    } else {
        return [];
    }
};
let listaEventos = validarStorage(); //array de los Eventos (objetos) con toda su información, si hay algo en el storage es lo primero que se guarda
// guarda en el array de eventos los datos del data.json, no los guarda antes de que se escriba el mes asi que para ver el evento de abril tienes que cambiar de mes y volver

// creo una lista con los eventos traidos del data.json porque si los pongo en el array anterior se duplican en el storage y terminan duplicandose estos eventos cada vez que el usuario agrega uno
const listaEventosPred = [];
fetch('./javaScript/data/data.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((evento) => {
            listaEventosPred.push(evento);
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

//asignando los eventos a los botones flecha para poder cambiar de mes
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
    } else if (mes == 1) {
        return añoBisiesto() ? 29 : 28;
    } else {
        return null;
    }
};

// funcion para pintar un evento en el calendario
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
        if (i === diaActual && mes === mesActualAux && añoActual === añoActualAux) {
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
        (evento.mes == mes + 1) & (evento.año == añoActual) && agregarAlCalendario(evento);
    });

    // llamo a agregar al DOM todos los eventos (del data.json) del mes para que se impriman cada que aparece el mes
    listaEventosPred.forEach((evento) => {
        evento.mes == mes + 1 && agregarAlCalendario(evento);
    });

    // agregar un evento a cada casilla para que cuando sea clickeada tome la informacion de todos los eventos de ese día y las imprima en el panel de la derecha
    let panel = document.getElementById('panel');
    for (let i = 1; i <= cuantosDias(mesActual); i++) {
        let casillas = document.getElementById(`${i}/${mesActual + 1}`);
        casillas.addEventListener('click', () => {
            panel.innerHTML = '';
            // guardo los eventos del usuario y los de data.json en dos arrays para concatenarlos y de ese tercer array hacer toda la operacion de impirimir en el panel
            let eventosUsuario = listaEventos.filter((evento) => evento.dia == i && evento.mes == mesActual + 1 && evento.año == añoActual);
            let eventosPred = listaEventosPred.filter((evento) => evento.dia == i && evento.mes == mesActual + 1);

            let datosDelEvento = eventosUsuario.concat(eventosPred);
            // console.log(datosDelEvento);
            datosDelEvento.forEach((evento) => {
                panel.innerHTML += `<div class="eventoDetalle">   
                <h4>${evento.titulo}</h4>
                <p>${evento.descripcion}</p>
                </div>`;
            });
        });
    }
};
escribirMes(mesActual); //primera escritura al abrir el sitio

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
    constructor(titulo, mes, dia, año, descripcion) {
        this.mes = mes;
        this.dia = dia;
        this.año = año;
        this.titulo = titulo;
        this.descripcion = descripcion;
    }
}

// funciones para ordenar los eventos (antes había una lista en donde se podía ver los eventos ordenados en orden cronologico pero esa funcion se eliminó), ahora solo sirve por mero amor al orden
const ordenarDias = (a, b) => {
    if (a.dia < b.dia) {
        return -1;
    } else if (a.dia > b.dia) {
        return 1;
    } else {
        return 0;
    }
};
const ordenarMes = (a, b) => {
    if (a.mes < b.mes) {
        return -1;
    } else if (a.mes > b.mes) {
        return 1;
    } else {
        return 0;
    }
};

//Aqui selecciono el modal que quiero usar como formulario emergente para agendar el evento y el boton que lo va a "llamar a hacer pop-up" y aparecer
let formContainer = document.getElementById('formContainer'); //container del formulario emergente
let btn_form = document.getElementById('openForm'); //boton de open para que emerga el formulario
btn_form.addEventListener('click', () => {
    //en esta funcion agrego la clase "show" al container para que le agregue opacity:1 y que se vea (visitar _header.scss para verlo)
    formContainer.classList.add('show');
    document.getElementById('mes_inp').focus();

    let cerrarVentana = document.getElementById('closeForm'); //selecciono la "X" del formulario para poder quitarle la clase "show" al container y que se vuelva invicible de nuevo
    cerrarVentana.addEventListener('click', () => {
        formContainer.classList.remove('show');
        mesInputContainer.classList.remove('error');
        diaInputContainer.classList.remove('error');
        document.getElementById('mes_inp').value = '';
        document.getElementById('dia_inp').value = '';
        document.getElementById('titulo_inp').value = '';
        document.getElementById('desc_inp').value = '';
    });
});

const form = document.getElementById('form');
const mesInputContainer = document.getElementById('mesInputContainer');
const diaInputContainer = document.getElementById('diaInputContainer');
const mes_input = document.getElementById('mes_inp');
const dia_input = document.getElementById('dia_inp');
let respuesta; //variable para confirmar si el usuario ingresó una variable valida
let respuesta2; //variable para confirmar si el usuario ingresó una variable valida

// IMPORTANTE
// bueno, no es tan importante pero para entender mejor el flujo de logica recomiendo leer desde el evento agregado a form, y desde la parte de checkInputs hacia arriba porque va llamando una funcion que llama a otra y como son funciones flechas quedaron escritas en orden inverso del de ejecucion

const setSuccesFor = (input) => {
    const inputContainer = input.parentElement;
    inputContainer.classList.remove('error');
    inputContainer.classList.add('succes');
};

const setErrorFor = (input, errMessage) => {
    const inputContainer = input.parentElement;
    const errorTag = inputContainer.querySelector('small');
    inputContainer.classList.remove('succes');
    inputContainer.classList.add('error');
    errorTag.innerHTML = errMessage;
};

const checkInputs = () => {
    const mes_input_value = parseInt(mes_input.value.trim());
    const dia_input_value = parseInt(dia_input.value.trim());

    if (mes_input_value <= 12) {
        setSuccesFor(mes_input);
        respuesta = true;
    } else {
        setErrorFor(mes_input, 'No hay tantos meses flaco');
        respuesta = false;
    }

    if (cuantosDias(mes_input_value) == null) {
        setErrorFor(dia_input, 'No hay dias ese mes');
    } else if (dia_input_value <= cuantosDias(mes_input_value)) {
        setSuccesFor(dia_input);
        respuesta2 = true;
    } else {
        setErrorFor(dia_input, 'No hay tantos dias ese mes flaco');
        respuesta2 = false;
    }

    return (res = respuesta == true && respuesta2 == true);
};

form.addEventListener('submit', (e) => {
    // al clickear el boton verificara que los valores de mes y día tenga sentido
    e.preventDefault();
    checkInputs();

    // cuando los valores para mes y dia tengan sentido entrara a este if y se efecutara todo el proceso de creacion de un evento nuevo
    if (res) {
        //tomo los valores de los inputs de mes, dia, titulo y desc
        let nuevoEventoMes = document.getElementById('mes_inp').value.trim();
        let nuevoEventoDia = document.getElementById('dia_inp').value.trim();
        let nuevoEventoTitulo = document.getElementById('titulo_inp').value.trim();
        let nuevoEventoDescr = document.getElementById('desc_inp').value.trim();
        let nuevoEventoAño = añoActual;

        //agendo el evento nuevo en la lista con toda la info del form
        const eventoNuevo = new evento(nuevoEventoTitulo, nuevoEventoMes, nuevoEventoDia, nuevoEventoAño, nuevoEventoDescr);
        listaEventos.push(eventoNuevo);
        listaEventos.sort(ordenarDias);
        listaEventos.sort(ordenarMes);

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

        // quito los icon de succes
        mesInputContainer.classList.remove('succes');
        diaInputContainer.classList.remove('succes');

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
    }
});

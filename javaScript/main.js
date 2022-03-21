let respuesta; //variable para confirmar si el usuario ingresó una variable valida
const listaEventos = []; //array de los Eventos (objetos) con toda su información
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
    return primerDia.getDay() - 1 === -1 ? 6 : primerDia.getDay() - 1; //esta cuenta es porque para la funcion getDay el primer dia de la semana es domingo y para este proyecto la semana empieza el lunes ;) (NOTA: se puede dejar simplemente el "return primerDia.getDay()" pero habría que reordenar los dias de la semana en el html)
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

//función para imprimir los dias del mes correspondiente empezando por el día de la semana en la que empieza el mes elegido
const escribirMes = (mes) => {
    //el primer ciclo es para imprimir los ultimos dias del mes pasado
    for (let i = comienzoDeMes(); i > 0; i--) {
        dias.innerHTML += ` <div class="calendario__dia calendario__item calendario__diasMesPasado">
            ${cuantosDias(mesActual - 1) - (i - 1)}
        </div>`;
    }

    for (let i = 1; i <= cuantosDias(mes); i++) {
        if ((i === diaActual) & (mes === mesActualAux) & (añoActual === añoActualAux)) {
            dias.innerHTML += `<div class="calendario__dia calendario__item calendario__hoy">
            ${i}
            <div class="dia__eventos" id="${i}/${mes}"></div>
            </div>`;
        } else {
            dias.innerHTML += `<div class="calendario__dia calendario__item">
            ${i}
            <div class="dia__eventos" id="${i}/${mes}"></div>
            </div>`;
        }
    }
    // llamo a agregar al DOM todos los eventos del mes para que se impriman cada que aparece el mes
    listaEventos.forEach((evento) => {
        if (evento.mes == mes) {
            evento.agregarAlCalendario();
        }
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
    agendarEvento() {
        console.log(`se ha agendado el evento "${this.titulo}" el día ${this.dia}/${this.mes}`);
    }
    //este metodo es para que se imprima los eventos agendados al HTML en la casilla de su dia correspondiente
    agregarAlCalendario() {
        let casilla = document.getElementById(`${this.dia}/${this.mes}`);
        console.log(casilla);
        casilla.innerHTML += `<p>${this.titulo}</p>`;
    }
}

//función para crear y agendar eventos
const agendar = () => {
    let nuevoEventoMes;
    do {
        nuevoEventoMes = prompt(`
        En que mes quiere agendar??(ingrese el numero)
        1.Enero
        2.Febrero
        3.Marzo
        4.Abril
        5.Mayo
        6.Junio
        7.Julio
        8.Agosto
        9.Septiembre
        10.Octubre
        11.Noviembre
        12.Diciembre`);
        if (1 <= nuevoEventoMes && nuevoEventoMes <= 12) {
            respuesta = true;
        } else {
            alert('Maestro, no hay tantos meses en el año, probá de nuevo');
            respuesta = false;
        }
    } while (respuesta == false);

    let cantDiasDelMes = cuantosDias(nuevoEventoMes);

    let nuevoEventoDia;
    do {
        nuevoEventoDia = parseInt(prompt('En qué día quiere agregar un evento??'));
        if (0 < nuevoEventoDia && nuevoEventoDia <= cantDiasDelMes) {
            respuesta = true;
        } else {
            alert('Maestro, no hay tantos dias en ese mes');
            respuesta = false;
        }
    } while (respuesta == false);

    let nuevoEventoTitulo = prompt('Titulo del evento??');
    let nuevoEventoDescr = prompt('Sobre que es el evento??');

    const eventoNuevo = new evento(nuevoEventoTitulo, nuevoEventoMes, nuevoEventoDia, nuevoEventoDescr);
    listaEventos.push(eventoNuevo);
    eventoNuevo.agendarEvento();
    //este pequeño if es para que al agendar eventos en otro mes no vuelva a agregar al calendario eventos del mes que se esté viendo
    if (nuevoEventoMes == mesActual) {
        eventoNuevo.agregarAlCalendario();
    }
};

//función para imprimir una lista de los eventos agendados
const eventos = () => {
    listaEventos.forEach((evento) => {
        console.log(evento);
    });
};

//función similar a la anterior pero solo imprime la fecha y el titulo
const listaDeEventosFechaTitulo = () => {
    for (let i = 0; i < listaEventos.length; i++) {
        console.log(`${listaEventos[i].dia}/${listaEventos[i].mes}:${listaEventos[i].titulo}`);
    }
};

//función para buscar eventos por su mes o titulo
const buscarEvento = () => {
    let modoDeBusqueda = prompt('Como quieres buscar?? por mes o por titulo (escriba "mes" o "titulo")');

    if ((modoDeBusqueda === 'mes') | (modoDeBusqueda === 'Mes')) {
        let busqueda = parseInt(prompt('ingrese el mes cuyo eventos quiere ver'));
        let resultado = listaEventos.filter((elem) => elem.mes == busqueda);
        console.log(resultado);
    } else if ((modoDeBusqueda === 'titulo') | (modoDeBusqueda === 'Titulo')) {
        busqueda = prompt('ingrese el titulo cuyo eventos quiere ver');
        resultado = listaEventos.filter((elem) => elem.titulo == busqueda);
        console.log(resultado);
    }
};

let cantDiasDelMes;
let respuesta;
let nuevoEventoDia;
let nuevoEventoMes;
const listaEventos = [];

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
}

const agendar = () => {
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

    if (nuevoEventoMes == 1 || nuevoEventoMes == 3 || nuevoEventoMes == 5 || nuevoEventoMes == 7 || nuevoEventoMes == 8 || nuevoEventoMes == 10 || nuevoEventoMes == 12) {
        cantDiasDelMes = 31;
    } else if (nuevoEventoMes == 2) {
        cantDiasDelMes = 28;
    } else if (nuevoEventoMes == 4 || nuevoEventoMes == 6 || nuevoEventoMes == 9 || nuevoEventoMes == 11) {
        cantDiasDelMes = 30;
    } else {
        alert('Pusiste un numero de mes que no existe, no sabes leer??');
    }

    do {
        nuevoEventoDia = parseInt(prompt('En qué día quiere agregar un evento??'));
        if (0 < nuevoEventoDia && nuevoEventoDia <= cantDiasDelMes) {
            respuesta = true;
        } else {
            alert('Maestro, no hay tantos dias en ese mes');
            respuesta = false;
        }
    } while (respuesta == false);

    let nuevoEventoTitulo = prompt(`Titulo del evento??`);
    let nuevoEventoDescr = prompt('Sobre que es el evento??');

    const eventoNuevo = new evento(nuevoEventoTitulo, nuevoEventoMes, nuevoEventoDia, nuevoEventoDescr);
    listaEventos.push(eventoNuevo);
    eventoNuevo.agendarEvento();
};

const eventos = () => {
    listaEventos.forEach((evento) => {
        console.log(evento);
    });
};

const listaDeEventosFechaTitulo = () => {
    for (let i = 0; i < listaEventos.length; i++) {
        console.log(`${listaEventos[i].dia}/${listaEventos[i].mes}:${listaEventos[i].titulo}`);
    }
};

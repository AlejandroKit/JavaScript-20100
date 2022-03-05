let cantDiasDelMes = 0;
let respuesta;
let nuevoEventoDia = 0;

const agendar = () => {
    const mesActual = prompt(`
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

    if (mesActual == 1) {
        cantDiasDelMes = 31;
    } else if (mesActual == 2) {
        cantDiasDelMes = 28;
    } else if (mesActual == 3) {
        cantDiasDelMes = 31;
    } else if (mesActual == 4) {
        cantDiasDelMes = 30;
    } else if (mesActual == 5) {
        cantDiasDelMes = 31;
    } else if (mesActual == 6) {
        cantDiasDelMes = 30;
    } else if (mesActual == 7) {
        cantDiasDelMes = 31;
    } else if (mesActual == 8) {
        cantDiasDelMes = 31;
    } else if (mesActual == 9) {
        cantDiasDelMes = 30;
    } else if (mesActual == 10) {
        cantDiasDelMes = 31;
    } else if (mesActual == 11) {
        cantDiasDelMes = 30;
    } else if (mesActual == 12) {
        cantDiasDelMes = 31;
    } else {
        alert('Pusiste un numero de mes que no existe, no sabes leer??');
    }

    do {
        nuevoEventoDia = parseInt(prompt('En qué día quiere agregar un evento??'));
        if (nuevoEventoDia > cantDiasDelMes) {
            alert('Maestro, no hay tantos dias en ese mes');
            respuesta = false;
        } else {
            respuesta = true;
        }
    } while (respuesta == false);

    let nuevoEventoDescr = prompt('Sobre que es el evento??');

    console.log(`El día ${nuevoEventoDia} se agrego un nuevo evento con la descripcion: ${nuevoEventoDescr}`);
};

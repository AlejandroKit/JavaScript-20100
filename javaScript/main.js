const notaExameFinal = [3, 4, 6, 2, 8, 10];

for (let i = 0; i < 6; i++) {
    if (notaExameFinal[i] < 7) {
        console.log(`wachin te sacaste un ${notaExameFinal[i]} estás desaprobadisimo`);
        document.write(`wachin te sacaste un ${notaExameFinal[i]} estás desaprobadisimo, `);
    } else {
        console.log(`wachin te sacaste un ${notaExameFinal[i]} estás re aprobado`);
        document.write(`wachin te sacaste un ${notaExameFinal[i]} estás re aprobado, `);
    }
}

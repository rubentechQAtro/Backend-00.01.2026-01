Algoritmo Ejercicio_34
    Definir i, j Como Entero
    
    // Empiezo con la tabla del 1 y llegaré hasta la del 9
    Para i <- 1 Hasta 9 Hacer
        Escribir "Generando la tabla del: ", i
        // Para cada tabla "i", multiplico por "j" del 1 al 10
        Para j <- 1 Hasta 10 Hacer
            Escribir i, " x ", j, " = ", i * j
        FinPara
        Escribir "" // Dejo un espacio para que no se vea todo amontonado
    FinPara
FinAlgoritmo